// Wallet adapter - thin wrapper around StellarWalletsKit patterns.
// This is the ONLY wallet integration point. Do NOT create freighter.ts.

import { Horizon } from '@stellar/stellar-sdk';
import {
  getHorizonUrl,
  getNetworkPassphrase,
} from './runtime-config';

export interface SupportedWallet {
  id: string;
  name: string;
  isAvailable: boolean;
  isPlatformWrapper: boolean;
  icon: string;
  url: string;
}

export interface WalletKitLike {
  getSupportedWallets(): Promise<SupportedWallet[]>;
  setWallet(id: string): void;
  getAddress(params?: {
    path?: string;
    skipRequestAccess?: boolean;
  }): Promise<{ address: string }>;
  signTransaction(
    xdr: string,
    opts?: {
      networkPassphrase?: string;
      address?: string;
      path?: string;
      submit?: boolean;
      submitUrl?: string;
    }
  ): Promise<{ signedTxXdr: string; signerAddress?: string }>;
  disconnect(): Promise<void>;
  getNetwork(): Promise<{ network: string; networkPassphrase: string }>;
  openModal(params: {
    onWalletSelected: (option: SupportedWallet) => void | Promise<void>;
    onClosed?: (err: Error) => void;
    modalTitle?: string;
    notAvailableText?: string;
  }): Promise<void>;
}

let cachedFactory:
  | Promise<{
      createKit: (selectedWalletId?: string) => WalletKitLike;
      networkPassphrase: string;
    }>
  | null = null;

const server = new Horizon.Server(getHorizonUrl());

async function loadFactory() {
  if (!cachedFactory) {
    cachedFactory = (async () => {
      const kitModule = await import('@creit.tech/stellar-wallets-kit');
      const utilsModule = await import('@creit.tech/stellar-wallets-kit/utils');

      const modules = [...utilsModule.allowAllModules()];

      return {
        createKit: (selectedWalletId?: string) =>
          new kitModule.StellarWalletsKit({
            network: kitModule.WalletNetwork.TESTNET,
            selectedWalletId,
            modules,
          }) as WalletKitLike,
        networkPassphrase: getNetworkPassphrase(),
      };
    })();
  }

  return cachedFactory;
}

export async function createWalletKit(selectedWalletId?: string): Promise<WalletKitLike> {
  if (typeof window === 'undefined') {
    throw new Error('Wallets Kit solo puede inicializarse en el navegador.');
  }

  const factory = await loadFactory();
  return factory.createKit(selectedWalletId);
}

export async function getSupportedWallets(): Promise<SupportedWallet[]> {
  const kit = await createWalletKit();
  const wallets = await kit.getSupportedWallets();
  return wallets.filter((wallet) => wallet.isAvailable);
}

export async function fetchBalance(address: string): Promise<string> {
  try {
    const account = await server.loadAccount(address);
    const native = account.balances.find(
      (balance) => balance.asset_type === 'native'
    );
    return native ? native.balance : '0';
  } catch {
    return '0';
  }
}

export function getWalletNetworkPassphrase(): string {
  return getNetworkPassphrase();
}

export function truncateAddress(address: string): string {
  if (!address || address.length < 8) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
