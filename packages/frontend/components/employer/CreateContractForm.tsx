'use client';

import { useState } from 'react';
import ActionButton from '@/components/shared/ActionButton';
import { isValidStellarAddress, isValidSplit } from '@/lib/validation';
import { useContract } from '@/providers/ContractProvider';

export default function CreateContractForm() {
  const { createContract, isSubmitting } = useContract();
  const [worker, setWorker] = useState('');
  const [savingsPct, setSavingsPct] = useState(70);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const severancePct = 100 - savingsPct;
  const isValid = isValidStellarAddress(worker) && isValidSplit(savingsPct, severancePct);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setError('');
    setSuccess('');
    try {
      const receipt = await createContract({ worker, savingsPct, severancePct });
      setSuccess(`Contrato creado. Referencia ${receipt.txHash.slice(0, 10)}...`);
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : 'No se pudo crear el contrato. Intenta de nuevo.'
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="font-semibold text-lg text-slate-800 mb-4">Crear contrato</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Direccion del trabajador
          </label>
          <input
            type="text"
            value={worker}
            onChange={(e) => setWorker(e.target.value)}
            placeholder="G..."
            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
          />
          {worker && !isValidStellarAddress(worker) && (
            <p className="text-xs text-red-500 mt-1">Direccion invalida</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">% Ahorro</label>
            <input
              type="number"
              value={savingsPct}
              onChange={(e) => setSavingsPct(Math.min(99, Math.max(1, Number(e.target.value))))}
              min={1} max={99}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">% Indemnizacion</label>
            <input
              type="number"
              value={severancePct}
              disabled
              className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm bg-slate-50 text-slate-500"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-emerald-600">{success}</p>}

        <ActionButton type="submit" disabled={!isValid} loading={isSubmitting}>
          Crear contrato
        </ActionButton>
      </form>
    </div>
  );
}
