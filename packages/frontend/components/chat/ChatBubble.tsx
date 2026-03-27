'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ChatBubbleProps {
  role: 'ai' | 'user' | 'system';
  content: string;
  children?: ReactNode;
}

const bubbleStyles = {
  ai: 'bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tl-sm max-w-[85%] mr-auto',
  user: 'bg-brand-primary rounded-2xl rounded-tr-sm max-w-[85%] ml-auto',
  system: 'bg-slate-100 rounded-xl max-w-[90%] mx-auto text-center',
};

const textStyles = {
  ai: 'text-sm text-slate-800',
  user: 'text-sm text-white',
  system: 'text-sm text-slate-600',
};

export default function ChatBubble({ role, content, children }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`px-4 py-3 ${bubbleStyles[role]}`}
    >
      {content && (
        <p className={`${textStyles[role]} whitespace-pre-wrap leading-relaxed`}>{content}</p>
      )}
      {children}
    </motion.div>
  );
}
