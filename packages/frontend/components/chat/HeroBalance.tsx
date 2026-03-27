'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface HeroBalanceProps {
  amount: number;
  label?: string;
}

export default function HeroBalance({ amount, label = 'dolares de ahorro' }: HeroBalanceProps) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    spring.set(amount);
  }, [amount, spring]);

  useEffect(() => {
    return display.on('change', (v) => setDisplayValue(v));
  }, [display]);

  return (
    <div className="bg-white border-b border-slate-100 py-3 px-4 text-center">
      <motion.span
        className="text-3xl font-bold text-brand-primary"
        key={amount}
      >
        ${displayValue}
      </motion.span>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
  );
}
