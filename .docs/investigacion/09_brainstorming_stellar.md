# Brainstorming: Pivot a Stellar - ContratoJusto

Fecha: 2026-03-26

## Cambio de alcance

No se puede competir con el mismo proyecto en multiples tracks. Se abandona RSK+Beexo y Hedera. Foco 100% Stellar.

## Decisiones cerradas

| # | Decision | Eleccion | Razon |
|---|---|---|---|
| 1 | Producto | ContratoJusto evolucionado (ahorro USDC + AI chat + reputacion) | Narrativa anti-inflacion mas poderosa que rBTC. AI como diferenciador. |
| 2 | Blockchain | Hibrido: Soroban custom (~150 lineas Rust) + fallback a Claimable Balances nativo | Maximiza integracion Stellar (25%) con red de seguridad |
| 3 | Ecosistema | Soroban custom. Mencionar TW/Lendara/Blend en pitch como roadmap | Sin dependencias de API keys externas. Demuestra ecosistema en pitch. |
| 4 | AI Chat | Nivel 3 directo: AI prepara transacciones Stellar | Blockchain invisible para el usuario. Maximo wow-factor innovacion (15%). |
| 5 | Scope | Web core. Telegram bot read-only solo si sobra tiempo | 10-12h para 1 persona. Foco en demo. |
| 6 | Track | Track 2: Impacto Social | La idea ES impacto social. Trabajadores informales. |
| 7 | AI Backend | micro-proxy (proxy.gestionturismo.xyz) | Ya deployado, gratis, OpenAI-compatible. |
| 8 | Equipo | Solo Gabriel (arquitecto fullstack) | Sin equipo. |

## Ideas evaluadas y descartadas

| Idea | Por que se descarto |
|---|---|
| MiContrato port directo a Stellar | Menos innovador, no aprovecha USDC/Stellar |
| Escrow con Lendara SDK | Lendara es para investment pools, no escrow laboral. Necesita API key. |
| Bot Telegram como interfaz principal | Telegram no puede firmar txs Stellar. Web es necesaria. |
| Componer con Trustless Work | Necesita API key, encaje parcial, no ahorra tanto tiempo |
| Idea nueva desde cero | Pierde todo el trabajo previo. Demasiado riesgo para 1 dia. |

## Contrato Soroban: ContratoJusto

Funciones: initialize, deposit, claim_savings, terminate, claim_severance, get_balance, get_info
Estado: employer, worker, token(USDC), savings_pct, severance_pct, savings_balance, severance_balance, total_deposited, deposit_count, is_terminated, last_deposit_ts

## AI Chat Tools (Vercel AI SDK)

- consultarBalance() -> lee Soroban get_balance()
- consultarEstado() -> lee Soroban get_info()
- prepararDeposito(monto) -> construye tx Soroban deposit()
- prepararReclamo(tipo) -> construye tx claim_savings/claim_severance

## Demo path

1. Empleador conecta Freighter -> crea contrato (70% ahorro, 30% indemnizacion)
2. Empleador deposita 100 USDC -> split: 70 ahorro + 30 indemnizacion
3. Trabajador AI chat: "cuanto tengo?" -> AI lee contrato -> "70 USDC ahorro, 30 indemnizacion"
4. Trabajador: "quiero sacar mi ahorro" -> AI prepara tx -> Freighter firma -> "Listo!"
5. Empleador termina contrato -> indemnizacion liberada al trabajador
6. Pitch: "Un trabajador que no sabe blockchain cobro su indemnizacion en dolares"

## Stack definitivo

- Soroban: Rust, stellar-cli, Stellar Testnet
- Frontend: Next.js 15, Tailwind CSS, @stellar/stellar-sdk v12, @stellar/freighter-api
- AI: Vercel AI SDK -> micro-proxy (proxy.gestionturismo.xyz) -> Kimi/Claude/Gemma
- Wallet: Freighter (Chrome)
- Token: USDC testnet Stellar
