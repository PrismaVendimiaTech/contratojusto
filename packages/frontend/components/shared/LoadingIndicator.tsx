'use client';

import { motion } from 'framer-motion';

interface LoadingIndicatorProps {
  text?: string;
}

export default function LoadingIndicator({ text }: LoadingIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 max-w-[85%]">
      <span className="typing-dot" />
      <span className="typing-dot" />
      <span className="typing-dot" />
      {text && <span className="text-xs text-slate-400 ml-2">{text}</span>}
    </div>
  );
}
