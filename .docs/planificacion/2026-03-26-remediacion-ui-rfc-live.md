# Remediacion UI-RFC + Live Tomorrow

## Estado

- Fecha: `2026-03-26`
- Estado actual: `Phase 1 complete / Phase 2 pending tomorrow`
- Alcance: remediar la primera ola de implementacion, cerrar findings criticos, y dejar el contrato operativo para live en `turismo`.
- Documento activo: este archivo reemplaza al plan historico de `.docs/plans/2026-03-26-ui-rfc-full-e2e.md` como fuente de verdad para remediacion.

## Resultado de Phase 1

- El frontend ya no esta en estado "solo package.json": existe scaffold App Router con rutas `/`, `/empleador`, `/trabajador`, providers, componentes shared/chat/employer, `/api/chat` y `/api/health`.
- `pnpm --filter frontend build` ya pasa.
- La capa wallet se movio a `packages/frontend/lib/wallet.ts` y la inicializacion del kit ahora es browser-only.
- La capa runtime ya diferencia `fixture` y `live` con una fachada unica en `packages/frontend/lib/contract.ts`.
- Los flujos employer dejaron de depender de `alert` y `console.log`.
- El worker chat usa timeline tipada con balance inline, accion de claim y eventos de sistema.
- Se materializo `infra/` como contrato local para live tomorrow.

## Cierre de Findings

| Finding | Decision cerrada | Implementacion aplicada | Estado |
| --- | --- | --- | --- |
| 1. `contract-live` era stub | Mantener `fixture -> live`, pero hacer live honesto y fail-fast | `contract-live.ts` ahora arma txs Soroban reales, consulta `get_balance/get_info` y hace `send/poll`; `runtime-config.ts` valida env live | Cerrado |
| 2. Employer seguia mockeado | Provider como unica via de accion real | `CreateContractForm`, `DepositForm` y `TerminateSection` usan `useContract()` y muestran estado inline | Cerrado |
| 3. Claim marcaba exito falso | Exito solo despues de submit/confirm real | `SignTxButton` ahora ejecuta `executePreparedTransaction()`, espera `TxReceipt` y muestra `txHash` | Cerrado |
| 4. AI tools usaban addresses vacias | El actor debe viajar desde UI hasta la API | `ChatFullscreen` envia `actorAddress`; `app/api/chat/route.ts` crea tools por request; `ai-tools.ts` exige actor real o devuelve error explicito | Cerrado |
| 5. Wallet provider no era SSR-safe | El kit no puede inicializarse durante prerender | `wallet.ts` usa import dinamico browser-only; `WalletProvider` bootstrappea en `useEffect`; se removio la carga de `WalletConnect` del bundle actual | Cerrado en Phase 1 |
| 6. Worker chat no cumplia los RFCs | Timeline tipada y eventos de sistema fuera de la voz AI | `chat-timeline.ts`, `ChatMessages.tsx`, `SystemEventMessage.tsx`, `BalanceCard.tsx` y `ChatFullscreen.tsx` quedaron alineados con balance inline, claim action y system events | Cerrado |
| 7. Fixture quedaba bloqueado por env live | Fixture debe funcionar sin `NEXT_PUBLIC_CONTRACT_ID` | `contract.ts` normaliza `fixture-contract`; `ContractProvider` ya no sale antes por falta de env | Cerrado |
| 8. Drift documental `freighter/scaffold pending` | La policy y los RFC activos deben reflejar el repo real | `AGENTS.md`, `CLAUDE.md`, `UI-RFC-WORKER-CLAIM-SIGN.md` y el plan historico quedaron sincronizados con `lib/wallet.ts` y el scaffold existente | Cerrado |
| 9. Faltaba cierre visible de decisiones | Registrar las decisiones tecnicas y sus limites en el megadoc de remediacion | Este documento deja explicitadas las decisiones aplicadas y los pendientes que pasan a tomorrow | Cerrado documentalmente |
| 10. Gap de product-hardening | Dejar contrato `infra/`, scripts y delta live antes de deploy | `infra/`, `.env.example`, `packages/frontend/package.json` y esta seccion de live tomorrow quedan preparados | Parcial, continua en Phase 2 |

## Decisiones Tecnicas Aplicadas

### Wallets

- Se consolida `packages/frontend/lib/wallet.ts` como unico adapter.
- En esta ola se habilitan los modulos builtin seguros de `stellar-wallets-kit`.
- `WalletConnect` queda fuera del bundle actual porque hoy rompe el build de Next 15 por la cadena `pino-pretty`. No se reintroduce hasta resolver esa integracion de forma estable.

### Runtime

- `fixture` y `live` comparten la misma interfaz publica.
- `fixture` no finge red real, pero si mantiene estado mutante para create/deposit/claim/terminate.
- `live` exige env explicita y no usa placeholders.

### Worker Chat

- La voz AI queda separada de los eventos del sistema.
- La accion de firma no significa exito hasta que existe submit/confirmacion.
- El chat recibe contexto del actor desde UI; no vuelve a construir txs con strings vacios.

### Employer Dashboard

- `create/deposit/terminate` se ejecutan contra `ContractProvider`.
- El dashboard refresca contrato y balance despues de cada accion.
- Los mensajes de exito/error quedan inline y persistentes.

## Phase 2 - Live Tomorrow Delta

### Wallet + SDK

- Resolver la reintroduccion segura de `WalletConnect` en Next 15.
- Validar cuales modulos del kit quedan realmente soportados en este entorno y exponer solo esos en UI.
- Confirmar flujo real de firma con wallet empleador y wallet trabajador en testnet.

### Soroban Live

- Cargar valores reales en `infra/.env` y `.env.local`:
  - `NEXT_PUBLIC_RUNTIME_MODE=live`
  - `NEXT_PUBLIC_CONTRACT_ID`
  - `NEXT_PUBLIC_TOKEN_ID`
  - `NEXT_PUBLIC_SOROBAN_RPC_URL`
  - `NEXT_PUBLIC_HORIZON_URL`
  - `NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE`
  - `NEXT_PUBLIC_STELLAR_SIMULATION_ADDRESS`
- Verificar `initialize`, `deposit`, `claim_savings` y `terminate` contra el contrato real desplegado.

### AI + Proxy

- Configurar `AI_PROXY_URL`, `AI_PROXY_KEY` y `AI_MODEL` reales.
- Smoke del worker chat:
  - consultar balance
  - consultar estado
  - preparar reclamo con firma real

### Dokploy / Turismo

- Completar `infra/.env` con:
  - `DOKPLOY_URL`
  - `DOKPLOY_API_KEY`
  - `DOKPLOY_APP_ID`
  - `DOKPLOY_PROJECT_ID`
  - `DOKPLOY_ENVIRONMENT_ID`
- Deploy usando `dokploy-cli` contra `turismo`.
- Verificar `/api/health` despues del deploy.

## Verificacion Ejecutada

- `pnpm --filter frontend build`
- Resultado: `OK`

## Gaps Aceptados al Cerrar Phase 1

- Persisten warnings de `sodium-native` en el build por dependencias de `@stellar/stellar-sdk`; no bloquean el build actual.
- `WalletConnect` no queda habilitado todavia en la UI productiva.
- No se agregaron tests automaticos en esta ola; la verificacion fue por build y coherencia funcional/documental.

## Criterio de Cierre para Tomorrow

- Wallet empleador y wallet trabajador pueden completar el path real.
- `fixture` sigue disponible para desarrollo local.
- `live` opera con env completa y salud OK en `turismo`.
- `ps-trazabilidad` y `ps-auditar-trazabilidad` se corren sobre la ola final antes del cierre definitivo.
