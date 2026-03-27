import {
  Address,
  BASE_FEE,
  Contract,
  TransactionBuilder,
  nativeToScVal,
  rpc,
  scValToNative,
  xdr,
} from '@stellar/stellar-sdk';
import type { Balance, ContractInfo, TxReceipt } from './contract';
import {
  assertLiveConfig,
  getNetworkPassphrase,
  getSimulationAddress,
  getSorobanRpcUrl,
} from './runtime-config';

const server = new rpc.Server(getSorobanRpcUrl());

function ensureLiveReadConfig(): string {
  assertLiveConfig(['NEXT_PUBLIC_STELLAR_SIMULATION_ADDRESS']);
  return getSimulationAddress();
}

async function simulateRead(
  contractId: string,
  method: string,
  args: xdr.ScVal[] = []
): Promise<xdr.ScVal> {
  const source = await server.getAccount(ensureLiveReadConfig());
  const tx = new TransactionBuilder(source, {
    fee: BASE_FEE,
    networkPassphrase: getNetworkPassphrase(),
  })
    .addOperation(new Contract(contractId).call(method, ...args))
    .setTimeout(30)
    .build();

  const simulation = await server.simulateTransaction(tx);
  if ('error' in simulation) {
    throw new Error(simulation.error);
  }
  if (!simulation.result) {
    throw new Error(`La simulacion de ${method} no devolvio resultado.`);
  }

  return simulation.result.retval;
}

function toStringValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'toString' in value) {
    return String(value);
  }
  return '';
}

function toNumberValue(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'bigint') return Number(value);
  if (typeof value === 'string' && value !== '') return Number(value);
  return 0;
}

export async function getBalance(contractId: string): Promise<Balance> {
  const native = scValToNative(await simulateRead(contractId, 'get_balance')) as
    | [unknown, unknown, unknown, unknown]
    | undefined;

  if (!Array.isArray(native) || native.length < 4) {
    throw new Error('No se pudo interpretar get_balance() en modo live.');
  }

  return {
    savings: toNumberValue(native[0]),
    severance: toNumberValue(native[1]),
    total: toNumberValue(native[2]),
    depositCount: toNumberValue(native[3]),
  };
}

export async function getInfo(contractId: string): Promise<ContractInfo | null> {
  const native = scValToNative(await simulateRead(contractId, 'get_info')) as
    | Record<string, unknown>
    | undefined;

  if (!native || typeof native !== 'object') {
    throw new Error('No se pudo interpretar get_info() en modo live.');
  }

  return {
    employer: toStringValue(native.employer),
    worker: toStringValue(native.worker),
    token: toStringValue(native.token),
    savingsPct: toNumberValue(native.savings_pct ?? native.savingsPct),
    severancePct: toNumberValue(native.severance_pct ?? native.severancePct),
    isTerminated: Boolean(native.is_terminated ?? native.isTerminated),
  };
}

async function buildPreparedTransaction(
  contractId: string,
  sourceAddress: string,
  method: string,
  args: xdr.ScVal[]
): Promise<string> {
  const source = await server.getAccount(sourceAddress);
  const tx = new TransactionBuilder(source, {
    fee: BASE_FEE,
    networkPassphrase: getNetworkPassphrase(),
  })
    .addOperation(new Contract(contractId).call(method, ...args))
    .setTimeout(30)
    .build();

  const prepared = await server.prepareTransaction(tx);
  return prepared.toXDR();
}

export async function buildDepositTx(
  contractId: string,
  employerAddress: string,
  amount: bigint
): Promise<string> {
  return buildPreparedTransaction(contractId, employerAddress, 'deposit', [
    new Address(employerAddress).toScVal(),
    nativeToScVal(amount, { type: 'i128' }),
  ]);
}

export async function buildClaimSavingsTx(
  contractId: string,
  workerAddress: string
): Promise<string> {
  return buildPreparedTransaction(contractId, workerAddress, 'claim_savings', [
    new Address(workerAddress).toScVal(),
  ]);
}

export async function buildTerminateTx(
  contractId: string,
  employerAddress: string
): Promise<string> {
  return buildPreparedTransaction(contractId, employerAddress, 'terminate', [
    new Address(employerAddress).toScVal(),
  ]);
}

export async function buildInitializeTx(
  contractId: string,
  employer: string,
  worker: string,
  token: string,
  savingsPct: number,
  severancePct: number
): Promise<string> {
  return buildPreparedTransaction(contractId, employer, 'initialize', [
    new Address(employer).toScVal(),
    new Address(worker).toScVal(),
    new Address(token).toScVal(),
    nativeToScVal(BigInt(savingsPct), { type: 'u32' }),
    nativeToScVal(BigInt(severancePct), { type: 'u32' }),
  ]);
}

export async function submitTransaction(signedXdr: string): Promise<TxReceipt> {
  const transaction = TransactionBuilder.fromXDR(
    signedXdr,
    getNetworkPassphrase()
  );

  const submitted = await server.sendTransaction(transaction);
  if (submitted.status === 'ERROR') {
    throw new Error('La red rechazo la transaccion antes de confirmarla.');
  }

  const result = await server.pollTransaction(submitted.hash);
  if (result.status !== 'SUCCESS') {
    throw new Error(`La transaccion no quedo confirmada: ${result.status}.`);
  }

  return {
    txHash: submitted.hash,
    status: 'confirmed',
    mode: 'live',
  };
}
