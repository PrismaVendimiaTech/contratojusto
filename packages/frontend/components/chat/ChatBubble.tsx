'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ChatBubbleProps {
  role: 'ai' | 'user' | 'system';
  content: string;
  children?: ReactNode;
}

const bubbleStyles = {
  ai: 'bg-chat-ai rounded-2xl rounded-bl-sm max-w-[85%] mr-auto',
  user: 'bg-chat-user rounded-2xl rounded-br-sm max-w-[85%] ml-auto',
  system: 'bg-chat-system rounded-xl max-w-[90%] mx-auto text-center',
};

export default function ChatBubble({ role, content, children }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`p-4 ${bubbleStyles[role]}`}
    >
      <p className="text-sm text-slate-800 whitespace-pre-wrap">{content}</p>
      {children}
    </motion.div>
  );
}
