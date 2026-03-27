'use client';

import Logo from './Logo';
import WalletConnect from './WalletConnect';

export default function AppHeader() {
  return (
    <header className="fixed top-0 w-full h-16 header-gradient z-40 flex items-center justify-between px-4 border-b border-slate-200/20">
      <Logo size="md" />
      <WalletConnect />
    </header>
  );
}
