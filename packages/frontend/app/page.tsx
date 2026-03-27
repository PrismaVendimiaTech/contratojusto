'use client';

import { Briefcase, User } from 'lucide-react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import RoleCard from '@/components/home/RoleCard';
import { useWallet } from '@/providers/WalletProvider';
import ActionButton from '@/components/shared/ActionButton';
import { truncateAddress } from '@/lib/format';

export default function HomePage() {
  const { address, isConnected, isConnecting, isReady, connect, selectedWalletName } = useWallet();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo with glow */}
      <motion.div className="flex items-center gap-3 mb-2" variants={itemVariants}>
        <div className="relative">
          <div className="absolute inset-0 bg-brand-secondary/20 rounded-full blur-xl" />
          <Shield size={28} className="text-brand-primary relative z-10 sm:hidden" />
          <Shield size={36} className="text-brand-primary relative z-10 hidden sm:block" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#1E3A5F] to-[#10B981] bg-clip-text text-transparent tracking-tight">
          ContratoJusto
        </h1>
      </motion.div>
      <motion.p className="text-base text-slate-500 mb-10" variants={itemVariants}>
        Derechos laborales digitales
      </motion.p>

      {/* Role cards */}
      <div className="w-full max-w-sm space-y-4">
        <motion.div variants={itemVariants}>
          <RoleCard
            role="empleador"
            title="Soy Empleador"
            description="Crear contrato, depositar, gestionar"
            href="/empleador"
            icon={Briefcase}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <RoleCard
            role="trabajador"
            title="Soy Trabajador"
            description="Ver mi ahorro, hablar con mi asesor"
            href="/trabajador"
            icon={User}
          />
        </motion.div>
      </div>

      {/* Wallet connect */}
      <motion.div className="mt-8 w-full max-w-sm" variants={itemVariants}>
        {isConnected && address ? (
          <div className="text-center text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Conectada{selectedWalletName ? ` con ${selectedWalletName}` : ''}:{' '}
              <span className="font-mono">{truncateAddress(address)}</span>
            </span>
          </div>
        ) : (
          <ActionButton onClick={connect} loading={isConnecting} disabled={!isReady}>
            Conectar Wallet
          </ActionButton>
        )}
      </motion.div>

      {/* Network label */}
      <motion.p className="text-xs text-slate-500 bg-slate-100 rounded-full px-3 py-1 mt-4" variants={itemVariants}>
        Stellar Testnet
      </motion.p>
    </motion.div>
  );
}
