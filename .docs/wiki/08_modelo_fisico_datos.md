# 08 - Modelo Fisico de Datos: ContratoJusto

## Proposito y alcance
Documentar la capa de almacenamiento fisico. En este proyecto NO hay base de datos tradicional. El unico store con escritura es el Soroban Instance Storage on-chain.

---

## Inventario de stores

| Store | Engine | Owner | Datos | Durabilidad | Acceso |
|---|---|---|---|---|---|
| **Soroban Instance Storage** | Stellar Ledger (blockchain) | Smart Contract | Estado contrato, balances, parametros | Permanente (while live) | Write: solo contrato; Read: RPC publico |
| **Stellar Horizon** | REST API (read-only) | Stellar Foundation | Historial txs, eventos, operaciones | Query-only, no controlado | GET /accounts, /operations, /transactions |
| **Browser** | LocalStorage/Memory | Frontend | Wallet state (efimero) | Session only | Read/Write por frontend |

---

## Ownership y lifecycle

### Soroban Instance Storage (unico store con escritura)
- **Owner**: Smart contract (ContratoJusto.wasm)
- **Quien escribe**: Solo el contrato via invocaciones autorizadas (require_auth)
- **Quien lee**: Cualquiera via Soroban RPC publico (get_balance, get_info)
- **Lifecycle**: Creado en `initialize()`, modificado en `deposit/claim/terminate`, nunca eliminado
- **Backup**: Innecesario (blockchain es el backup distribuido)
- **TTL**: 3 horas de inactividad (futuro: extend_ttl)
- **Migracion**: No aplica (contrato immutable post-deploy)

### Stellar Horizon (query-only API)
- **Owner**: Stellar Foundation
- **Usamos para**: Audit trail, historial depositos, verificar balance historico
- **No controlamos**: Retencion, disponibilidad, formato
- **Endpoints clave**: `GET /accounts/{id}`, `/transactions`, `/operations`

### Browser Storage (efimero)
- **Owner**: Frontend
- **Usamos para**: wallet connection state, last connected address
- **No persiste**: Se pierde al cerrar tab/browser
- **Critico**: NUNCA es fuente de verdad. Siempre re-leer del contrato.

---

## Schema fisico detallado

Basado en [05_modelo_datos.md](05_modelo_datos.md), el Soroban Instance Storage contiene:

| DataKey (clave) | Tipo Soroban | Rango | Ejemplo |
|---|---|---|---|
| `Employer` | Address | - | GBWHKW2...xyz |
| `Worker` | Address | - | GBFAKEW1...abc |
| `Token` | Address | - | CBBD333...qqq (USDC) |
| `SavingsPct` | u32 | 0-100 | 70 |
| `SeverancePct` | u32 | 0-100 | 30 |
| `SavingsBalance` | i128 | >= 0 | 700000000 (70 USDC) |
| `SeveranceBalance` | i128 | >= 0 | 300000000 (30 USDC) |
| `TotalDeposited` | i128 | >= 0 | 1000000000 (100 USDC total ever) |
| `DepositCount` | u32 | >= 0 | 5 |
| `IsTerminated` | bool | false/true | false |

**Nota**: USDC usa 7 decimales en Stellar: 1 USDC = 10,000,000 units

---

## Constraints y consistencia

| Constraint | Donde valida | Violacion | Recovery |
|---|---|---|---|
| savings_pct + severance_pct == 100 | `initialize()` assert | Panic, tx revierte | Redeploy contrato |
| Solo employer deposita | `deposit()` require_auth | Panic, tx revierte | Usar cuenta employer |
| Solo worker reclama | `claim_savings()` require_auth | Panic, tx revierte | Usar cuenta worker |
| amount > 0 en deposito | `deposit()` assert | Panic, tx revierte | Usar amount >= 10_000_000 (0.1 USDC) |
| !is_terminated para depositar | `deposit()` assert | Panic, tx revierte | No se puede depositar post-terminate |
| Idempotencia tx | Stellar SDK (tx hash) | Replay attack | Tx hash previene duplicados |

---

## Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigacion |
|---|---|---|---|
| Stellar Testnet down | Baja | Demo completamente inoperable | Preparar video grabado como backup |
| Soroban RPC timeout | Media | UX degradada (10-30s delay) | Retry automático en stellar-sdk |
| Instance Storage TTL expira | Baja (3h inactividad) | Contrato se congela | Implementar extend_ttl() en futuro |
| USDC token desaparece | Muy baja | Fondos bloqueados en contrato | Testnet no tiene este riesgo real |
| Horizon API rate limit | Media (si muchas queries) | Frontend no puede leer history | Cache local, retry exponencial |

---

## Sync triggers

- **Cambio en lib.rs DataKey enum** → Actualizar tabla Schema fisico
- **Cambio en invariantes negocio** → Actualizar tabla Constraints
- **Agregar nuevo store (ej: DB off-chain)** → Refactorizar doc completamente
- **Change de TTL policy** → Actualizar seccion Lifecycle

---

## Referencias

- [05_modelo_datos.md](05_modelo_datos.md) - Esquema logico canonico
- [04_RF.md](04_RF.md) - Invariantes de negocio
- `packages/contract/src/lib.rs` - Implementacion en Soroban
