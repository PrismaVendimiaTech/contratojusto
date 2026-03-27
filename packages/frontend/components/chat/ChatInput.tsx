'use client';

import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import type { FormEvent, ChangeEvent } from 'react';

interface ChatInputProps {
  input: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  disabled?: boolean;
}

export default function ChatInput({ input, onChange, onSubmit, disabled }: ChatInputProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border-t border-slate-200 p-4 flex gap-2"
    >
      <input
        type="text"
        value={input}
        onChange={onChange}
        placeholder="Escribi tu pregunta..."
        disabled={disabled}
        className="flex-1 border border-slate-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none disabled:opacity-50"
        aria-label="Escribi tu pregunta"
        autoFocus
      />
      <motion.button
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={disabled || !input.trim()}
        className="bg-brand-primary text-white rounded-lg p-3 min-w-11 min-h-11 flex items-center justify-center disabled:opacity-50 transition-all"
      >
        <Send size={18} />
      </motion.button>
    </form>
  );
}
