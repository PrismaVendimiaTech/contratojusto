'use client';

import { useState } from 'react';
import ActionButton from '@/components/shared/ActionButton';
import { isValidAmount } from '@/lib/validation';
import { useContract } from '@/providers/ContractProvider';

interface DepositFormProps {
  savingsPct: number;
  severancePct: number;
}

export default function DepositForm({ savingsPct, severancePct }: DepositFormProps) {
  const { deposit, isSubmitting } = useContract();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const numAmount = parseFloat(amount) || 0;
  const savingsPreview = (numAmount * savingsPct / 100).toFixed(2);
  const severancePreview = (numAmount * severancePct / 100).toFixed(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidAmount(numAmount)) return;
    setError('');
    setSuccess('');
    try {
      const receipt = await deposit({ amount: numAmount });
      setSuccess(`Deposito confirmado. Referencia ${receipt.txHash.slice(0, 10)}...`);
      setAmount('');
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : 'La transaccion fallo. Tus fondos no fueron movidos.'
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="font-semibold text-lg text-slate-800 mb-4">Depositar</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Monto en dolares</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="100"
            min="0"
            step="0.01"
            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
          />
        </div>

        {numAmount > 0 && (
          <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>Ahorro ({savingsPct}%)</span>
              <span className="text-emerald-600 font-medium">+${savingsPreview}</span>
            </div>
            <div className="flex justify-between">
              <span>Indemnizacion ({severancePct}%)</span>
              <span className="text-slate-400 font-medium">+${severancePreview}</span>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-emerald-600">{success}</p>}

        <ActionButton type="submit" disabled={!isValidAmount(numAmount)} loading={isSubmitting}>
          Depositar
        </ActionButton>
      </form>
    </div>
  );
}
