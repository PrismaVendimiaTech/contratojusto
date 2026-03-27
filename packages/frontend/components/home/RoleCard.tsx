'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

interface RoleCardProps {
  role: 'empleador' | 'trabajador';
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export default function RoleCard({ title, description, href, icon: Icon }: RoleCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white/80 backdrop-blur-sm border border-white/40 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-xl p-6 cursor-pointer"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-brand-primary/5 rounded-xl">
            <Icon size={28} className="text-brand-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-brand-primary">{title}</h3>
            <p className="text-sm text-slate-500 mt-1">{description}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
