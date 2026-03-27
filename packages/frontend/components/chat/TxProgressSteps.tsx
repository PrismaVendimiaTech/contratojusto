'use client';

import { motion } from 'framer-motion';
import { Check, Loader2, Circle, X } from 'lucide-react';

interface TxStep {
  label: string;
  status: 'pending' | 'active' | 'done' | 'error';
}

interface TxProgressStepsProps {
  steps: TxStep[];
}

const icons = {
  done: <Check size={14} className="text-emerald-600" />,
  active: <Loader2 size={14} className="text-slate-600 animate-spin" />,
  pending: <Circle size={14} className="text-slate-300" />,
  error: <X size={14} className="text-red-500" />,
};

const textStyles = {
  done: 'text-emerald-600',
  active: 'text-slate-600',
  pending: 'text-slate-300',
  error: 'text-red-500',
};

export default function TxProgressSteps({ steps }: TxProgressStepsProps) {
  return (
    <div className="flex flex-col gap-1 pl-2 mt-2">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`flex items-center gap-2 text-sm ${textStyles[step.status]}`}
        >
          {icons[step.status]}
          <span>{step.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
