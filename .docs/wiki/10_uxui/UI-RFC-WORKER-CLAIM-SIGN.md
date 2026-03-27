# UI-RFC-WORKER-CLAIM-SIGN

## Source

- [14_UXS.md](../14_UXS.md) - Especificacion 2: retiro y firma con mensaje de confirmacion y rastro visible post-exito.
- [13_UJ.md](../13_UJ.md) - Viaje 3: `quiero sacar mi ahorro`, preparación, firma wallet y confirmacion final.
- [12_UXI.md](../12_UXI.md) - Caso 2: control, alivia y timming critico de firma.
- [10_patrones_ui.md](../10_patrones_ui.md) - `SignTxButton`, `ChatBubble` y `LoadingIndicator`.
- [10_lineamientos_interfaz_visual.md](../10_lineamientos_interfaz_visual.md) - Boton accent, loading dentro del chat y mensajes claros.
- [10_identidad_visual.md](../10_identidad_visual.md) - Ámbar para acciones criticas y verde para exito.
- [15_auditoria_frontend_ux.md](../15_auditoria_frontend_ux.md) - El retiro exitoso no debe borrar el estado visible.
- [07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md](../07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md) - Wallet handoff, `prepareTransaction()` y `claim_savings`.
- [UI-RFC-CHAT.md](./UI-RFC-CHAT.md) - Macro de referencia, usado solo como base de corte.

## Component Decomposition

| Componente | Ruta de archivo | Estado | Accion |
|---|---|---|---|
| `SignTxButton` | `packages/frontend/components/shared/SignTxButton.tsx` | `EXTEND` | Agregar estados de claim, timeout, rechazo y confirmacion. |
| `ChatBubble` | `packages/frontend/components/chat/ChatBubble.tsx` | `EXTEND` | Alojar preview de monto + CTA de firma dentro de una burbuja AI. |
| `BalanceCard` | `packages/frontend/components/shared/BalanceCard.tsx` | `EXTEND` | Mostrar el estado `Transferido` despues del claim para conservar rastros. |
| `LoadingIndicator` | `packages/frontend/components/shared/LoadingIndicator.tsx` | `DOC-ONLY` | Reusar la espera de red/firma. |

## TypeScript Interfaces

```typescript
type SignTxStatus =
  | 'idle'
  | 'preparing'
  | 'ready'
  | 'opening-wallet'
  | 'awaiting-approval'
  | 'submitting'
  | 'confirming'
  | 'signed'
  | 'rejected'
  | 'timeout'
  | 'error';

interface SignTxButtonProps {
  xdr: string;
  amount: number;
  label?: string;
  currencyLabel?: 'dolares';
  disabled?: boolean;
  onStatusChange?: (status: SignTxStatus) => void;
  onSuccess: (txHash: string) => void;
  onError: (error: Error) => void;
}

interface ClaimIntent {
  amount: number;
  contractId: string;
  xdr: string;
  confirmedByUser: boolean;
}

interface ClaimSignState {
  phase: SignTxStatus;
  txHash: string | null;
  persistentTraceVisible: boolean;
  lastError: string | null;
}

interface ClaimSignTelemetryPayload {
  contractId: string;
  amount: number;
  phase: SignTxStatus;
  network: 'testnet';
}
```

## File Manifest

- `packages/frontend/components/shared/SignTxButton.tsx`
- `packages/frontend/components/chat/ChatBubble.tsx`
- `packages/frontend/components/shared/BalanceCard.tsx`
- `packages/frontend/app/api/chat/route.ts`
- `packages/frontend/lib/wallet.ts`
- `packages/frontend/lib/contract.ts`
- `packages/frontend/lib/ai-tools.ts`

## Token Binding Table

| Visual UXS | Tailwind class | Token source |
|---|---|---|
| CTA accent | `bg-amber-500 text-white font-bold rounded-lg px-6 py-3 w-full` | `10_identidad_visual.md` + `10_patrones_ui.md` |
| Hover CTA | `hover:bg-amber-600` | `10_lineamientos_interfaz_visual.md` |
| Loading | `inline-flex items-center gap-2` + spinner | `10_lineamientos_interfaz_visual.md` |
| Success | `text-emerald-600` + `CheckCircle` | `10_identidad_visual.md` |
| Error | `bg-red-100 text-red-700 border border-red-200` | `10_identidad_visual.md` |
| Wallet timeout | `text-slate-500` | `10_identidad_visual.md` |
| Inline width | `w-full` dentro de la burbuja | `10_lineamientos_interfaz_visual.md` |

## State Machine

| UXS state | Component state | Trigger |
|---|---|---|
| Monto listo | `ready` | AI preparo el XDR de ahorro. |
| Click de firma | `opening-wallet` | El usuario toca `Firmar con wallet`. |
| Ventana abierta | `awaiting-approval` | La wallet muestra la review. |
| Envio | `submitting` | El usuario aprueba la transaccion. |
| Confirmacion red | `confirming` | La firma ya fue aceptada y falta el cierre de red. |
| Exito | `signed` | Llega `txHash` y se dispara el rastro persistente. |
| Rechazo | `rejected` | El usuario cancela en la wallet. |
| Timeout | `timeout` | La wallet no responde a tiempo. |
| Error | `error` | Falla de red, parse o firma. |

## Copy Catalog

```typescript
const CLAIM_COPY = {
  PREVIEW: (amount: number) => `Tenes $${amount}. Preparé la transaccion.`,
  BUTTON: 'Firmar con wallet',
  SIGNING: 'Firmando...',
  CONFIRMING: 'Esperando confirmacion...',
  TIMEOUT: 'La wallet no responde. Verificá que esté abierta.',
  ERROR: 'Error al firmar. Reintentar?',
  SUCCESS: (amount: number) => `Listo. ${amount} dolares transferidos a tu wallet.`,
  SAFETY: 'Tus fondos estan seguros.',
  INTENT: 'Quiero sacar mi ahorro',
} as const;
```

## Accessibility Contract

- `SignTxButton` tiene nombre accesible explicito, por ejemplo `Firmar con wallet`.
- El boton soporta `Enter` y `Space` igual que cualquier boton nativo.
- Mientras la firma esta en curso, el boton expone `aria-busy="true"` o equivalente.
- Los cambios de estado `Signing`, `Confirming` y `Success` se anuncian con `aria-live="polite"`.
- Si ocurre error o rechazo, el foco vuelve al boton o al mensaje relevante sin obligar a recomponer desde cero.
- No se abre modal extra: la accion permanece inline para bajar ansiedad.

## Telemetry Spec

```typescript
type ClaimTelemetryEvent =
  | 'claim_quote_created'
  | 'claim_sign_clicked'
  | 'claim_wallet_opened'
  | 'claim_approved'
  | 'claim_rejected'
  | 'claim_timeout'
  | 'claim_confirmed'
  | 'claim_visual_trace_updated';

declare function trackClaimEvent(
  event: ClaimTelemetryEvent,
  payload: ClaimSignTelemetryPayload
): void;
```

## Test Assertions

- Muestra monto y CTA de firma cuando el AI prepara el reclamo.
- Abre la wallet al click de firma y refleja el estado intermedio.
- Marca exito solo despues de confirmacion real, no al click inicial.
- Deja rastro visual persistente del retiro en el balance y en el chat.
- Permite reintentar si el usuario rechaza o si hay timeout.
- No ofrece `claim_severance`; solo existe `ahorro`.
- NUNCA muestra `XDR`, `hash` o jerga tecnica al trabajador.
- NUNCA borra el registro del retiro exitoso.
- NUNCA depende solo de color para explicar exito o error.

## Dependencies

- `UI-RFC-WORKER-BALANCE-QUERY.md` para el estado persistente `Transferido`.
- `UI-RFC-WORKER-CHAT-SHELL.md` para el host inline de la burbuja.
- `packages/frontend/lib/wallet.ts` para apertura, firma y deteccion de red.
- `packages/frontend/lib/contract.ts` para construir el XDR de `claim_savings`.
- `packages/frontend/app/api/chat/route.ts` para emitir la accion preparada por AI.
- No existe `claim_severance`; la indemnizacion se libera al terminar contrato.

## Learning Notes

- Esta es la unica accion de retiro del worker en MVP y por eso merece un CTA muy claro.
- El paso de firma es el momento de mayor ansiedad; el contrato debe darle feedback visible, corto y confiable.
- El estado exitoso no puede desaparecer porque el usuario necesita prueba de que la accion ya ocurrio.
- Separar el copy de preparacion, firma y confirmacion evita mezclar expectativa con resultado.
