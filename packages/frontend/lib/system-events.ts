export type SystemEventKind =
  | 'contract-created'
  | 'deposit-received'
  | 'contract-terminated';

export interface SystemEvent {
  id: string;
  kind: SystemEventKind;
  title: string;
  body: string;
  timestamp: string;
  pushDelivered: boolean;
}

function createBaseEvent(
  kind: SystemEventKind,
  title: string,
  body: string,
  pushDelivered = false
): SystemEvent {
  return {
    id: `evt-${kind}-${Date.now()}`,
    kind,
    title,
    body,
    timestamp: new Date().toISOString(),
    pushDelivered,
  };
}

export function createContractCreatedEvent(): SystemEvent {
  return createBaseEvent(
    'contract-created',
    'Contrato creado',
    'Tu contrato ya esta listo para recibir depositos.'
  );
}

export function createDepositEvent(
  amount: number,
  savings: number,
  severance: number
): SystemEvent {
  return createBaseEvent(
    'deposit-received',
    'Deposito recibido',
    `Tu patron transfirio ${amount.toFixed(2)} dolares. Ahorro +${savings.toFixed(
      2
    )}, Indemnizacion +${severance.toFixed(2)}.`
  );
}

export function createTerminateEvent(severanceAmount: number): SystemEvent {
  return createBaseEvent(
    'contract-terminated',
    'Contrato terminado',
    `Recibiste ${severanceAmount.toFixed(2)} dolares de indemnizacion.`
  );
}
