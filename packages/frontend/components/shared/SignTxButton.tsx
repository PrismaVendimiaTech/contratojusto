'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Check, AlertCircle } from 'lucide-react';
import { useContract } from '@/providers/ContractProvider';
import TxProgressSteps from '@/components/chat/TxProgressSteps';

interface SignTxButtonProps {
  xdr: string;
  label?: string;
  onSuccess: (txHash: string) => void;
  onError: (error: Error) => void;
}

type TxState = 'ready' | 'opening' | 'signing' | 'sending' | 'confirmed' | 'error';

export default function SignTxButton({ xdr, label = 'Firmar transaccion', onSuccess, onError }: SignTxButtonProps) {
  const { executePreparedTransaction } = useContract();
  const [state, setState] = useState<TxState>('ready');
  const [errorMsg, setErrorMsg] = useState('');
  const [txHash, setTxHash] = useState<string | null>(null);

  type StepStatus = 'pending' | 'active' | 'done' | 'error';
  const getStepStatus = (idx: number): StepStatus => {
    const stateOrder: TxState[] = ['ready', 'opening', 'signing', 'sending', 'confirmed'];
    const currentIdx = stateOrder.indexOf(state);
    if (state === 'error') return 'pending';
    if (idx < currentIdx) return 'done';
    if (idx === currentIdx) return 'active';
    return 'pending';
  };
  const steps = [
    { label: 'Wallet abierta', status: getStepStatus(1) },
    { label: 'Transaccion firmada', status: getStepStatus(2) },
    { label: 'Enviando a la red...', status: getStepStatus(3) },
    { label: 'Confirmado', status: getStepStatus(4) },
  ];

  const handleSign = async () => {
    setState('opening');
    try {
      setState('signing');
      setState('sending');
      const receipt = await executePreparedTransaction(xdr);
      setTxHash(receipt.txHash);
      setState('confirmed');
      onSuccess(receipt.txHash);
    } catch (e) {
      setState('error');
      const err = e instanceof Error ? e : new Error('La transaccion fallo');
      setErrorMsg(err.message);
      onError(err);
    }
  };

  if (state === 'error') {
    return (
      <div className="mt-2 space-y-2">
        <TxProgressSteps steps={steps.map((s) => ({ ...s, status: 'pending' as const }))} />
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          <span>{errorMsg || 'La transaccion fallo. Tus fondos estan seguros.'}</span>
        </div>
        <button onClick={() => setState('ready')} className="text-sm text-brand-primary underline">
          Reintentar
        </button>
      </div>
    );
  }

  if (state !== 'ready') {
    return (
      <div className="mt-2">
        <TxProgressSteps steps={steps} />
        {state === 'confirmed' && txHash && (
          <div className="mt-2 flex items-center gap-2 text-sm text-emerald-700">
            <Check size={16} />
            <span>Retiro confirmado. Referencia: {txHash.slice(0, 10)}...</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={handleSign}
      className="mt-2 w-full bg-amber-500 text-white font-bold rounded-lg px-6 py-3 flex items-center justify-center gap-2 hover:bg-amber-600 transition-all"
    >
      <Lock size={16} />
      {label}
    </motion.button>
  );
}
