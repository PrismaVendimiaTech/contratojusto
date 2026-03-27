#!/usr/bin/env node
/**
 * Deploy ContratoJusto to Stellar Testnet - one-shot script
 * Usage: node scripts/deploy-testnet.mjs
 */
import {
  Keypair, TransactionBuilder, BASE_FEE, Operation, Asset,
  Address, Contract, nativeToScVal, xdr, rpc, StrKey,
} from '@stellar/stellar-sdk';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RPC_URL = 'https://soroban-testnet.stellar.org';
const PASSPHRASE = 'Test SDF Network ; September 2015';
const WASM_PATH = path.join(__dirname, '..', 'packages', 'contract', 'target', 'wasm32-unknown-unknown', 'release', 'contrato_justo.wasm');

const server = new rpc.Server(RPC_URL);
const log = (m) => console.log(`>> ${m}`);

async function fund(pub) {
  const r = await fetch(`https://friendbot.stellar.org?addr=${pub}`);
  if (!r.ok) throw new Error(`Friendbot fail: ${r.status}`);
}

async function send(kp, ops) {
  const acc = await server.getAccount(kp.publicKey());
  let b = new TransactionBuilder(acc, { fee: BASE_FEE, networkPassphrase: PASSPHRASE });
  for (const op of ops) b = b.addOperation(op);
  const tx = b.setTimeout(60).build();
  const sim = await server.simulateTransaction(tx);
  if ('error' in sim) throw new Error(`Sim: ${sim.error}`);
  const prep = rpc.assembleTransaction(tx, sim).build();
  prep.sign(kp);
  const sub = await server.sendTransaction(prep);
  if (sub.status === 'ERROR') throw new Error(`Send: ${JSON.stringify(sub)}`);
  log(`  tx: ${sub.hash}`);
  // Poll via raw RPC to avoid SDK XDR parse issues
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const raw = await fetch(RPC_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getTransaction', params: { hash: sub.hash } }),
    });
    const j = await raw.json();
    if (j.result?.status === 'SUCCESS') return { txHash: sub.hash, ...j.result };
    if (j.result?.status === 'FAILED') throw new Error('Tx FAILED on-chain');
  }
  throw new Error('Tx not confirmed in 60s');
}

function deriveContractId(deployerPub, salt) {
  const networkIdHash = crypto.createHash('sha256').update(PASSPHRASE).digest();
  const deployerBytes = StrKey.decodeEd25519PublicKey(deployerPub);
  const preimage = xdr.HashIdPreimage.envelopeTypeContractId(
    new xdr.HashIdPreimageContractId({
      networkId: networkIdHash,
      contractIdPreimage: xdr.ContractIdPreimage.contractIdPreimageFromAddress(
        new xdr.ContractIdPreimageFromAddress({
          address: xdr.ScAddress.scAddressTypeAccount(xdr.PublicKey.publicKeyTypeEd25519(deployerBytes)),
          salt,
        })
      ),
    })
  );
  return StrKey.encodeContract(crypto.createHash('sha256').update(preimage.toXDR()).digest());
}

async function main() {
  console.log('============================================================');
  console.log('  ContratoJusto - Deploy a Stellar Testnet');
  console.log('============================================================');

  if (!fs.existsSync(WASM_PATH)) { console.error('WASM not found. Run cargo build first.'); process.exit(1); }
  const wasm = fs.readFileSync(WASM_PATH);
  log(`WASM: ${wasm.length} bytes`);

  // 1. Accounts
  const employer = Keypair.random();
  const worker = Keypair.random();
  log('Cuentas generadas');
  console.log(`  EMPLOYER_PUBLIC=${employer.publicKey()}`);
  console.log(`  EMPLOYER_SECRET=${employer.secret()}`);
  console.log(`  WORKER_PUBLIC=${worker.publicKey()}`);
  console.log(`  WORKER_SECRET=${worker.secret()}`);

  // 2. Fund
  log('Fondeando...');
  await fund(employer.publicKey());
  await fund(worker.publicKey());
  log('Fondeado OK');

  // 3. Token (native XLM SAC)
  const tokenId = Asset.native().contractId(PASSPHRASE);
  log(`Token SAC: ${tokenId}`);

  // 4. Upload WASM
  log('Subiendo WASM...');
  await send(employer, [Operation.uploadContractWasm({ wasm })]);
  const wasmHash = crypto.createHash('sha256').update(wasm).digest();
  log(`WASM hash: ${wasmHash.toString('hex')}`);

  // 5. Deploy - use known salt so we can derive CONTRACT_ID
  log('Deployando contrato...');
  const salt = crypto.randomBytes(32);
  const contractId = deriveContractId(employer.publicKey(), salt);
  log(`CONTRACT_ID pre-derivado: ${contractId}`);

  await send(employer, [
    Operation.createCustomContract({ wasmHash, address: new Address(employer.publicKey()), salt }),
  ]);
  log('Deploy OK');

  // 6. Initialize (70% savings, 30% severance)
  log('Inicializando contrato...');
  const contract = new Contract(contractId);
  await send(employer, [
    contract.call('initialize',
      new Address(employer.publicKey()).toScVal(),
      new Address(worker.publicKey()).toScVal(),
      new Address(tokenId).toScVal(),
      nativeToScVal(70, { type: 'u32' }),
      nativeToScVal(30, { type: 'u32' }),
    ),
  ]);
  log('Inicializado OK (70/30)');

  // 7. Output
  console.log('\n============================================================');
  console.log('  DEPLOY COMPLETADO');
  console.log('============================================================');
  console.log('\n--- .env.example values ---\n');
  console.log(`NEXT_PUBLIC_CONTRACT_ID=${contractId}`);
  console.log(`NEXT_PUBLIC_TOKEN_ID=${tokenId}`);
  console.log(`NEXT_PUBLIC_STELLAR_SIMULATION_ADDRESS=${employer.publicKey()}`);
  console.log('\n--- Test accounts (save these!) ---\n');
  console.log(`EMPLOYER_PUBLIC=${employer.publicKey()}`);
  console.log(`EMPLOYER_SECRET=${employer.secret()}`);
  console.log(`WORKER_PUBLIC=${worker.publicKey()}`);
  console.log(`WORKER_SECRET=${worker.secret()}`);

  // Save to file for reference
  const out = `# ContratoJusto Testnet Deploy - ${new Date().toISOString()}
NEXT_PUBLIC_CONTRACT_ID=${contractId}
NEXT_PUBLIC_TOKEN_ID=${tokenId}
NEXT_PUBLIC_STELLAR_SIMULATION_ADDRESS=${employer.publicKey()}
EMPLOYER_PUBLIC=${employer.publicKey()}
EMPLOYER_SECRET=${employer.secret()}
WORKER_PUBLIC=${worker.publicKey()}
WORKER_SECRET=${worker.secret()}
`;
  fs.writeFileSync(path.join(__dirname, '..', '.testnet-deploy.env'), out);
  log('Valores guardados en .testnet-deploy.env');
}

main().catch(e => { console.error('\nERROR:', e.message); process.exit(1); });
