import { getRuntimeMode } from './runtime-config';
import type { RuntimeMode } from './runtime-config';

export interface Balance {
  savings: number;
  severance: number;
  total: number;
  depositCount: number;
}

export interface ContractInfo {
  employer: string;
  worker: string;
  token?: string;
  savingsPct: number;
  severancePct: number;
  isTerminated: boolean;
}

export interface TxReceipt {
  txHash: string;
  status: 'confirmed';
  mode: RuntimeMode;
}

function normalizeContractId(contractId: string): string {
  if (contractId) return contractId;
  if (getRuntimeMode() === 'fixture') return 'fixture-contract';
  throw new Error('Falta NEXT_PUBLIC_CONTRACT_ID para usar el modo live.');
}

export async function getBalance(contractId: string): Promise<Balance> {
  const resolvedContractId = normalizeContractId(contractId);
  const mode = getRuntimeMode();
  if (mode === 'fixture') {
    const { getBalance } = await import('./contract-fixture');
    return getBalance(resolvedContractId);
  }
  const { getBalance } = await import('./contract-live');
  return getBalance(resolvedContractId);
}

export async function getInfo(contractId: string): Promise<ContractInfo | null> {
  const resolvedContractId = normalizeContractId(contractId);
  const mode = getRuntimeMode();
  if (mode === 'fixture') {
    const { getInfo } = await import('./contract-fixture');
    return getInfo(resolvedContractId);
  }
  const { getInfo } = await import('./contract-live');
  return getInfo(resolvedContractId);
}

export async function buildDepositTx(contractId: string, employerAddress: string, amount: bigint): Promise<string> {
  const resolvedContractId = normalizeContractId(contractId);
  const mode = getRuntimeMode();
  if (mode === 'fixture') {
    const { buildDepositTx } = await import('./contract-fixture');
    return buildDepositTx(resolvedContractId, employerAddress, amount);
  }
  const { buildDepositTx } = await import('./contract-live');
  return buildDepositTx(resolvedContractId, employerAddress, amount);
}

export async function buildClaimSavingsTx(contractId: string, workerAddress: string): Promise<string> {
  const resolvedContractId = normalizeContractId(contractId);
  const mode = getRuntimeMode();
  if (mode === 'fixture') {
    const { buildClaimSavingsTx } = await import('./contract-fixture');
    return buildClaimSavingsTx(resolvedContractId, workerAddress);
  }
  const { buildClaimSavingsTx } = await import('./contract-live');
  return buildClaimSavingsTx(resolvedContractId, workerAddress);
}

export async function buildTerminateTx(contractId: string, employerAddress: string): Promise<string> {
  const resolvedContractId = normalizeContractId(contractId);
  const mode = getRuntimeMode();
  if (mode === 'fixture') {
    const { buildTerminateTx } = await import('./contract-fixture');
    return buildTerminateTx(resolvedContractId, employerAddress);
  }
  const { buildTerminateTx } = await import('./contract-live');
  return buildTerminateTx(resolvedContractId, employerAddress);
}

export async function buildInitializeTx(
  contractId: string,
  employer: string,
  worker: string,
  token: string,
  savingsPct: number,
  severancePct: number
): Promise<string> {
  const resolvedContractId = normalizeContractId(contractId);
  const mode = getRuntimeMode();
  if (mode === 'fixture') {
    const { buildInitializeTx } = await import('./contract-fixture');
    return buildInitializeTx(
      resolvedContractId,
      employer,
      worker,
      token,
      savingsPct,
      severancePct
    );
  }
  const { buildInitializeTx } = await import('./contract-live');
  return buildInitializeTx(
    resolvedContractId,
    employer,
    worker,
    token,
    savingsPct,
    severancePct
  );
}

export async function submitTransaction(signedXdr: string): Promise<TxReceipt> {
  const mode = getRuntimeMode();
  if (mode === 'fixture') {
    const { submitTransaction } = await import('./contract-fixture');
    return submitTransaction(signedXdr);
  }
  const { submitTransaction } = await import('./contract-live');
  return submitTransaction(signedXdr);
}
