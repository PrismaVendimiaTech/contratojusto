# 07 - Baseline Tecnica: ContratoJusto

## Proposito y alcance
Resumen del paisaje tecnico runtime del proyecto. Inventario de componentes, decisiones arquitectonicas y dependencias criticas.

---

## Inventario de componentes

| Componente | Tecnologia | Version | Ubicacion | Responsabilidad |
|---|---|---|---|---|
| Soroban Contract | Rust, soroban-sdk | 22.0.0 | `packages/contract/` | Custodia USDC, split pools, reglas negocio |
| Frontend | Next.js 15, TypeScript, Tailwind CSS | 15.0.0 | `packages/frontend/` | UI, wallet connect, AI chat |
| AI Chat | Vercel AI SDK, tool calling | ^4.0.0 | `packages/frontend/app/api/chat/` | Consultas NL, preparar txs |
| AI Backend | LiteLLM (micro-proxy) | 1.57.0 | proxy.gestionturismo.xyz | LLM routing, modelos gratis/pagos |
| Wallet Kit | Stellar Wallets Kit (@creit.tech/stellar-wallets-kit) | ^1.9.5 | Browser | Multi-wallet compatible, firma transacciones y modal unificado |
| Stellar SDK | @stellar/stellar-sdk | ^13.3.0 | `packages/frontend/` | RPC client, transaction building, contract interaction |
| Blockchain | Stellar Soroban | Testnet | soroban-testnet.stellar.org | Ejecucion de contratos, storage on-chain |
| @ai-sdk/openai-compatible | ^0.1.0 | OpenAI-compatible provider for Vercel AI SDK | `packages/frontend/` | LLM provider integration |
| vite-plugin-node-polyfills | ^0.25.0 | Polyfills para Stellar SDK en browser (Buffer, crypto) | `packages/frontend/` | Soporte browser Buffer/crypto |
| lucide-react | latest | Iconografia (Lucide outline icons) | `packages/frontend/` | UI icons |
| tailwindcss | ^4.0.0 | CSS framework | `packages/frontend/` | Styling |

---

## Mapa de runtime

```
┌─────────────────────────────────────────────────────────┐
│                   Browser (Next.js Frontend)             │
│  ─────────────────────────────────────────────────────  │
│  UI Components  │  State (React)  │  API Routes  │ Chat  │
└────────┬────────┬────────────────────────────┬──────┬──────┘
         │        │                            │      │
    [Wallet]      │                            │      │
    (signing)     │                            │      │
         │        │                   ┌────────┘      │
         │        │                   │               │
         ▼        ▼                   ▼               ▼
     [Stellar SDK] ────► [Stellar Testnet RPC]      [micro-proxy]
         │                      │                        │
         └──────────────────────┴────────────────────────┘
                        │
                    [Soroban Contract]
                   (lib.rs, WASM)
```

---

## Decisiones arquitectonicas cross-cutting

| Decision | Valor | Justificacion |
|---|---|---|
| **Priority** | Velocidad > Demo > Completitud | Hackathon 1 dia |
| **Network** | Stellar Testnet | Gratis, Friendbot, sin riesgo real |
| **Token** | USDC (7 decimales) | Estable, standard Stellar |
| **Auth Model** | Wallet signature + require_auth | Sin backend, sin sessions, wallet = identidad |
| **AI Backend** | micro-proxy (LiteLLM) | Ya deployado, OpenAI-compatible, sin setup |
| **Storage** | Soroban Instance Storage (on-chain) | No hay DB off-chain, blockchain = fuente verdad |
| **Fallback** | Claimable Balances nativo | Si Soroban falla post-3h TTL |
| **Monorepo** | pnpm workspaces | Un repo, un install, deps centralizadas |

---

## Dependencias criticas

| Dependencia | Version | Riesgo | Mitigacion |
|---|---|---|---|
| soroban-sdk | 22.0.0 | API changes frecuentes | Revisar stellar-guide, test en testnet |
| @stellar/stellar-sdk | ^13.3.0 | Breaking changes entre major versions | Usar v13.3.0+, sincronizar con Stellar Wallets Kit |
| @creit.tech/stellar-wallets-kit | ^1.9.5 | Doc limitada | Patron del workshop como referencia: /tmp/stellar-wallets-kit/ |
| ai (Vercel AI SDK) | ^4.0.0 | Tool calling inestable | Implementar incrementalmente, test antes |
| @stellar/js-stellar-base | ^13.0.0 | Transaction building | Sincronizar con stellar-sdk version |
| next | 15.0.0 | Cambios estructura routes | Usar App Router (no Pages) |
| micro-proxy | LiteLLM 1.57.0 | Si se cae | Fallback: Google AI Studio gratis |
| vite-plugin-node-polyfills | ^0.25.0 | Polyfills para Buffer/crypto | Necesario para Stellar SDK en browser |

---

## Observabilidad y debugging

| Punto | Herramienta | Uso |
|---|---|---|
| **Logs Soroban** | `log!()` macro en Rust | Eventos de operaciones on-chain |
| **Tx History** | Stellar Horizon API | `GET /accounts/{addr}/transactions` |
| **Account Balances** | Stellar Horizon API | `GET /accounts/{addr}` |
| **Manual Verification** | stellar.expert (testnet) | Inspeccionar txs, contratos |
| **micro-proxy Health** | `/health` endpoint | Check disponibilidad LLM |
| **LLM Calls** | micro-proxy `/ui` dashboard | Logs de requests, usage |
| **Frontend Errors** | Browser DevTools Console | Client-side exceptions |

---

## Security posture

| Aspecto | Modelo |
|---|---|
| **Backend** | Sin backend = sin superficie API explorable |
| **Auth** | Wallet signature (`require_auth()`) en cada tx que modifica estado |
| **Key Storage** | Sin keys en frontend, todo en browser extension |
| **Statelessness** | Frontend es stateless (verdad on-chain) |
| **Token Transfers** | Solo via Soroban `token::Client`, no raw calls |

---

## Sync triggers

Cuando cambies estos archivos, sincroniza los documentos mencionados:

- **lib.rs (funciones Soroban)** → [04_RF.md](04_RF.md), [05_modelo_datos.md](05_modelo_datos.md), [09_contratos_tecnicos.md](09_contratos_tecnicos.md)
- **AI tools (new tool)** → [04_RF.md](04_RF.md), [09_contratos_tecnicos.md](09_contratos_tecnicos.md)
- **Dependencias package.json** → Este doc + [02_arquitectura.md](02_arquitectura.md)
- **Network (mainnet vs testnet)** → [01_alcance_funcional.md](01_alcance_funcional.md)
