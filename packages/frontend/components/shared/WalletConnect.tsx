'use client';

import { useWallet } from '@/providers/WalletProvider';
import { truncateAddress } from '@/lib/format';
import { Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WalletConnect() {
  const {
    address,
    isConnected,
    isConnecting,
    isReady,
    selectedWalletName,
    connect,
    disconnect,
  } = useWallet();

  if (isConnected && address) {
    return (
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={disconnect}
        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-sm text-white border border-white/20 hover:bg-white/20 transition-all"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="font-mono">
          {selectedWalletName ? `${selectedWalletName}: ` : ''}
          {truncateAddress(address)}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={connect}
      disabled={isConnecting || !isReady}
      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-white border border-white/20 hover:bg-white/20 transition-all disabled:opacity-50"
    >
      <Wallet size={16} />
      {isConnecting ? 'Conectando...' : isReady ? 'Conectar Wallet' : 'Cargando wallets...'}
    </motion.button>
  );
}
