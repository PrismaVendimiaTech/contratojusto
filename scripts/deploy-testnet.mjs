#!/usr/bin/env node
/**
 * Deploy ContratoJusto to Stellar Testnet
 *
 * Usage: node scripts/deploy-testnet.mjs
 *
 * This script:
 * 1. Creates employer + worker test accounts
 * 2. Funds them via Friendbot
 * 3. Wraps native XLM as a Soroban token (used as demo "USDC")
 * 4. Uploads the compiled WASM contract
 * 5. Deploys and initializes the contract (70% savings, 30% severance)
 * 6. Outputs all env values ready to paste
 */

import {
  Keypair,
  TransactionBuilder,
  BASE_FEE,
  Operation,
  Asset,
  Address,
  Contract,
  nativeToScVal,
  xdr,
  rpc,
  hash,
} from '@stellar/stellar-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RPC_URL = 'https://soroban-testnet.stellar.org';
const HORIZON_URL = 'https://horizon-testnet.stellar.org';
const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';
const FRIENDBOT_URL = 'https://friendbot.stellar.org';
const WASM_PATH = path.join(__dirname, '..', 'packages', 'contract', 'target', 'wasm32-unknown-unknown', 'release', 'contrato_justo.wasm');

const server = new rpc.Server(RPC_URL);

function log(msg) {
  console.log(`\n>> ${msg}`);
}

async function fundAccount(publicKey) {
  const res = await fetch(`${FRIENDBOT_URL}?addr=${publicKey}`);
  if (!res.ok) throw new Error(`Friendbot failed for ${publicKey}: ${res.status}`);
  return true;
}

async function buildAndSubmit(sourceKeypair, operations, memo) {
  const account = await server.getAccount(sourceKeypair.publicKey());
  let txBuilder = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  });

  for (const op of operations) {
    txBuilder = txBuilder.addOperation(op);
  }

  const tx = txBuilder.setTimeout(60).build();

  const simulated = await server.simulateTransaction(tx);
  if ('error' in simulated) {
    throw new Error(`Simulation failed: ${simulated.error}`);
  }

  const prepared = rpc.assembleTransaction(tx, simulated).build();
  prepared.sign(sourceKeypair);

  const submitted = await server.sendTransaction(prepared);
  if (submitted.status === 'ERROR') {
    throw new Error(`Submit failed: ${JSON.stringify(submitted)}`);
  }

  log(`  Tx hash: ${submitted.hash} (polling...)`);

  // Manual polling to avoid SDK XDR parse issues
  let result;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 2000));
    try {
      result = await server.getTransaction(submitted.hash);
      if (result.status === 'SUCCESS' || result.status === 'FAILED') break;
    } catch (e) {
      // May throw on XDR parse, try raw fetch
      const raw = await fetch(`${RPC_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getTransaction',
          params: { hash: submitted.hash },
        }),
      });
      const json = await raw.json();
      if (json.result && json.result.status === 'SUCCESS') {
        result = json.result;
        break;
      }
      if (json.result && json.result.status === 'FAILED') {
        throw new Error('Transaction failed on-chain');
      }
    }
  }

  if (!result || result.status === 'NOT_FOUND') {
    throw new Error('Transaction not confirmed after 60s');
  }

  return result;
}

async function main() {
  console.log('='.repeat(60));
  console.log('  ContratoJusto - Deploy a Stellar Testnet');
  console.log('='.repeat(60));

  // Check WASM exists
  if (!fs.existsSync(WASM_PATH)) {
    console.error(`\nERROR: WASM no encontrado en ${WASM_PATH}`);
    console.error('Ejecuta primero: cd packages/contract && cargo build --target wasm32-unknown-unknown --release');
    process.exit(1);
  }

  const wasmBytes = fs.readFileSync(WASM_PATH);
  log(`WASM cargado: ${wasmBytes.length} bytes`);

  // 1. Generate keypairs
  log('Generando cuentas de prueba...');
  const employer = Keypair.random();
  const worker = Keypair.random();

  console.log(`  Employer: ${employer.publicKey()}`);
  console.log(`  Worker:   ${worker.publicKey()}`);

  // 2. Fund accounts
  log('Fondeando cuentas via Friendbot...');
  await fundAccount(employer.publicKey());
  console.log('  Employer fondeado');
  await fundAccount(worker.publicKey());
  console.log('  Worker fondeado');

  // 3. Get native XLM SAC address (already wrapped on testnet)
  log('Obteniendo token XLM nativo (SAC)...');
  const tokenId = Asset.native().contractId(NETWORK_PASSPHRASE);
  log(`  Token SAC (XLM nativo): ${tokenId}`);

  // 4. Upload WASM
  log('Subiendo contrato WASM a Soroban...');
  const uploadResult = await buildAndSubmit(employer, [
    Operation.uploadContractWasm({ wasm: wasmBytes }),
  ]);

  // Compute WASM hash locally (SHA-256)
  const crypto = await import('crypto');
  const wasmHash = crypto.createHash('sha256').update(wasmBytes).digest();
  log(`  WASM hash: ${wasmHash.toString('hex')}`);

  // 5. Deploy contract instance
  log('Deployando instancia del contrato...');
  const deployResult = await buildAndSubmit(employer, [
    Operation.createCustomContract({
      wasmHash,
      address: new Address(employer.publicKey()),
    }),
  ]);

  // Extract contract ID from the deploy result
  let contractId;

  // Try SDK parsed result first
  if (deployResult.returnValue) {
    try {
      contractId = Address.fromScVal(deployResult.returnValue).toString();
    } catch (e) { /* try next method */ }
  }

  // Try parsing resultMetaXdr for contract creation
  if (!contractId && deployResult.resultMetaXdr) {
    try {
      const metaXdr = typeof deployResult.resultMetaXdr === 'string'
        ? deployResult.resultMetaXdr
        : deployResult.resultMetaXdr.toXDR('base64');

      // Search for contract address in the meta (look for 32-byte contract hash)
      // The contract ID is in the ledger changes
      const meta = xdr.TransactionMeta.fromXDR(metaXdr, 'base64');
      const v3 = meta.v3();
      const sorobanMeta = v3.sorobanMeta();
      if (sorobanMeta) {
        const retVal = sorobanMeta.returnValue();
        contractId = Address.fromScVal(retVal).toString();
      }
    } catch (e) {
      // Try raw diagnosticEventsXdr
    }
  }

  // Try extracting from diagnostic events
  if (!contractId && deployResult.diagnosticEventsXdr) {
    try {
      const events = Array.isArray(deployResult.diagnosticEventsXdr)
        ? deployResult.diagnosticEventsXdr
        : [deployResult.diagnosticEventsXdr];
      for (const evtXdr of events) {
        const evt = typeof evtXdr === 'string'
          ? xdr.DiagnosticEvent.fromXDR(evtXdr, 'base64')
          : evtXdr;
        const body = evt.event().body().v0();
        const data = body.data();
        if (data.switch().name === 'scvAddress' && data.address().switch().name === 'scAddressTypeContract') {
          contractId = Address.contract(data.address().contractId()).toString();
          break;
        }
      }
    } catch (e) { /* final fallback needed */ }
  }

  if (!contractId) {
    console.log('  NOTA: No se pudo extraer CONTRACT_ID automaticamente.');
    console.log('  Tx hash del deploy:', deployResult.txHash);
    console.log('  Busca en https://stellar.expert/explorer/testnet/tx/' + deployResult.txHash);
    throw new Error('Extrae CONTRACT_ID manualmente del link de arriba.');
  }
  log(`  CONTRACT_ID: ${contractId}`);

  // 6. Initialize contract
  log('Inicializando contrato (70% ahorro, 30% indemnizacion)...');
  const contract = new Contract(contractId);
  await buildAndSubmit(employer, [
    contract.call(
      'initialize',
      new Address(employer.publicKey()).toScVal(),
      new Address(worker.publicKey()).toScVal(),
      new Address(tokenId).toScVal(),
      nativeToScVal(70, { type: 'u32' }),
      nativeToScVal(30, { type: 'u32' }),
    ),
  ]);
  log('  Contrato inicializado');

  // 7. Output results
  console.log('\n' + '='.repeat(60));
  console.log('  DEPLOY COMPLETADO');
  console.log('='.repeat(60));

  console.log('\n--- Valores para .env.example ---\n');
  console.log(`NEXT_PUBLIC_CONTRACT_ID=${contractId}`);
  console.log(`NEXT_PUBLIC_TOKEN_ID=${tokenId}`);
  console.log(`NEXT_PUBLIC_STELLAR_SIMULATION_ADDRESS=${employer.publicKey()}`);

  console.log('\n--- Claves de las cuentas de prueba (guardar!) ---\n');
  console.log(`EMPLOYER_PUBLIC=${employer.publicKey()}`);
  console.log(`EMPLOYER_SECRET=${employer.secret()}`);
  console.log(`WORKER_PUBLIC=${worker.publicKey()}`);
  console.log(`WORKER_SECRET=${worker.secret()}`);

  console.log('\n--- Configuracion del contrato ---\n');
  console.log(`Savings: 70% | Severance: 30%`);
  console.log(`Token: XLM nativo (SAC) - usado como "dolares" en la demo`);
  console.log(`Network: Stellar Testnet`);

  console.log('\n' + '='.repeat(60));
}

main().catch((err) => {
  console.error('\nERROR:', err.message || err);
  process.exit(1);
});
