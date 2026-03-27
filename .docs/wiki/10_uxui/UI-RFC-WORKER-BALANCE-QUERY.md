# UI-RFC-WORKER-BALANCE-QUERY

## Source

- [14_UXS.md](../14_UXS.md) - Especificacion 2: el usuario ve `Tu ahorro esta protegido` y la `BalanceCard` inline.
- [13_UJ.md](../13_UJ.md) - Viaje 2: consulta `cuanto tengo?`, card inline y alivio profundo.
- [12_UXI.md](../12_UXI.md) - Caso 1: balance cargado suave, numeros primero y copia de proteccion.
- [10_patrones_ui.md](../10_patrones_ui.md) - `BalanceCard` y su variante inline.
- [10_lineamientos_interfaz_visual.md](../10_lineamientos_interfaz_visual.md) - Chat bubble, loading sin skeleton MVP y mensaje sistemico gris.
- [10_identidad_visual.md](../10_identidad_visual.md) - Esmeralda, slate y tipografia para numeros grandes.
- [15_auditoria_frontend_ux.md](../15_auditoria_frontend_ux.md) - El balance no debe borrarse; debe persistir o marcarse como transferido.
- [07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md](../07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md) - `ContractProvider.balance`, `useChat()` y path de `packages/frontend/components/shared/BalanceCard.tsx`.
- [UI-RFC-CHAT.md](./UI-RFC-CHAT.md) - Macro de referencia, solo como insumo de corte.

## Component Decomposition

| Componente | Ruta de archivo | Estado | Accion |
|---|---|---|---|
| `BalanceCard` | `packages/frontend/components/shared/BalanceCard.tsx` | `EXTEND` | Soportar variante inline, estado transferido y copia de refresco. |
| `ChatBubble` | `packages/frontend/components/chat/ChatBubble.tsx` | `EXTEND` | Servir como host de la card inline sin romper alineacion ni max width. |
| `ChatMessages` | `packages/frontend/components/chat/ChatMessages.tsx` | `EXTEND` | Insertar el resultado de balance como children en el flujo del chat. |
| `LoadingIndicator` | `packages/frontend/components/shared/LoadingIndicator.tsx` | `DOC-ONLY` | Reusar el loading compartido mientras llega el balance. |

`EXTEND` significa que el patron base existe, pero este caso agrega comportamiento visible nuevo.

## TypeScript Interfaces

```typescript
type BalanceQueryPhase = 'idle' | 'loading' | 'loaded' | 'refreshing' | 'error' | 'transferred';

interface BalanceCardProps {
  savings: number;
  severance: number;
  total: number;
  depositCount: number;
  variant?: 'card' | 'inline';
  phase?: BalanceQueryPhase;
  transferLabel?: string;
  onRetry?: () => void;
}

interface BalanceQueryResult {
  savings: number;
  severance: number;
  total: number;
  depositCount: number;
  currencyLabel: 'dolares';
  transferred?: boolean;
}

interface BalanceQueryState {
  phase: BalanceQueryPhase;
  source: 'chat' | 'push' | 'poll';
  lastUpdatedAt: string | null;
}

interface BalanceQueryTelemetryPayload {
  contractId: string;
  source: 'chat';
  phase: BalanceQueryPhase;
  depositCount?: number;
}
```

## File Manifest

- `packages/frontend/components/shared/BalanceCard.tsx`
- `packages/frontend/components/chat/ChatBubble.tsx`
- `packages/frontend/components/chat/ChatMessages.tsx`
- `packages/frontend/app/api/chat/route.ts`
- `packages/frontend/lib/contract.ts`
- `packages/frontend/lib/ai-tools.ts`

## Token Binding Table

| Visual UXS | Tailwind class | Token source |
|---|---|---|
| Card base | `bg-white border border-emerald-500 rounded-xl shadow-sm p-4` | `10_patrones_ui.md` + `10_identidad_visual.md` |
| Inline variant | `bg-white rounded-xl p-4` sin shadow ni borde fuerte | `10_patrones_ui.md` |
| Ahorro | `text-emerald-600 font-semibold text-lg` | `10_identidad_visual.md` |
| Indemnizacion | `text-slate-500 font-semibold text-lg` | `10_identidad_visual.md` |
| Total | `text-slate-800 font-semibold text-lg` | `10_identidad_visual.md` |
| Footer de depos | `text-slate-500 text-xs` | `10_identidad_visual.md` |
| Estado transferido | `border border-emerald-200 bg-emerald-50/60 text-emerald-700` | `UXS` + `UXI` |
| Loading | `text-slate-500` + spinner o dots; no skeleton | `10_lineamientos_interfaz_visual.md` |

## State Machine

| UXS state | Component state | Trigger |
|---|---|---|
| Balance desconocido | `loading` | Llega la pregunta `cuanto tengo?` o refresh de contrato. |
| Balance visible | `loaded` | API devuelve savings, severance, total y count. |
| Balance actualizado en segundo plano | `refreshing` | Poll o reconsulta sin bloquear la vista. |
| Error de lectura | `error` | Fallo de contrato, red o parse. |
| Retiro exitoso | `transferred` | Claim completado y el rastro visual queda persistente. |

## Copy Catalog

```typescript
const BALANCE_COPY = {
  TITLE: 'Tu ahorro esta protegido',
  SAVINGS: 'Ahorro',
  SEVERANCE: 'Indemnizacion',
  TOTAL: 'Total',
  UPDATED_TODAY: 'Actualizado hoy',
  TRANSFERRED: 'Transferido',
  DEPOSITS: (count: number) => `${count} deposito${count === 1 ? '' : 's'} realizados`,
  LOAD_ERROR: 'No se pudo cargar el balance',
  RETRY: 'Reintentar',
  SEVERANCE_HINT: 'Se libera si termina el contrato',
} as const;
```

## Accessibility Contract

- `BalanceCard` expone semanticamente un `dl` o `table` con nombres visibles para cada importe.
- El card usa `role="status"` solo si aparece inline como resultado dinamico dentro del chat.
- Los montos deben anunciarse con el texto de moneda, no solo con digitos.
- `Reintentar` debe ser un boton real, navegable por teclado.
- El estado `Transferido` debe comunicarse con texto, color y/o icono, no solo con el valor en cero.
- El foco no se mueve al card a menos que el usuario lo solicite.

## Telemetry Spec

```typescript
type BalanceTelemetryEvent =
  | 'balance_query_requested'
  | 'balance_query_resolved'
  | 'balance_query_failed'
  | 'balance_card_rendered'
  | 'balance_marked_transferred'
  | 'balance_retry_clicked';

declare function trackBalanceEvent(
  event: BalanceTelemetryEvent,
  payload: BalanceQueryTelemetryPayload
): void;
```

## Test Assertions

- Consulta `cuanto tengo?` y renderiza la `BalanceCard` inline debajo del texto del AI.
- Renderiza ahorro, indemnizacion, total y cantidad de depositos con copy en castellano.
- Muestra loading de forma simple, sin skeletons.
- Mantiene visible el estado `Transferido` despues de un retiro exitoso.
- Permite reintentar si falla la lectura de balance.
- No borra el historial de balance despues de una actualizacion.
- NUNCA muestra `USDC`, `blockchain` o `Soroban` al trabajador.
- NUNCA oculta la indemnizacion sin explicacion.
- NUNCA usa solo color para indicar transferencia.

## Dependencies

- `UI-RFC-WORKER-CHAT-SHELL.md` para insertar la card dentro del flujo del chat.
- `UI-RFC-WORKER-CLAIM-SIGN.md` para el estado `transferred` despues de la firma.
- `packages/frontend/lib/contract.ts` para leer balance y contrato.
- `packages/frontend/lib/ai-tools.ts` para el tool `consultarBalance()`.
- `ContractProvider` para fuente de verdad y refresco.
- `10_lineamientos_interfaz_visual.md` para evitar skeleton screens en MVP.

## Learning Notes

- Esta RFC no define una nueva pantalla; define como el dato mas sensible del worker aparece sin friccion.
- El valor visual importante no es solo el numero: tambien importa que el retiro deje evidencia persistente.
- La card funciona como prueba de confianza. Si desaparece, el usuario siente que perdio control.
- Mantenerla inline en el chat reduce cambio de contexto y hace que la consulta parezca parte natural de la conversacion.
