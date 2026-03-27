'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmaGlowProps {
  active: boolean;
}

export default function ConfirmaGlow({ active }: ConfirmaGlowProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-50 pointer-events-none bg-emerald-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.05, 0] }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  );
}
