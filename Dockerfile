FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/frontend/package.json packages/frontend/
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/frontend/node_modules ./packages/frontend/node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/frontend packages/frontend
ARG NEXT_PUBLIC_RUNTIME_MODE=live
ARG NEXT_PUBLIC_SOROBAN_RPC_URL
ARG NEXT_PUBLIC_HORIZON_URL
ARG NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE
ARG NEXT_PUBLIC_CONTRACT_ID
ARG NEXT_PUBLIC_TOKEN_ID
ARG NEXT_PUBLIC_STELLAR_SIMULATION_ADDRESS
ARG NEXT_PUBLIC_WALLETCONNECT_APP_NAME=ContratoJusto
ARG NEXT_PUBLIC_WALLETCONNECT_APP_URL=https://contratojusto.nuestrascuentitas.com
RUN mkdir -p packages/frontend/public
RUN pnpm --filter frontend build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/packages/frontend/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/packages/frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/frontend/.next/static ./packages/frontend/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/packages/frontend/public ./packages/frontend/public
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "packages/frontend/server.js"]
