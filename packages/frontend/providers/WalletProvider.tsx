'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import {
  createWalletKit,
  fetchBalance,
  getSupportedWallets,
  getWalletNetworkPassphrase,
  type SupportedWallet,
  type WalletKitLike,
} from '@/lib/wallet';

interface WalletState {
  address: string | null;
  balance: string | null;
  selectedWalletId: string | null;
  selectedWalletName: string | null;
  supportedWallets: SupportedWallet[];
  isConnected: boolean;
  isConnecting: boolean;
  isReady: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signTransaction: (xdr: string) => Promise<string>;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletState | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [kit, setKit] = useState<WalletKitLike | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const [selectedWalletName, setSelectedWalletName] = useState<string | null>(null);
  const [supportedWallets, setSupportedWallets] = useState<SupportedWallet[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      try {
        const [supported, nextKit] = await Promise.all([
          getSupportedWallets(),
          createWalletKit(),
        ]);
        if (!active) return;
        setSupportedWallets(supported);
        setKit(nextKit);
      } catch (error) {
        console.error('Wallet bootstrap error:', error);
      }
    }

    bootstrap();
    return () => {
      active = false;
    };
  }, []);

  const refreshBalance = useCallback(async () => {
    if (!address) {
      setBalance(null);
      return;
    }

    const nextBalance = await fetchBalance(address);
    setBalance(nextBalance);
  }, [address]);

  const ensureKit = useCallback(async () => {
    if (kit) return kit;
    const nextKit = await createWalletKit(selectedWalletId || undefined);
    setKit(nextKit);
    return nextKit;
  }, [kit, selectedWalletId]);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      const walletKit = await ensureKit();
      await walletKit.openModal({
        modalTitle: 'Elegi una wallet para continuar',
        notAvailableText: 'No disponible en este navegador',
        onWalletSelected: async (option) => {
          walletKit.setWallet(option.id);
          const response = await walletKit.getAddress();
          setAddress(response.address);
          setSelectedWalletId(option.id);
          setSelectedWalletName(option.name);
          setBalance(await fetchBalance(response.address));
        },
      });
    } catch (error) {
      console.error('Wallet connect error:', error);
    } finally {
      setIsConnecting(false);
    }
  }, [ensureKit]);

  const disconnect = useCallback(async () => {
    try {
      const walletKit = await ensureKit();
      await walletKit.disconnect();
    } catch {
      // noop
    }
    setAddress(null);
    setBalance(null);
    setSelectedWalletId(null);
    setSelectedWalletName(null);
  }, [ensureKit]);

  const signTransaction = useCallback(async (xdr: string): Promise<string> => {
    const walletKit = await ensureKit();
    const { signedTxXdr } = await walletKit.signTransaction(xdr, {
      address: address || undefined,
      networkPassphrase: getWalletNetworkPassphrase(),
    });
    return signedTxXdr;
  }, [address, ensureKit]);

  const value: WalletState = {
    address,
    balance,
    selectedWalletId,
    selectedWalletName,
    supportedWallets,
    isConnected: !!address,
    isConnecting,
    isReady: !!kit,
    connect,
    disconnect,
    signTransaction,
    refreshBalance,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
}
