'use client';

import { motion } from 'framer-motion';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (text: string) => void;
}

export default function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-2 py-3">
      {suggestions.map((text, i) => (
        <motion.button
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onSelect(text)}
          className="bg-white border border-slate-200 rounded-full px-4 py-2 min-h-[44px] text-sm text-slate-600 hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all"
        >
          {text}
        </motion.button>
      ))}
    </div>
  );
}
