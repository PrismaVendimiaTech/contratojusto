'use client';

import { Briefcase, User } from 'lucide-react';
import { Shield } from 'lucide-react';
import RoleCard from '@/components/home/RoleCard';
import { useWallet } from '@/providers/WalletProvider';
import ActionButton from '@/components/shared/ActionButton';
import { truncateAddress } from '@/lib/format';

export default function HomePage() {
  const { address, isConnected, isConnecting, isReady, connect, selectedWalletName } = useWallet();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-2">
        <Shield size={36} className="text-brand-primary" />
        <h1 className="text-3xl font-bold text-brand-primary tracking-tight">
          ContratoJusto
        </h1>
      </div>
      <p className="text-sm text-slate-500 mb-10">
        Derechos laborales digitales
      </p>

      {/* Role cards */}
      <div className="w-full max-w-sm space-y-4">
        <RoleCard
          role="empleador"
          title="Soy Empleador"
          description="Crear contrato, depositar, gestionar"
          href="/empleador"
          icon={Briefcase}
        />
        <RoleCard
          role="trabajador"
          title="Soy Trabajador"
          description="Ver mi ahorro, hablar con mi asesor"
          href="/trabajador"
          icon={User}
        />
      </div>

      {/* Wallet connect */}
      <div className="mt-8 w-full max-w-sm">
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
      </div>

      {/* Network label */}
      <p className="text-xs text-slate-400 mt-4">Stellar Testnet</p>
    </div>
  );
}
