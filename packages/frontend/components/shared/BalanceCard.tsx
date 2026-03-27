'use client';

import { formatDolares } from '@/lib/format';

export type BalanceQueryPhase =
  | 'idle'
  | 'loading'
  | 'loaded'
  | 'refreshing'
  | 'error'
  | 'transferred';

interface BalanceCardProps {
  savings: number;
  severance: number;
  total: number;
  depositCount: number;
  variant?: 'card' | 'inline';
  phase?: BalanceQueryPhase;
  transferLabel?: string;
  onRetry?: () => void;
}

export default function BalanceCard({
  savings,
  severance,
  total,
  depositCount,
  variant = 'card',
  phase = 'loaded',
  transferLabel = 'Transferido',
  onRetry,
}: BalanceCardProps) {
  const containerClass = variant === 'card'
    ? 'bg-white rounded-xl shadow-sm border border-slate-200 p-4'
    : 'bg-slate-50 rounded-xl p-4';

  if (phase === 'error') {
    return (
      <div className={`${containerClass} border border-red-200 bg-red-50`}>
        <p className="text-sm text-red-700">No se pudo cargar el balance.</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 text-sm font-medium text-brand-primary underline"
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`${containerClass} ${
        phase === 'transferred'
          ? 'border border-emerald-200 bg-emerald-50/60'
          : ''
      }`}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500">Ahorro</span>
          <span className="font-semibold text-emerald-500">{formatDolares(savings)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500">Indemnizacion</span>
          <span className="font-semibold text-slate-400">{formatDolares(severance)}</span>
        </div>
        <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
          <span className="text-sm font-medium text-slate-700">Total</span>
          <span className="font-bold text-brand-primary">{formatDolares(total)}</span>
        </div>
      </div>
      {phase === 'transferred' && (
        <p className="mt-2 text-xs font-medium text-emerald-700">
          {transferLabel}
        </p>
      )}
      <p className="text-xs text-slate-400 mt-2">{depositCount} deposito{depositCount !== 1 ? 's' : ''} realizados</p>
    </div>
  );
}
