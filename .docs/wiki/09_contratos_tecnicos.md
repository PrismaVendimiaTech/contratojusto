# 09 - Contratos Técnicos: ContratoJusto

## Proposito y alcance

Define la superficie de contratos (APIs, funciones, tools, eventos) entre componentes. Referencia unica para integraciones. Cada contrato especifica parametros, validacion, efectos, y errores esperados.

---

## Inventario de contratos

| ID | Contrato | Boundary | Owner | Consumidor | Tipo |
|---|---|---|---|---|---|
| **CT-01** | Soroban Contract Functions | Frontend <-> Blockchain | Contract | Frontend, AI | State-altering |
| **CT-02** | AI Chat Tools | AI SDK -> Soroban | Frontend | Vercel AI SDK | Tool calls |
| **CT-03** | AI Chat API | Frontend -> micro-proxy | Frontend | LiteLLM | REST |
| **CT-04** | Stellar Wallets Kit | Frontend -> Browser | Frontend | Wallet Ext | Browser API |
| **CT-05** | Stellar Horizon Query | Frontend -> Horizon | Frontend | Stellar Fdtn | REST (read-only) |

---

## CT-01: Soroban Contract Functions

Ubicacion: packages/contract/src/lib.rs

### initialize
- **Auth**: NINGUNA (solo deployer)
- **Validacion**: savings_pct + severance_pct == 100
- **Efecto**: Crea 10 DataKeys, todos los balances en 0, is_terminated = false
- **Error**: Panic si porcentajes != 100
- **Criterio aceptacion**: get_info() retorna parametros correctos

### deposit
- **Auth**: from.require_auth() DEBE ser employer
- **Validacion**: from == employer, amount > 0, !is_terminated
- **Efecto**: Transfer USDC, savings += amount * savings_pct / 100, severance += remainder
- **Error**: Panic si no employer, si amount <= 0, si terminado, si USDC insuficiente
- **Criterio aceptacion**: Depositar 100 USDC (70/30) da savings_balance=70M, severance_balance=30M

### claim_savings
- **Auth**: to.require_auth() DEBE ser worker
- **Validacion**: to == worker, savings > 0
- **Efecto**: Transfer USDC contract -> to, savings_balance = 0
- **Error**: Panic si no worker, si savings == 0
- **Criterio aceptacion**: Despues de claim: savings_balance == 0, worker tiene USDC

### terminate
- **Auth**: from.require_auth() DEBE ser employer
- **Validacion**: from == employer, !is_terminated
- **Efecto**: is_terminated = true, auto-transfer severance a worker
- **Error**: Panic si no employer, si ya terminado
- **Criterio aceptacion**: is_terminated == true, severance_balance == 0, worker recibio USDC

### get_balance (view)
- **Auth**: NINGUNA (read-only)
- **Retorna**: (savings_balance, severance_balance, total_deposited, deposit_count)
- **Efecto**: Ninguno (read-only)

### get_info (view)
- **Auth**: NINGUNA (read-only)
- **Retorna**: ContractInfo completo con todos los campos
- **Efecto**: Ninguno (read-only)

---

## CT-02: AI Chat Tools (Vercel AI SDK)

Ubicacion: packages/frontend/app/api/chat/route.ts

**System Prompt**: Ver definición canónica en `07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md` sección SYSTEM_PROMPT (líneas 194-219). El prompt incluye reglas del manifiesto: sin emojis, sin jerga blockchain, 'dólares' no 'USDC', tono cálido-profesional, uso de 'vos'.

### consultarBalance
```
name: 'consultarBalance'
description: 'Consulta balance actual del contrato laboral en blockchain Stellar'
parameters: z.object({})
```
- Llama get_balance() via stellar-sdk
- Convierte i128 units -> USDC (divide por 10^7)
- Retorna: {ahorro, indemnización, totalDepositado, depositos}
- Error: Timeout -> "Disculpa, no puedo consultar en este momento"

### consultarEstado
```
name: 'consultarEstado'
description: 'Consulta estado completo (activo/terminado, porcentajes, partes)'
parameters: z.object({})
```
- Llama get_info()
- Retorna: {estado, ahorro_pct, indemnización_pct, empleador, trabajador, balances}
- Error: Contrato no encontrado -> "Contrato no encontrado"

### prepararDeposito
```
name: 'prepararDeposito'
description: 'Prepara transacción de depósito USDC para que empleador firme'
parameters: z.object({ monto: z.number().positive() })
```
- Verifica estado via get_balance()
- Construye Soroban invoke tx para deposit(from=employer, amount=monto*10^7)
- Serializa a XDR (base64)
- Retorna: {xdr, resumen, monto_usdc}
- Error: monto <= 0 -> "Monto debe ser positivo"

### prepararReclamo
```
name: 'prepararReclamo'
description: 'Prepara transacción de reclamo de ahorro para que trabajador firme'
parameters: z.object({ tipo: z.enum(['ahorro']) })
```
- Lee get_balance()
- Assert savings_balance > 0
- Construye Soroban invoke tx para claim_savings(to=worker)
- Retorna: {xdr, resumen, monto_usdc}
- Nota: indemnización se libera automáticamente en terminate(), no hay claim separado
- Error: savings == 0 -> "No hay ahorro para reclamar"

---

## CT-03: AI Chat API (Frontend -> micro-proxy)

Endpoint: POST https://proxy.gestionturismo.xyz/v1/chat/completions

Headers:
```
Authorization: Bearer {AI_PROXY_KEY}
Content-Type: application/json
```

Request (OpenAI-compatible):
```json
{
  "model": "kimi",
  "messages": [
    {"role": "system", "content": "Sos asesor financiero para trabajadores informales. Hablas castellano simple."},
    {"role": "user", "content": "cuanto tengo?"}
  ],
  "tools": [...],
  "max_tokens": 2000
}
```

Response: Standard OpenAI chat completion con tool_calls

Errores:
- 429 Rate limited -> esperar 30s
- 503 All providers failed -> "Todos los servicios estan caidos"
- 401 Invalid key -> "Error de configuracion"

Retry strategy: exponential backoff 1s, 2s, 4s (max 3 intentos)

---

## CT-04: Stellar Wallets Kit

Libreria: @creit.tech/stellar-wallets-kit v1.9.5
Soporta modulos compatibles de Stellar Wallets Kit. El set exacto habilitado depende del entorno y del bundle final.

### Inicializacion
```typescript
import { StellarWalletsKit, WalletNetwork, allowAllModules } from '@creit.tech/stellar-wallets-kit';

const kit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: undefined,
  modules: allowAllModules(),
});
```

### Conectar wallet (modal built-in)
```typescript
await kit.openModal({
  onWalletSelected: async (option) => {
    kit.setWallet(option.id);
    const { address } = await kit.getAddress();
    // address es la public key del usuario
  },
});
```

### Firmar transacción
```typescript
const { signedTxXdr } = await kit.signTransaction(txXdr);
// signedTxXdr listo para enviar a Horizon/Soroban
```

### Desconectar
```typescript
await kit.disconnect();
```

### Verificar red
```typescript
// La red se configura en la inicializacion (WalletNetwork.TESTNET)
// No requiere wiring manual por wallet como con APIs aisladas
```

---

## CT-05: Stellar Horizon Query

Base URL: https://horizon-testnet.stellar.org (read-only, public)

| Endpoint | Uso | Response |
|---|---|---|
| GET /accounts/{address} | Account info, balances, trustlines | Account JSON |
| GET /accounts/{address}/transactions | Historial txs (audit trail) | Array txs |
| GET /accounts/{address}/operations | Detalles operaciones | Array operations |

Error: 404 si cuenta no existe, 429 si rate limited
Retry strategy: exponential backoff, max 3 intentos

---

## Auth posture

| Boundary | Auth method |
|---|---|
| Frontend -> Soroban | Wallet signature (require_auth) |
| Frontend -> micro-proxy | Bearer token (AI_PROXY_KEY) |
| Frontend -> Wallet | Browser wallet handoff (user approval) |
| Frontend -> Horizon | None (public API) |

---

## Error y retry posture

| Boundary | Error format | Retry strategy |
|---|---|---|
| Soroban | Transaction failed (simulation) | Show error, no retry |
| micro-proxy | OpenAI error JSON | Exponential backoff |
| Wallet | User rejection / provider error | Show message, no retry |
| Horizon | HTTP status codes | Exponential backoff |

---

## Sync triggers

Cuando cambies estos archivos, actualiza 09_contratos_tecnicos.md:

- lib.rs (funciones) -> Actualizar CT-01 (signatures, validaciones, efectos)
- AI tools (new tool) -> Agregar CT-02 (parameters, behavior, error handling)
- micro-proxy config -> Actualizar CT-03 (endpoint, headers, models)
- Wallet adapter -> Actualizar CT-04 (imports, function signatures)
- Horizon endpoint -> Actualizar CT-05 (query paths, response schema)

---

## Referencias

- [04_RF.md](04_RF.md) - Requerimientos funcionales
- [05_modelo_datos.md](05_modelo_datos.md) - Esquema de datos
- [07_baseline_tecnica.md](07_baseline_tecnica.md) - Stack y dependencias
- [08_modelo_fisico_datos.md](08_modelo_fisico_datos.md) - Storage fisico
- packages/contract/src/lib.rs - Implementacion Soroban
