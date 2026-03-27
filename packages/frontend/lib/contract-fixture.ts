import type { Balance, ContractInfo, TxReceipt } from './contract';

interface FixtureState {
  contractId: string;
  employer: string;
  worker: string;
  token: string;
  savingsPct: number;
  severancePct: number;
  balance: Balance;
  isTerminated: boolean;
  initialized: boolean;
}

type FixtureAction =
  | {
      kind: 'initialize';
      contractId: string;
      employer: string;
      worker: string;
      token: string;
      savingsPct: number;
      severancePct: number;
    }
  | {
      kind: 'deposit';
      contractId: string;
      employerAddress: string;
      amount: string;
    }
  | {
      kind: 'claim';
      contractId: string;
      workerAddress: string;
    }
  | {
      kind: 'terminate';
      contractId: string;
      employerAddress: string;
    };

const DEFAULT_BALANCE: Balance = {
  savings: 0,
  severance: 0,
  total: 0,
  depositCount: 0,
};

let state: FixtureState = {
  contractId: 'fixture-contract',
  employer: '',
  worker: '',
  token: '',
  savingsPct: 70,
  severancePct: 30,
  balance: { ...DEFAULT_BALANCE },
  isTerminated: false,
  initialized: false,
};

function encodeFixtureAction(action: FixtureAction): string {
  return `FIXTURE::${JSON.stringify(action)}`;
}

function decodeFixtureAction(payload: string): FixtureAction {
  if (!payload.startsWith('FIXTURE::')) {
    throw new Error('La transaccion fixture no tiene un payload reconocido.');
  }

  return JSON.parse(payload.slice('FIXTURE::'.length)) as FixtureAction;
}

export async function getBalance(contractId: string): Promise<Balance> {
  if (!state.initialized || state.contractId !== contractId) {
    return { ...DEFAULT_BALANCE };
  }

  return { ...state.balance };
}

export async function getInfo(contractId: string): Promise<ContractInfo | null> {
  if (!state.initialized || state.contractId !== contractId) {
    return null;
  }

  return {
    employer: state.employer,
    worker: state.worker,
    token: state.token,
    savingsPct: state.savingsPct,
    severancePct: state.severancePct,
    isTerminated: state.isTerminated,
  };
}

export async function buildInitializeTx(
  contractId: string,
  employer: string,
  worker: string,
  token: string,
  savingsPct: number,
  severancePct: number
): Promise<string> {
  return encodeFixtureAction({
    kind: 'initialize',
    contractId,
    employer,
    worker,
    token,
    savingsPct,
    severancePct,
  });
}

export async function buildDepositTx(
  contractId: string,
  employerAddress: string,
  amount: bigint
): Promise<string> {
  return encodeFixtureAction({
    kind: 'deposit',
    contractId,
    employerAddress,
    amount: amount.toString(),
  });
}

export async function buildClaimSavingsTx(
  contractId: string,
  workerAddress: string
): Promise<string> {
  return encodeFixtureAction({
    kind: 'claim',
    contractId,
    workerAddress,
  });
}

export async function buildTerminateTx(
  contractId: string,
  employerAddress: string
): Promise<string> {
  return encodeFixtureAction({
    kind: 'terminate',
    contractId,
    employerAddress,
  });
}

export async function submitTransaction(payload: string): Promise<TxReceipt> {
  const action = decodeFixtureAction(payload);

  switch (action.kind) {
    case 'initialize': {
      state = {
        contractId: action.contractId,
        employer: action.employer,
        worker: action.worker,
        token: action.token,
        savingsPct: action.savingsPct,
        severancePct: action.severancePct,
        balance: { ...DEFAULT_BALANCE },
        isTerminated: false,
        initialized: true,
      };
      break;
    }
    case 'deposit': {
      if (!state.initialized || state.contractId !== action.contractId) {
        throw new Error('Primero crea el contrato antes de depositar.');
      }
      if (state.isTerminated) {
        throw new Error('No podes depositar porque el contrato ya termino.');
      }
      if (state.employer !== action.employerAddress) {
        throw new Error('Solo el empleador del contrato puede depositar.');
      }

      const amount = Number(BigInt(action.amount));
      const savingsAmount = Math.floor((amount * state.savingsPct) / 100);
      const severanceAmount = amount - savingsAmount;

      state.balance = {
        savings: state.balance.savings + savingsAmount,
        severance: state.balance.severance + severanceAmount,
        total: state.balance.total + amount,
        depositCount: state.balance.depositCount + 1,
      };
      break;
    }
    case 'claim': {
      if (!state.initialized || state.contractId !== action.contractId) {
        throw new Error('Todavia no hay contrato activo para reclamar.');
      }
      if (state.worker !== action.workerAddress) {
        throw new Error('Solo el trabajador del contrato puede reclamar el ahorro.');
      }
      if (state.balance.savings <= 0) {
        throw new Error('No hay ahorro disponible para retirar.');
      }

      state.balance = {
        ...state.balance,
        savings: 0,
      };
      break;
    }
    case 'terminate': {
      if (!state.initialized || state.contractId !== action.contractId) {
        throw new Error('Todavia no hay contrato activo para terminar.');
      }
      if (state.employer !== action.employerAddress) {
        throw new Error('Solo el empleador del contrato puede terminarlo.');
      }
      if (state.isTerminated) {
        throw new Error('El contrato ya estaba terminado.');
      }

      state.isTerminated = true;
      state.balance = {
        ...state.balance,
        severance: 0,
      };
      break;
    }
  }

  return {
    txHash: `fixture-${action.kind}-${Date.now()}`,
    status: 'confirmed',
    mode: 'fixture',
  };
}
