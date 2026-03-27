'use client';

import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import type { SystemEventKind } from '@/lib/system-events';

interface SystemEventMessageProps {
  kind: SystemEventKind;
  title: string;
  body: string;
  timestamp?: string;
  pushDelivered?: boolean;
}

export default function SystemEventMessage({
  title,
  body,
  timestamp,
  pushDelivered = false,
}: SystemEventMessageProps) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-slate-100 border border-slate-200 rounded-2xl p-4 max-w-[85%] mx-auto"
      role="status"
    >
      <div className="flex items-start gap-2 text-slate-500">
        <Bell size={14} />
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800">{title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-700">{body}</p>
          <div className="mt-2 flex items-center justify-between gap-2 text-xs">
            {timestamp ? (
              <time className="text-slate-500">{new Date(timestamp).toLocaleString('es-AR')}</time>
            ) : (
              <span className="text-slate-500">Hace instantes</span>
            )}
            <span
              className={`inline-flex rounded-full px-2 py-0.5 ${
                pushDelivered
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {pushDelivered ? 'Push enviado' : 'Push opcional'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
