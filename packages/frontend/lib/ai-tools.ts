import { tool } from 'ai';
import { z } from 'zod';
import {
  buildClaimSavingsTx,
  buildDepositTx,
  getBalance,
  getInfo,
} from './contract';
import { stroopsToDolares } from './format';

export interface ChatToolContext {
  contractId: string;
  actorAddress?: string | null;
}

function requireActorAddress(actorAddress?: string | null): string {
  if (!actorAddress) {
    throw new Error('Conecta tu wallet antes de continuar.');
  }

  return actorAddress;
}

export function createChatTools({
  contractId,
  actorAddress,
}: ChatToolContext) {
  return {
    consultarBalance: tool({
      description: 'Consulta el balance actual del contrato laboral',
      parameters: z.object({}),
      execute: async () => {
        const bal = await getBalance(contractId);
        return {
          ahorro: stroopsToDolares(bal.savings),
          indemnizacion: stroopsToDolares(bal.severance),
          total: stroopsToDolares(bal.total),
          depositos: bal.depositCount,
        };
      },
    }),

    consultarEstado: tool({
      description: 'Consulta el estado completo del contrato',
      parameters: z.object({}),
      execute: async () => {
        const [info, bal] = await Promise.all([
          getInfo(contractId),
          getBalance(contractId),
        ]);

        return {
          estado: info ? (info.isTerminated ? 'terminado' : 'activo') : 'sin-contrato',
          ahorroPct: info?.savingsPct ?? 0,
          indemnizacionPct: info?.severancePct ?? 0,
          totalDepositado: stroopsToDolares(bal.total),
          depositos: bal.depositCount,
        };
      },
    }),

    prepararDeposito: tool({
      description: 'Prepara una transaccion de deposito para que el empleador firme',
      parameters: z.object({
        monto: z.number().positive().describe('Monto en dolares a depositar'),
      }),
      execute: async ({ monto }) => {
        try {
          const employerAddress = requireActorAddress(actorAddress);
          const amountInStroops = BigInt(Math.round(monto * 10_000_000));
          const xdr = await buildDepositTx(
            contractId,
            employerAddress,
            amountInStroops
          );
          return {
            xdr,
            resumen: `Depositar ${monto} dolares. Ahorro: ${(monto * 0.7).toFixed(2)}, Indemnizacion: ${(monto * 0.3).toFixed(2)}`,
          };
        } catch (error) {
          return {
            error: true,
            mensaje:
              error instanceof Error
                ? error.message
                : 'No pude preparar el deposito en este momento.',
          };
        }
      },
    }),

    prepararReclamo: tool({
      description:
        'Prepara una transaccion de reclamo de ahorro para que el trabajador firme',
      parameters: z.object({
        tipo: z
          .enum(['ahorro'])
          .describe(
            'Solo ahorro. Indemnizacion se libera automaticamente al terminar.'
          ),
      }),
      execute: async () => {
        try {
          const workerAddress = requireActorAddress(actorAddress);
          const bal = await getBalance(contractId);
          const monto = stroopsToDolares(bal.savings);
          if (monto <= 0) {
            return { error: true, mensaje: 'No hay ahorro disponible para reclamar.' };
          }

          const xdr = await buildClaimSavingsTx(contractId, workerAddress);
          return {
            xdr,
            resumen: `Reclamar ${monto} dolares de ahorro.`,
            monto,
          };
        } catch (error) {
          return {
            error: true,
            mensaje:
              error instanceof Error
                ? error.message
                : 'No pude preparar el retiro en este momento.',
          };
        }
      },
    }),
  };
}
