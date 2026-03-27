'use client';

import { Shield } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { icon: 20, text: 'text-base' },
  md: { icon: 24, text: 'text-lg' },
  lg: { icon: 32, text: 'text-2xl' },
};

export default function Logo({ size = 'md' }: LogoProps) {
  const s = sizes[size];
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="ContratoJusto - Inicio">
      <Shield size={s.icon} className="text-white" />
      <span className={`font-bold ${s.text} text-white tracking-tight`}>
        ContratoJusto
      </span>
    </Link>
  );
}
