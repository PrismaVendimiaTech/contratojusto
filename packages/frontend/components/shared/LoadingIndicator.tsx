'use client';

import { motion } from 'framer-motion';

interface LoadingIndicatorProps {
  text?: string;
}

export default function LoadingIndicator({ text = 'Procesando...' }: LoadingIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-brand-primary"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
      <p className="text-sm text-slate-400">{text}</p>
    </div>
  );
}
