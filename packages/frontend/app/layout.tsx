'use client';

import './globals.css';
import { WalletProvider } from '@/providers/WalletProvider';
import { ContractProvider } from '@/providers/ContractProvider';
import ConfirmaGlow from '@/components/shared/ConfirmaGlow';
import { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [glowActive, setGlowActive] = useState(false);

  return (
    <html lang="es-AR">
      <head>
        <title>ContratoJusto - Derechos laborales digitales</title>
        <meta name="description" content="Contratos laborales digitales para trabajadores informales en Argentina" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans bg-slate-50 text-slate-800 antialiased">
        <WalletProvider>
          <ContractProvider>
            <ConfirmaGlow active={glowActive} />
            {children}
          </ContractProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
