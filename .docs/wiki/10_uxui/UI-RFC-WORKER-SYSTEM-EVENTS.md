# UI-RFC-WORKER-SYSTEM-EVENTS

## Source

- [14_UXS.md](../14_UXS.md) - Los eventos oficiales del trabajador van como burbujas grises y pueden complementarse con push.
- [13_UJ.md](../13_UJ.md) - Viaje 4: terminacion del contrato, push simultaneo y mensaje aclaratorio en chat.
- [12_UXI.md](../12_UXI.md) - Caso 4: notificacion no alarmante, buena noticia en segunda linea y verificacion en wallet.
- [10_patrones_ui.md](../10_patrones_ui.md) - `SystemEventMessage` con bubble gris centrada.
- [10_lineamientos_interfaz_visual.md](../10_lineamientos_interfaz_visual.md) - System bubble gris, uso oficial de eventos y ubicacion dentro del chat.
- [10_identidad_visual.md](../10_identidad_visual.md) - Slate para neutralidad, sin gradientes ni ornamentos.
- [15_auditoria_frontend_ux.md](../15_auditoria_frontend_ux.md) - `SystemEventMessage` es `RFC-FIRST` y resuelve el ownership tecnico faltante.
- [07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md](../07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md) - Flujo de chat y respeto por la capa de streaming; push opcional queda fuera del backend actual.
- [UI-RFC-CHAT.md](./UI-RFC-CHAT.md) - Macro de referencia, solo para leer el lenguaje previo.

## Component Decomposition

| Componente | Ruta de archivo | Estado | Accion |
|---|---|---|---|
| `SystemEventMessage` | `packages/frontend/components/chat/SystemEventMessage.tsx` | `NEW` | Crear el componente oficial gris con `kind`, `title`, `body` y estado de push. |
| `ChatMessages` | `packages/frontend/components/chat/ChatMessages.tsx` | `EXTEND` | Reconocer `kind='system'` y renderizarlo con prioridad visual propia. |
| `ChatBubble` | `packages/frontend/components/chat/ChatBubble.tsx` | `EXTEND` | Mantener AI/usuario separado del evento oficial para no confundir voces. |

## TypeScript Interfaces

```typescript
type SystemEventKind = 'contract-created' | 'deposit-received' | 'contract-terminated';
type SystemEventPhase = 'incoming' | 'rendered' | 'push-queued' | 'push-delivered' | 'push-failed' | 'acknowledged';

interface SystemEventMessageProps {
  kind: SystemEventKind;
  title: string;
  body: string;
  timestamp?: string;
  pushDelivered?: boolean;
}

interface SystemEventTimelineItem {
  id: string;
  kind: SystemEventKind;
  title: string;
  body: string;
  timestamp: string;
  pushDelivered: boolean;
  seen: boolean;
}

interface SystemEventState {
  phase: SystemEventPhase;
  visibleInChat: boolean;
  pushTransport: 'optional' | 'not-requested' | 'failed' | 'delivered';
}

interface SystemEventTelemetryPayload {
  contractId: string;
  kind: SystemEventKind;
  phase: SystemEventPhase;
  pushDelivered: boolean;
}
```

## File Manifest

- `packages/frontend/components/chat/SystemEventMessage.tsx`
- `packages/frontend/components/chat/ChatMessages.tsx`
- `packages/frontend/app/trabajador/page.tsx`
- `packages/frontend/lib/system-events.ts`

## Token Binding Table

| Visual UXS | Tailwind class | Token source |
|---|---|---|
| Bubble oficial | `bg-slate-100 border border-slate-200 rounded-2xl p-4 max-w-[85%] mx-auto` | `10_patrones_ui.md` + `10_lineamientos_interfaz_visual.md` |
| Titulo oficial | `text-slate-800 font-semibold text-sm` | `10_identidad_visual.md` |
| Cuerpo oficial | `text-slate-700 text-sm leading-6` | `10_identidad_visual.md` |
| Timestamp | `text-slate-500 text-xs` | `10_identidad_visual.md` |
| Push delivered | `inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-xs` | `10_identidad_visual.md` |
| Push pending | `inline-flex items-center rounded-full bg-slate-200 text-slate-600 px-2 py-0.5 text-xs` | `10_identidad_visual.md` |

## State Machine

| UXS state | Component state | Trigger |
|---|---|---|
| Evento emitido | `incoming` | Backend o flujo de negocio publica contrato/deposito/terminacion. |
| Evento visible | `rendered` | El chat lo inserta en la cronologia. |
| Push en cola | `push-queued` | Se intenta notificacion opcional. |
| Push entregado | `push-delivered` | Llega confirmacion del transporte opcional. |
| Push fallido | `push-failed` | El push no se entrega, pero el evento sigue en chat. |
| Evento entendido | `acknowledged` | El usuario lo ve o el sistema lo marca como leido. |

## Copy Catalog

```typescript
const SYSTEM_EVENT_COPY = {
  CONTRACT_CREATED_TITLE: 'Contrato creado',
  CONTRACT_CREATED_BODY: 'Tu contrato ya esta listo para usar.',
  DEPOSIT_RECEIVED_TITLE: 'Deposito recibido',
  DEPOSIT_RECEIVED_BODY: (savings: number, severance: number) =>
    `Tu patron transfirio ${savings + severance} dolares. Ahorro +${savings}, Indemnizacion +${severance}.`,
  CONTRACT_TERMINATED_TITLE: 'Contrato terminado',
  CONTRACT_TERMINATED_BODY: (amount: number) =>
    `Recibiste ${amount} dolares de indemnizacion.`,
  PUSH_DELIVERED: 'Notificado por push',
  PUSH_PENDING: 'Push opcional',
} as const;
```

## Accessibility Contract

- `SystemEventMessage` vive dentro del historial con `role="status"` o dentro de un `role="log"` ya presente.
- El mensaje oficial usa texto y estructura, no solo color, para que la neutralidad sea entendible.
- El timestamp se expone con `time` o texto legible por lector de pantalla.
- El componente no captura foco salvo que el usuario navegue hacia el historial.
- Si `pushDelivered` cambia, se anuncia de forma no intrusiva.

## Telemetry Spec

```typescript
type SystemEventTelemetryEvent =
  | 'system_event_created'
  | 'system_event_rendered'
  | 'system_event_push_queued'
  | 'system_event_push_delivered'
  | 'system_event_push_failed'
  | 'system_event_acknowledged';

declare function trackSystemEvent(
  event: SystemEventTelemetryEvent,
  payload: SystemEventTelemetryPayload
): void;
```

## Test Assertions

- Renderiza eventos oficiales como burbujas grises centradas y no como mensajes AI.
- Distingue contrato creado, deposito recibido y contrato terminado por `kind`.
- Mantiene el evento visible en el historial aunque el push falle.
- Permite indicar push opcional sin bloquear la lectura del chat.
- No mezcla la voz del sistema con la del asistente.
- Acompaña cada evento con titulo, cuerpo y timestamp cuando existe.
- NUNCA usa fondo azul o verde para eventos oficiales.
- NUNCA oculta el evento si el push no llega.
- NUNCA los trata como mensajes escritos por el usuario.

## Dependencies

- `UI-RFC-WORKER-CHAT-SHELL.md` para la insercion del evento en el chat principal.
- `UI-RFC-WORKER-BALANCE-QUERY.md` para el caso `deposit-received`.
- `UI-RFC-WORKER-CLAIM-SIGN.md` para el caso donde el retiro exitoso altera el balance.
- `packages/frontend/components/chat/ChatMessages.tsx` para el render por tipo.
- Push transport opcional: sin backend definido en este corte, solo estado UI.

## Learning Notes

- El worker necesita un registro oficial de lo que paso; no alcanza con dejar que el AI lo cuente.
- El gris neutral evita que el usuario confunda una notificacion del sistema con una respuesta conversacional.
- El push es una ayuda, no la fuente de verdad. La fuente de verdad es el mensaje persistente en el chat.
- Separar la vida del evento del canal de entrega hace que la experiencia siga siendo util aun si el push falla.
