# ContratoJusto - DoraHacks BUIDL Submission

## Project Name
ContratoJusto

## One-Line Description
Auto-executable labor contracts for informal workers in Argentina, powered by Soroban smart contracts and an AI chat assistant that speaks Spanish.

---

## Full Description

### The Problem

In Argentina, 46% of the workforce operates in the informal economy. These workers have no access to unemployment insurance, severance pay, pension funds, or verifiable labor rights. Simultaneously, Argentina's inflation exceeds 200% annually, causing savings in pesos to evaporate in months. Informal workers—domestic cleaners, construction laborers, agricultural workers, street vendors—earn daily cash payments with zero protection against job loss, illness, or arbitrary dismissal.

### The Solution

**ContratoJusto** is a digital labor contract deployed on Stellar's Soroban blockchain that automatically enforces labor protections through code. When an employer and worker agree to work together, the contract:

1. **Accumulates savings in USDC** – funds are protected from Argentina's peso devaluation
2. **Automatically splits deposits** – each payment is divided into savings (immediately available) and severance (locked until contract termination)
3. **Executes automatically** – when the employer terminates the relationship, severance is instantly released to the worker with zero intermediaries
4. **Speaks plain Spanish** – an AI chat assistant allows workers to check their balance, understand their rights, and initiate withdrawals without touching blockchain technology directly

### How It Works

**Setup:** An employer creates a contract on ContratoJusto, specifying the worker's wallet address, a reference salary, and the split ratio (e.g., 70% savings, 30% severance).

**Monthly deposit:** The employer deposits USDC (digital US dollars on Stellar). The smart contract automatically separates the funds: 70% goes to an available savings pool, 30% goes to a locked severance pool.

**Worker interactions:** The worker opens the chat interface and types in plain Spanish:
- "¿Cuánto ahorré?" (How much did I save?) → AI reads the on-chain state and responds: "Tienes USD 150 de ahorro acumulado" (You have USD 150 in savings)
- "Quiero mi ahorro" (I want my savings) → AI prepares a withdrawal transaction, the worker signs it with their wallet, funds arrive instantly
- "¿Mi jefe depositó este mes?" (Did my boss deposit this month?) → AI queries the blockchain and reports status

**Termination:** When the employment relationship ends, the employer calls the "terminate contract" function. The severance pool is immediately released to the worker's wallet—no waiting, no forms, no bureaucracy.

### What Makes It Special

ContratoJusto hides blockchain complexity behind conversational AI. Workers never need to understand smart contracts, gas fees, wallet mechanics, or Soroban programming. They interact in their native language, through a chat interface that translates their needs into secure on-chain transactions. For the first time, informal workers in Argentina have a tool that:

- Preserves purchasing power (USDC vs. peso inflation)
- Enforces agreements through code (not courts or lawyers)
- Costs almost nothing to operate (Stellar fees are ~$0.00001 per transaction)
- Requires no bank account, government ID, or institutional access

### Tech Stack

| Component | Technology |
|-----------|-----------|
| **Smart Contract** | Rust + Soroban SDK (Stellar WASM runtime) |
| **Frontend** | Next.js 15 + React 19 + Tailwind CSS + Framer Motion |
| **Wallet Integration** | Stellar Wallets Kit (Freighter, Albedo, xBull, WalletConnect) |
| **AI Chat** | Vercel AI SDK + micro-proxy LLM gateway (OpenAI-compatible inference) |
| **Blockchain** | Stellar Testnet (Test SDF Network) |
| **Token** | USDC on Stellar (7 decimals, same as on-chain standard) |

The smart contract is immutable and auditable. The AI chat is stateless and never holds keys—it only reads blockchain state and prepares transactions for the worker to sign.

### Live Demo

Visit: **https://contratojusto.nuestrascuentitas.com**

### GitHub Repository

**https://github.com/PrismaVendimiaTech/contratojusto**

### Team

**Gabriel Paz** – Solo developer. Fullstack architect, built multi-tenant and micro-proxy systems for digital labor platforms. This is a 48-hour hackathon build submitted to Vendimia Tech 2026 (Mendoza, Argentina).

### Track

**Stellar – Social Impact**

---

## Roadmap (Post-MVP)

- Deploy on Stellar mainnet with security audit
- Integration with Trustless Work (standardized escrow protocol)
- Telegram bot as alternative channel
- On-chain employer reputation system (tracking on-time deposits)
- Automated USDC/ARS conversion via Stellar anchors
- Mobile-native apps for iOS/Android
