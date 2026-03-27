# UI-RFC-WORKER-CHAT-SHELL

## Source

- [14_UXS.md](../14_UXS.md) - Especificacion 2, `Chat Trabajador (Fullscreen)`, decisiones activas sobre eventos grises y rastro visible post-retiro.
- [13_UJ.md](../13_UJ.md) - Viajes 2, 3 y 4: consulta de balance, retiro con wallet y terminacion con notificacion simultanea.
- [12_UXI.md](../12_UXI.md) - Casos 1, 2 y 3: balance protegido, reclamo de ahorro y chat como eje central.
- [10_patrones_ui.md](../10_patrones_ui.md) - `ChatFullscreen`, `ChatMessages`, `ChatBubble`, `ChatInput`, `LoadingIndicator`.
- [10_lineamientos_interfaz_visual.md](../10_lineamientos_interfaz_visual.md) - Layout de chat, bubble system gris, input fijo y loading con spinner.
- [10_identidad_visual.md](../10_identidad_visual.md) - Paleta azul marino, esmeralda, azul chat y grises neutrales.
- [15_auditoria_frontend_ux.md](../15_auditoria_frontend_ux.md) - `ChatFullscreen` y derivados siguen `DOC-ONLY`; `SystemEventMessage` es `RFC-FIRST`.
- [07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md](../07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md) - `packages/frontend/app/trabajador/page.tsx`, `app/api/chat/route.ts`, `useChat()`, `ContractProvider`.
- [UI-RFC-CHAT.md](./UI-RFC-CHAT.md) - Macro de referencia, usado solo como insumo de descomposicion.

## Component Decomposition

| Componente | Ruta de archivo | Estado | Accion |
|---|---|---|---|
| `WorkerChatPage` | `packages/frontend/app/trabajador/page.tsx` | `NEW` | Crear la ruta de entrada del trabajador y montar providers/metadata. |
| `ChatFullscreen` | `packages/frontend/components/chat/ChatFullscreen.tsx` | `EXTEND` | Amplificar el shell para worker-only, usando `useChat()` y scroll automatico. |
| `ChatMessages` | `packages/frontend/components/chat/ChatMessages.tsx` | `EXTEND` | Soportar mensajes AI, usuario y sistema en una sola lista ordenada. |
| `ChatBubble` | `packages/frontend/components/chat/ChatBubble.tsx` | `EXTEND` | Mantener variantes AI/usuario y permitir children inline. |
| `ChatInput` | `packages/frontend/components/chat/ChatInput.tsx` | `EXTEND` | Composer fijo con envio por teclado y estados disabled/busy. |
| `LoadingIndicator` | `packages/frontend/components/shared/LoadingIndicator.tsx` | `DOC-ONLY` | Reusar el indicador de carga en vez de inventar otro loading. |

`NEW` = no tenia ownership tecnico en el repo. `EXTEND` = el patron documental existe, pero este flujo lo amplifica. `DOC-ONLY` = sigue siendo solo especificacion.

## TypeScript Interfaces

```typescript
type ChatRole = 'ai' | 'user' | 'system';
type ChatPhase = 'booting' | 'ready' | 'composing' | 'sending' | 'streaming' | 'error';

interface WorkerChatPageProps {
  contractId: string;
}

interface ChatMessageItem {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  kind?: 'plain' | 'balance' | 'claim' | 'system';
  pushDelivered?: boolean;
  persistentTrace?: boolean;
  children?: React.ReactNode;
}

interface ChatFullscreenProps {
  contractId: string;
  initialMessages: ChatMessageItem[];
  workerDisplayName?: string;
}

interface ChatMessagesProps {
  messages: ChatMessageItem[];
  isThinking: boolean;
}

interface ChatBubbleProps {
  role: ChatRole;
  content: string;
  children?: React.ReactNode;
  persistentTrace?: boolean;
}

interface ChatInputProps {
  value: string;
  disabled?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
}

interface ChatShellState {
  phase: ChatPhase;
  draft: string;
  messages: ChatMessageItem[];
  autoScrollEnabled: boolean;
}
```

## File Manifest

- `packages/frontend/app/trabajador/page.tsx`
- `packages/frontend/components/chat/ChatFullscreen.tsx`
- `packages/frontend/components/chat/ChatMessages.tsx`
- `packages/frontend/components/chat/ChatBubble.tsx`
- `packages/frontend/components/chat/ChatInput.tsx`
- `packages/frontend/components/shared/LoadingIndicator.tsx`
- `packages/frontend/app/api/chat/route.ts`

## Token Binding Table

| Visual UXS | Tailwind class | Token source |
|---|---|---|
| Shell completo | `flex flex-col h-screen` o `h-[calc(100vh-64px)]` | `10_lineamientos_interfaz_visual.md` + `07_tech` |
| Area de mensajes | `flex-1 overflow-y-auto p-4` | `10_lineamientos_interfaz_visual.md` |
| Input fijo al pie | `fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4` | `10_lineamientos_interfaz_visual.md` |
| Burbuja AI | `bg-blue-50 rounded-2xl rounded-bl-sm max-w-[85%] ml-0 p-4 text-slate-800` | `10_identidad_visual.md` + `10_patrones_ui.md` |
| Burbuja usuario | `bg-emerald-50 rounded-2xl rounded-br-sm max-w-[85%] ml-auto p-4 text-slate-800` | `10_identidad_visual.md` + `10_patrones_ui.md` |
| Burbuja sistema | `bg-slate-100 border border-slate-200 rounded-2xl max-w-[85%] mx-auto p-4 text-slate-700` | `10_lineamientos_interfaz_visual.md` |
| Texto secundario | `text-slate-500` | `10_identidad_visual.md` |
| Loading de espera | `flex items-center gap-2 text-slate-500` + spinner azul marino | `10_lineamientos_interfaz_visual.md` |
| Focus ring | `focus:ring-2 focus:ring-[#1E3A5F]` | `10_identidad_visual.md` |

## State Machine

| UXS state | Component state | Trigger |
|---|---|---|
| Boot inicial | `booting` | Carga de pagina / providers. |
| Lista estable | `ready` | Wallet y contractId resueltos. |
| Redaccion | `composing` | El usuario escribe en `ChatInput`. |
| Envio | `sending` | Click en enviar o Enter. |
| Respuesta en curso | `streaming` | `useChat()` recibe chunks o tool output. |
| Error visible | `error` | Timeout, proxy fail o parse fail. |

## Copy Catalog

```typescript
const WORKER_CHAT_COPY = {
  WELCOME: 'Bienvenido. Preguntame lo que necesites sobre tu ahorro.',
  PLACEHOLDER: 'Escribi tu pregunta...',
  SEND: 'Enviar',
  THINKING: 'Procesando...',
  WAITING_CONFIRMATION: 'Esperando confirmacion...',
  RETRY: 'Reintentar',
  SUGGESTION_BALANCE: 'Cuanto tengo?',
  SUGGESTION_CLAIM: 'Quiero sacar mi ahorro',
  ERROR_GENERIC: 'Hubo un problema. Tus fondos estan seguros.',
} as const;
```

## Accessibility Contract

- `ChatMessages` usa `role="log"` y `aria-live="polite"` para anunciar nuevas entradas sin robar foco.
- `ChatInput` tiene label visible o `aria-label` claro, y el foco vuelve a el despues de enviar.
- `Enter` envia el mensaje; `Shift+Enter` solo aplica si el input se implementa como textarea.
- `LoadingIndicator` debe quedar dentro de un nodo con `aria-live="polite"` y `aria-atomic="true"`.
- Las burbujas no dependen solo del color: AI, usuario y sistema usan alineacion, borde y contexto textual.
- El scroll automatico nunca desplaza el foco del teclado.

## Telemetry Spec

```typescript
type ChatTelemetryEvent =
  | 'chat_opened'
  | 'chat_message_sent'
  | 'chat_message_stream_started'
  | 'chat_message_stream_finished'
  | 'chat_error'
  | 'chat_autoscroll';

interface ChatTelemetryPayload {
  contractId: string;
  role: 'worker';
  messageCount: number;
  hasSystemEvent: boolean;
  phase: ChatPhase;
}

declare function trackWorkerChatEvent(
  event: ChatTelemetryEvent,
  payload: ChatTelemetryPayload
): void;
```

## Test Assertions

- Renderiza `ChatFullscreen` con altura completa y sin scroll horizontal.
- Muestra un mensaje de bienvenida al entrar al chat.
- Permite escribir, enviar y limpiar el draft sin perder el contexto.
- Hace auto-scroll al ultimo mensaje nuevo.
- Muestra loading de texto o spinner, no skeleton, mientras el AI responde.
- Acepta mensajes con children inline para balance o firma.
- NUNCA muestra addresses completas al trabajador.
- NUNCA muestra jerga tecnica como `USDC`, `Soroban` o `XDR`.
- NUNCA usa emojis como mecanismo primario de informacion.
- NUNCA deja el input sin label accesible.

## Dependencies

- `UI-RFC-WORKER-BALANCE-QUERY.md` para el bloque inline de balance.
- `UI-RFC-WORKER-CLAIM-SIGN.md` para el bloque inline de firma.
- `UI-RFC-WORKER-SYSTEM-EVENTS.md` para mensajes oficiales grises y `pushDelivered`.
- `packages/frontend/app/api/chat/route.ts` para streaming de AI y tool calls.
- `WalletProvider` y `ContractProvider` del design system tecnico.
- `LoadingIndicator` compartido, sin skeleton screens en MVP.

## Learning Notes

- El shell no debe decidir el contenido semantico; solo orquesta lista, composer y estados.
- La UXS pide chat-first, por eso la pantalla completa es el contenedor principal y no un panel secundario.
- El loading se resuelve con feedback simple y visible porque la confianza del worker depende de no sentir que la app se colgo.
- Este RFC separa la forma del contenedor de la logica de balance, firma y eventos oficiales para que cada micro-contrato sea testeable por separado.
