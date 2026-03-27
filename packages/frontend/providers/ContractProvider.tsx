'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import {
  buildDepositTx,
  buildInitializeTx,
  buildTerminateTx,
  getBalance,
  getInfo,
  submitTransaction,
  type Balance,
  type ContractInfo,
  type TxReceipt,
} from '@/lib/contract';
import { dolaresToStroops, stroopsToDolares } from '@/lib/format';
import { getContractId, getRuntimeMode, getTokenId } from '@/lib/runtime-config';
import {
  createContractCreatedEvent,
  createDepositEvent,
  createTerminateEvent,
  type SystemEvent,
} from '@/lib/system-events';
import { useWallet } from './WalletProvider';

interface CreateContractInput {
  worker: string;
  savingsPct: number;
  severancePct: number;
}

interface DepositInput {
  amount: number;
}

interface ContractState {
  contractId: string;
  balance: Balance | null;
  info: ContractInfo | null;
  systemEvents: SystemEvent[];
  isLoading: boolean;
  isSubmitting: boolean;
  hasActiveContract: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  executePreparedTransaction: (preparedXdr: string) => Promise<TxReceipt>;
  createContract: (input: CreateContractInput) => Promise<TxReceipt>;
  deposit: (input: DepositInput) => Promise<TxReceipt>;
  terminate: () => Promise<TxReceipt>;
}

const ContractContext = createContext<ContractState | null>(null);

export function ContractProvider({ children }: { children: ReactNode }) {
  const mode = getRuntimeMode();
  const configuredContractId = getContractId();
  const contractId = configuredContractId || 'fixture-contract';
  const tokenId = getTokenId();
  const { address, isConnected, signTransaction } = useWallet();
  const [balance, setBalance] = useState<Balance | null>(null);
  const [info, setInfo] = useState<ContractInfo | null>(null);
  const [systemEvents, setSystemEvents] = useState<SystemEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ensureActorAddress = useCallback(() => {
    if (!address || !isConnected) {
      throw new Error('Conecta una wallet antes de continuar.');
    }
    return address;
  }, [address, isConnected]);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [nextBalance, nextInfo] = await Promise.all([
        getBalance(contractId),
        getInfo(contractId),
      ]);
      setBalance(nextBalance);
      setInfo(nextInfo);
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : 'Error al consultar el contrato'
      );
    } finally {
      setIsLoading(false);
    }
  }, [contractId]);

  const executePreparedTransaction = useCallback(
    async (preparedXdr: string): Promise<TxReceipt> => {
      setIsSubmitting(true);
      setError(null);
      try {
        const signedXdr =
          mode === 'live' ? await signTransaction(preparedXdr) : preparedXdr;
        const receipt = await submitTransaction(signedXdr);
        await refresh();
        return receipt;
      } catch (nextError) {
        const message =
          nextError instanceof Error
            ? nextError.message
            : 'No se pudo completar la transaccion.';
        setError(message);
        throw new Error(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [mode, refresh, signTransaction]
  );

  const createContract = useCallback(
    async ({
      worker,
      savingsPct,
      severancePct,
    }: CreateContractInput): Promise<TxReceipt> => {
      const employer = ensureActorAddress();
      const token = tokenId || 'fixture-token';
      const preparedXdr = await buildInitializeTx(
        contractId,
        employer,
        worker,
        token,
        savingsPct,
        severancePct
      );
      const receipt = await executePreparedTransaction(preparedXdr);
      setSystemEvents((current) => [...current, createContractCreatedEvent()]);
      return receipt;
    },
    [contractId, ensureActorAddress, executePreparedTransaction, tokenId]
  );

  const deposit = useCallback(
    async ({ amount }: DepositInput): Promise<TxReceipt> => {
      const employer = ensureActorAddress();
      const activeInfo = info;
      if (!activeInfo) {
        throw new Error('Primero crea el contrato antes de depositar.');
      }

      const amountInStroops = dolaresToStroops(amount);
      const preparedXdr = await buildDepositTx(
        contractId,
        employer,
        amountInStroops
      );
      const receipt = await executePreparedTransaction(preparedXdr);
      const savings = (amount * activeInfo.savingsPct) / 100;
      const severance = amount - savings;
      setSystemEvents((current) => [
        ...current,
        createDepositEvent(amount, savings, severance),
      ]);
      return receipt;
    },
    [contractId, ensureActorAddress, executePreparedTransaction, info]
  );

  const terminate = useCallback(async (): Promise<TxReceipt> => {
    const employer = ensureActorAddress();
    const severanceAmount = balance ? stroopsToDolares(balance.severance) : 0;
    const preparedXdr = await buildTerminateTx(contractId, employer);
    const receipt = await executePreparedTransaction(preparedXdr);
    setSystemEvents((current) => [
      ...current,
      createTerminateEvent(severanceAmount),
    ]);
    return receipt;
  }, [balance, contractId, ensureActorAddress, executePreparedTransaction]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10_000);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <ContractContext.Provider
      value={{
        contractId,
        balance,
        info,
        systemEvents,
        isLoading,
        isSubmitting,
        hasActiveContract: !!info,
        error,
        refresh,
        executePreparedTransaction,
        createContract,
        deposit,
        terminate,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}

export function useContract() {
  const ctx = useContext(ContractContext);
  if (!ctx) throw new Error('useContract must be used within ContractProvider');
  return ctx;
}
