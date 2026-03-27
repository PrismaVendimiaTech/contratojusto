import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['pino', 'pino-pretty'],
  webpack: (config, { isServer }) => {
    // Stub pino-pretty for WalletConnect (both server and client)
    config.resolve.alias = {
      ...config.resolve.alias,
      'pino-pretty': false,
    };
    if (!isServer) {
      // Polyfills for Stellar SDK in browser
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        stream: false,
        buffer: false,
        http: false,
        https: false,
        url: false,
      };
    }
    return config;
  },
  // Env validation: fail fast if critical vars missing in production
  env: {
    NEXT_PUBLIC_STELLAR_NETWORK: process.env.NEXT_PUBLIC_STELLAR_NETWORK || 'testnet',
  },
};

export default nextConfig;
