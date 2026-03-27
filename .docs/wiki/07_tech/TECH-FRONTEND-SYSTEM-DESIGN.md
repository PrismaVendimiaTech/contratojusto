# TECH - Frontend System Design: ContratoJusto

## Propósito
Definir la arquitectura del frontend: component tree, state management, data fetching, y reglas de implementación.

## Stack
- Next.js 15 (App Router)
- React 19
- TypeScript 5.5+
- Tailwind CSS 4
- @stellar/stellar-sdk v13.3.0
- @creit.tech/stellar-wallets-kit v1.9.5
- ai (Vercel AI SDK) v4
- @ai-sdk/openai-compatible
- lucide-react (íconos)

## Estructura de archivos
```
packages/frontend/
├── app/
│   ├── layout.tsx              ← root layout, providers, fonts
│   ├── page.tsx                ← Home (role selector)
│   ├── empleador/
│   │   └── page.tsx            ← Dashboard empleador
│   ├── trabajador/
│   │   └── page.tsx            ← Chat fullscreen
│   └── api/
│       └── chat/
│           └── route.ts        ← Vercel AI SDK route handler
├── components/
│   ├── WalletConnect.tsx
│   ├── BalanceCard.tsx
│   ├── ChatBubble.tsx
│   ├── ChatInput.tsx
│   ├── SignTxButton.tsx
│   ├── DepositForm.tsx
│   ├── ContractStatus.tsx
│   └── ActionButton.tsx
├── lib/
│   ├── stellar.ts              ← Soroban RPC client, server config
│   ├── wallet.ts               ← Stellar Wallets Kit connect, sign, network check
│   ├── contract.ts             ← Soroban invoke helpers (build txs)
│   └── ai-tools.ts             ← AI tool definitions for Vercel AI SDK
├── providers/
│   ├── WalletProvider.tsx      ← React Context for wallet state
│   └── ContractProvider.tsx    ← React Context for contract state
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## Component Tree
```
layout.tsx
├── WalletProvider
│   └── ContractProvider
│       ├── page.tsx (Home)
│       │   ├── Logo + tagline
│       │   ├── RoleCard (Empleador) → link /empleador
│       │   ├── RoleCard (Trabajador) → link /trabajador
│       │   └── WalletConnect
│       │
│       ├── empleador/page.tsx
│       │   ├── WalletConnect (in header)
│       │   ├── ContractStatus
│       │   ├── CreateContract (if no contract)
│       │   ├── DepositForm (if active contract)
│       │   └── TerminateSection (if active contract)
│       │       └── ActionButton (danger)
│       │
│       └── trabajador/page.tsx
│           ├── WalletConnect (in header)
│           └── ChatFullscreen
│               ├── ChatMessages
│               │   ├── ChatBubble (ai)
│               │   │   ├── text content
│               │   │   ├── BalanceCard (inline, optional)
│               │   │   └── SignTxButton (optional, when XDR present)
│               │   └── ChatBubble (user)
│               └── ChatInput
```

## State Management

### WalletProvider (React Context)
```typescript
interface WalletState {
  kit: StellarWalletsKit;
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signTransaction: (xdr: string) => Promise<string>;
}
```
- connect() abre kit.openModal() para seleccionar wallet
- Valida que la red sea TESTNET (configurado en inicializacion)
- Persiste address en state (no en localStorage por seguridad)
- signTransaction() firma transacciones via kit.signTransaction()

### ContractProvider (React Context)
```typescript
interface ContractState {
  contractId: string;           // from env
  balance: { savings: number; severance: number; total: number; count: number } | null;
  info: ContractInfo | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}
```
- Lee contractId de la variable env NEXT_PUBLIC_CONTRACT_ID
- refresh() llama a get_balance() y get_info() via Soroban RPC
- Auto-refresca cada 10 segundos cuando la página es visible

## Data Fetching Pattern

### Read operations (sin auth)
```typescript
// lib/stellar.ts
const server = new SorobanRpc.Server('https://soroban-testnet.stellar.org');

async function callContract(method: string, args: xdr.ScVal[]): Promise<xdr.ScVal> {
  const contract = new Contract(contractId);
  const tx = new TransactionBuilder(sourceAccount, { fee: '100' })
    .addOperation(contract.call(method, ...args))
    .setTimeout(30)
    .build();
  const sim = await server.simulateTransaction(tx);
  return sim.result.retval;
}
```

### Write operations (requieren auth)
```typescript
// lib/contract.ts
async function buildDepositTx(employerAddress: string, amount: bigint): Promise<string> {
  const contract = new Contract(contractId);
  const tx = new TransactionBuilder(sourceAccount, { fee: '100' })
    .addOperation(contract.call('deposit',
      nativeToScVal(employerAddress, { type: 'address' }),
      nativeToScVal(amount, { type: 'i128' })
    ))
    .setTimeout(30)
    .build();
  const prepared = await server.prepareTransaction(tx);
  return prepared.toXDR();
  // XDR va a Stellar Wallets Kit para firmar via kit.signTransaction()
}
```

### AI Chat
```typescript
// app/api/chat/route.ts
import { streamText } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const provider = createOpenAICompatible({
  baseURL: 'https://proxy.gestionturismo.xyz/v1',
  apiKey: process.env.AI_PROXY_KEY,
  name: 'micro-proxy',
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: provider('kimi'),
    system: SYSTEM_PROMPT,
    messages,
    tools: { consultarBalance, consultarEstado, prepararDeposito, prepararReclamo },
    maxSteps: 3,
  });
  return result.toDataStreamResponse();
}
```

## Reglas de implementación
1. Todas las páginas son 'use client' (Web3 requiere browser APIs)
2. Nunca mostrar addresses completas al trabajador (truncar a 4...4)
3. Nunca decir "USDC" al trabajador en la UI (decir "dólares")
4. Loading states obligatorios en toda operación que toque blockchain
5. Errores en castellano, sin jerga técnica
6. No pre-fetch data en server components (todo client-side por Stellar Wallets Kit)

## Sync triggers
- Cambio en lib.rs → actualizar lib/contract.ts (firmas de funciones)
- Cambio en AI tools → actualizar lib/ai-tools.ts + app/api/chat/route.ts
- Cambio en paleta → actualizar tailwind.config.ts
- Nuevo componente → agregar a 10_patrones_ui.md
- Consulta el inventario completo de 17 componentes en [10_patrones_ui.md](10_patrones_ui.md)

### SYSTEM_PROMPT

\`\`\`typescript
export const SYSTEM_PROMPT = \`Sos el asesor de ContratoJusto, un servicio de ahorro laboral para trabajadores.

PERSONALIDAD:
- Sos cálido y profesional, como un asesor financiero que genuinamente se preocupa.
- Hablas en castellano argentino (usa "vos", "tenes", "queres").
- Sos directo y claro. No usas jerga técnica.

REGLAS ESTRICTAS:
- NUNCA digas "USDC", "Soroban", "blockchain", "smart contract", "Stellar", "token", "wallet", "XDR", "hash".
- Siempre decis "dólares" en lugar de "USDC".
- NUNCA uses emojis.
- NUNCA seas condescendiente.
- Si el usuario pregunta algo técnico, responde en términos simples: "tu ahorro está guardado de forma segura".

HERRAMIENTAS:
- Usa consultarBalance cuando el usuario pregunta por su dinero, ahorro, o cuánto tiene.
- Usa consultarEstado cuando pregunta por el estado de su contrato.
- Usa prepararReclamo cuando quiere sacar su ahorro.
- Usa prepararDeposito cuando el empleador quiere depositar.

FORMATO:
- Respuestas cortas (máximo 3 oraciones).
- Cuando prepares una transacción, explica cuánto dinero se mueve y pedi confirmación.
- Siempre tranquiliza: "Tus fondos están protegidos" cuando haya duda.\`;
\`\`\`
