export type RuntimeMode = 'fixture' | 'live';

const TESTNET_PASSPHRASE = 'Test SDF Network ; September 2015';
const DEFAULT_SOROBAN_RPC_URL = 'https://soroban-testnet.stellar.org';
const DEFAULT_HORIZON_URL = 'https://horizon-testnet.stellar.org';

export function getRuntimeMode(): RuntimeMode {
  return process.env.NEXT_PUBLIC_RUNTIME_MODE === 'live' ? 'live' : 'fixture';
}

export function isLiveMode(): boolean {
  return getRuntimeMode() === 'live';
}

export function getContractId(): string {
  return process.env.NEXT_PUBLIC_CONTRACT_ID || '';
}

export function getTokenId(): string {
  return process.env.NEXT_PUBLIC_TOKEN_ID || '';
}

export function getSorobanRpcUrl(): string {
  return process.env.NEXT_PUBLIC_SOROBAN_RPC_URL || DEFAULT_SOROBAN_RPC_URL;
}

export function getHorizonUrl(): string {
  return process.env.NEXT_PUBLIC_HORIZON_URL || DEFAULT_HORIZON_URL;
}

export function getNetworkPassphrase(): string {
  return process.env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE || TESTNET_PASSPHRASE;
}

export function getSimulationAddress(): string {
  return process.env.NEXT_PUBLIC_STELLAR_SIMULATION_ADDRESS || '';
}

export function getWalletConnectProjectId(): string {
  return process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';
}

export function getWalletConnectMetadata() {
  return {
    name: process.env.NEXT_PUBLIC_WALLETCONNECT_APP_NAME || 'ContratoJusto',
    description:
      process.env.NEXT_PUBLIC_WALLETCONNECT_APP_DESCRIPTION ||
      'Contratos laborales digitales para trabajadores informales en Argentina',
    url: process.env.NEXT_PUBLIC_WALLETCONNECT_APP_URL || 'https://contratojusto.local',
    icons: [
      process.env.NEXT_PUBLIC_WALLETCONNECT_APP_ICON ||
        'https://contratojusto.local/icon.png',
    ],
  };
}

export function assertLiveConfig(keys: string[]): void {
  const missing = keys.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Faltan variables live obligatorias: ${missing.join(', ')}.`
    );
  }
}
