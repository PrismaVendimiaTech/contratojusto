'use client';

import { truncateAddress, formatDolares } from '@/lib/format';

interface ContractStatusProps {
  info: {
    employer: string;
    worker: string;
    savingsPct: number;
    severancePct: number;
    isTerminated: boolean;
  };
  balance: {
    savings: number;
    severance: number;
    total: number;
    depositCount: number;
  };
}

export default function ContractStatus({ info, balance }: ContractStatusProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg text-slate-800">Estado del contrato</h2>
        <span className={`flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full ${
          info.isTerminated
            ? 'bg-red-100 text-red-700'
            : 'bg-emerald-100 text-emerald-700'
        }`}>
          <span className={`w-2 h-2 rounded-full ${info.isTerminated ? 'bg-red-500' : 'bg-emerald-500'}`} />
          {info.isTerminated ? 'Terminado' : 'Activo'}
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Trabajador</span>
          <span className="font-mono text-slate-700">{truncateAddress(info.worker)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Distribucion</span>
          <span className="text-slate-700">{info.savingsPct}% ahorro / {info.severancePct}% indemnizacion</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Depositos</span>
          <span className="text-slate-700">{balance.depositCount}</span>
        </div>
        <div className="flex justify-between border-t border-slate-100 pt-3">
          <span className="font-medium text-slate-700">Total depositado</span>
          <span className="font-bold text-brand-primary">{formatDolares(balance.total)}</span>
        </div>
      </div>
    </div>
  );
}
