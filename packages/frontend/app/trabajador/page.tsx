'use client';

import { motion } from 'framer-motion';
import AppHeader from '@/components/shared/AppHeader';
import HeroBalance from '@/components/chat/HeroBalance';
import ChatFullscreen from '@/components/chat/ChatFullscreen';
import { useContract } from '@/providers/ContractProvider';
import { stroopsToDolares } from '@/lib/format';

export default function TrabajadorPage() {
  const { balance } = useContract();
  const savingsDisplay = balance ? stroopsToDolares(balance.savings) : null;

  return (
    <div className="flex flex-col h-screen">
      <AppHeader />
      <motion.div
        className="pt-16"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {savingsDisplay !== null && (
          <HeroBalance amount={savingsDisplay} />
        )}
        <ChatFullscreen />
      </motion.div>
    </div>
  );
}
