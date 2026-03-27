'use client';

import { useState } from 'react';
import ActionButton from '@/components/shared/ActionButton';
import { useContract } from '@/providers/ContractProvider';

interface TerminateSectionProps {
  severanceAmount: number;
  onTerminate?: () => void;
}

export default function TerminateSection({ severanceAmount, onTerminate }: TerminateSectionProps) {
  const { terminate, isSubmitting } = useContract();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTerminate = async () => {
    setError('');
    setSuccess('');
    try {
      const receipt = await terminate();
      setSuccess(`Contrato terminado. Referencia ${receipt.txHash.slice(0, 10)}...`);
      onTerminate?.();
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : 'No se pudo terminar el contrato.'
      );
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
      <h3 className="font-semibold text-base text-red-800 mb-2">Terminar contrato</h3>
      <p className="text-sm text-red-600 mb-4">
        Esto liberara ${severanceAmount.toFixed(2)} dolares de indemnizacion al trabajador.
      </p>
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      {success && <p className="mb-3 text-sm text-emerald-700">{success}</p>}

      {!confirming ? (
        <ActionButton variant="danger" onClick={() => setConfirming(true)}>
          Terminar contrato
        </ActionButton>
      ) : (
        <div className="flex gap-2">
          <ActionButton variant="danger" onClick={handleTerminate} loading={isSubmitting} className="flex-1">
            Confirmar terminar?
          </ActionButton>
          <button
            onClick={() => setConfirming(false)}
            disabled={isSubmitting}
            className="flex-1 bg-slate-200 text-slate-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-300 transition-all"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
