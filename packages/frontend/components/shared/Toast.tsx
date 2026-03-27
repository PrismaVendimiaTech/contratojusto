'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
}

const styles = {
  success: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800', Icon: CheckCircle },
  error: { bg: 'bg-red-50 border-red-200', text: 'text-red-800', Icon: AlertCircle },
  info: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800', Icon: Info },
};

export default function Toast({ type, message, visible, onDismiss, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onDismiss]);

  const { bg, text, Icon } = styles[type];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border ${bg} shadow-lg max-w-sm`}
          role="alert"
          aria-live="assertive"
        >
          <Icon size={20} className={text} />
          <p className={`text-sm font-medium ${text} flex-1`}>{message}</p>
          <button onClick={onDismiss} className={`${text} hover:opacity-70`}>
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
