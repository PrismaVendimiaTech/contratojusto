'use client';

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
      <div className="pt-16">
        {savingsDisplay !== null && (
          <HeroBalance amount={savingsDisplay} />
        )}
        <ChatFullscreen />
      </div>
    </div>
  );
}
