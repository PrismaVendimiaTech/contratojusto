# UI-RFC-CHAT: Chat Trabajador (Fullscreen)

## Fuente

- **UXS**: 14_UXS.md Especificacion 2 (Chat Trabajador)
- **Jornada**: 13_UJ.md Journeys 2, 3
- **UXI**: 12_UXI.md Casos 1-3 (ver balance, reclamar, hablar con AI)
- **Patrones**: 10_patrones_ui.md (ChatFullscreen, ChatMessages, ChatBubble, ChatInput, SignTxButton, BalanceCard)

## Descomposicion de Componentes

| Componente | Ruta de Archivo | Estado | Accion |
|---|---|---|---|
| TrabajadorPage | app/trabajador/page.tsx | NEW | Crear pagina con chat |
| ChatFullscreen | components/ChatFullscreen.tsx | NEW | Contenedor de chat fullscreen |
| ChatMessages | components/ChatMessages.tsx | NEW | Renderizador de lista de mensajes |
| ChatBubble | components/ChatBubble.tsx | NEW | Burbuja individual de mensaje |
| ChatInput | components/ChatInput.tsx | NEW | Barra de entrada |
| BalanceCard | components/BalanceCard.tsx | NEW | Tarjeta de balance (variante inline) |
| SignTxButton | components/SignTxButton.tsx | NEW | Boton de firma de transaccion |

## Interfaces TypeScript

```typescript
// components/ChatFullscreen.tsx
interface ChatFullscreenProps {
  contractId: string;
}

// components/ChatBubble.tsx
interface ChatBubbleProps {
  role: 'ai' | 'user' | 'system';
  content: string;
  children?: React.ReactNode;
}

// components/ChatInput.tsx
interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

// components/BalanceCard.tsx
interface BalanceCardProps {
  savings: number;
  severance: number;
  total: number;
  depositCount: number;
  variant?: 'card' | 'inline';
}

// components/SignTxButton.tsx
interface SignTxButtonProps {
  xdr: string;
  label?: string;
  onSuccess: (txHash: string) => void;
  onError: (error: Error) => void;
  signTransaction?: (xdr: string) => Promise<string>; // from WalletProvider context
}

// lib/ai-tools.ts
interface ConsultarBalanceResult {
  ahorro: number;
  indemnizacion: number;
  total: number;
  depositos: number;
}

interface PrepararReclamoResult {
  xdr: string;
  resumen: string;
  monto: number;
}
```

## Manifiesto de Archivos

```
packages/frontend/
├── app/
│   ├── trabajador/
│   │   └── page.tsx         <- TrabajadorPage (esta RFC)
│   └── api/
│       └── chat/
│           └── route.ts     <- Manejador de ruta AI chat
├── components/
│   ├── ChatFullscreen.tsx
│   ├── ChatMessages.tsx
│   ├── ChatBubble.tsx
│   ├── ChatInput.tsx
│   ├── BalanceCard.tsx
│   └── SignTxButton.tsx
├── lib/
│   ├── ai-tools.ts
│   ├── contract.ts
│   └── stellar.ts
```

## Tabla de Vinculacion de Tokens

| Propiedad UXS | Clase Tailwind | Fuente de Token |
|---|---|---|
| Contenedor de chat | flex flex-col h-[calc(100vh-64px)] | Alto completo menos header |
| Area de mensajes | flex-1 overflow-y-auto p-4 | Desplazable |
| Fondo burbuja AI | bg-blue-50 | 10_identidad_visual: chat.ai |
| Forma burbuja AI | rounded-2xl rounded-bl-sm | 10_lineamientos: chat |
| Fondo burbuja usuario | bg-emerald-50 | 10_identidad_visual: chat.user |
| Forma burbuja usuario | rounded-2xl rounded-br-sm | 10_lineamientos: chat |
| Fondo mensaje sistema | bg-slate-100 | Notificaciones (gris neutral) |
| Ancho maximo burbuja | max-w-[85%] | 10_lineamientos: chat |
| Barra de entrada | bg-white border-t border-slate-200 p-4 | 10_lineamientos |
| Campo de entrada | border border-slate-300 rounded-lg px-4 py-3 | 10_lineamientos |
| Boton enviar | bg-blue-500 text-white rounded-lg p-3 | Primario |
| Boton firmar | bg-amber-500 text-white font-bold rounded-lg w-full py-3 | Acento |
| Saldo ahorro | text-emerald-600 font-semibold | Verde |
| Saldo indemnizacion | text-slate-400 font-semibold | Gris |
| Indicador loading | bg-blue-500 w-2 h-2 rounded-full animate-bounce | Primario |

## Maquina de Estados

| Estado | Disparador | Estado Siguiente | Cambio en UI |
|---|---|---|---|
| idle | carga de pagina | welcome | Burbuja bienvenida AI |
| welcome | usuario escribe | composing | Input tiene texto |
| composing | click enviar | thinking | Input deshabilitado, puntos |
| thinking | AI responde (texto) | idle | Burbuja AI |
| thinking | AI responde (balance) | idle | Burbuja AI + BalanceCard |
| thinking | AI responde (xdr) | signing | Burbuja AI + SignTxButton |
| signing | click SignTx | wallet_signing | Boton Firmando + envia a wallet conectada |
| wallet_signing | usuario firma | confirming | Boton Confirmando |
| wallet_signing | usuario rechaza | idle | Boton normal |
| confirming | tx exitosa | idle | AI confirma |
| confirming | tx falla | idle | AI error pero fondos seguros |
| thinking | timeout >3s | idle | AI procesando |
| thinking | error micro-proxy | idle | AI no puedo consultar |

## Catalogo de Textos (es-AR)

```typescript
const CHAT_COPY = {
  WELCOME: 'Bienvenido. Soy tu asesor de ContratoJusto. Preguntame lo que necesites.',
  PLACEHOLDER: 'Escribi tu pregunta...',
  SEND: 'Enviar',
  THINKING: 'Procesando...',
  SIGN_TX: 'Firmar transaccion',
  SIGNING: 'Firmando...',
  CONFIRMING: 'Confirmando...',
  TX_SUCCESS: (amount: number) => `Listo. ${amount} dolares transferidos.`,
  TX_FAIL: 'Transaccion fallo. Fondos seguros. Reintentar?',
  PROXY_ERROR: 'No puedo consultar. Fondos protegidos. Intenta rato.',
  BALANCE_LABEL_SAVINGS: 'Ahorro',
  BALANCE_LABEL_SEVERANCE: 'Indemnizacion',
  BALANCE_LABEL_TOTAL: 'Total',
  BALANCE_DEPOSITS: (n: number) => `${n} deposito${n !== 1 ? 's' : ''} realizados`,
  BALANCE_UPDATED: 'Actualizado hoy',
  SEVERANCE_HINT: '(se libera si termina contrato)',
} as const;
```

## Contrato de Accesibilidad

- **ChatInput**: aria-label="Escribi tu pregunta", autofocus
- **ChatBubble AI**: role="status", aria-live="polite"
- **ChatBubble Usuario**: sin ARIA especial
- **SignTxButton**: aria-label="Firmar transaccion"
- **BalanceCard**: role="status", aria-label="Balance contrato"
- **Area mensajes**: role="log", aria-live="polite"
- **Orden enfoque**: ChatInput siempre enfocado cuando idle

## Afirmaciones de Prueba

- [ ] Mensaje bienvenida aparece al cargar
- [ ] Usuario puede escribir y enviar
- [ ] AI responde en menos 3 segundos
- [ ] Cuanto tengo dispara consultarBalance
- [ ] Quiero reclamar dispara prepararReclamo
- [ ] Click SignTxButton envia a wallet conectada para firma
- [ ] Modal/popup wallet abre para firma
- [ ] Despues firmar AI confirma exito
- [ ] Despues rechazar sin efectos
- [ ] Timeout micro-proxy mensaje error
- [ ] Notificacion sistema en gris
- [ ] NUNCA: AI contiene USDC, Soroban, blockchain
- [ ] NUNCA: AI contiene emojis
- [ ] NUNCA: error tecnico mostrado usuario

## Notas de Implementacion

### Comportamiento del Chat

1. **Primera carga**: 
   - Obtener contractId del contexto
   - Renderizar mensaje bienvenida
   - Input autofocusado

2. **Envio de mensaje**:
   - Validar no vacio
   - Agregar historial local
   - Enviar /api/chat con historial
   - Deshabilitar input

3. **Respuesta del AI**:
   - Parsear respuesta
   - Si BalanceCard: renderizar
   - Si SignTxButton: renderizar con XDR
   - Auto-scroll ultimo

4. **Firma de transaccion**:
   - Obtener XDR de AI
   - Llamar kit.signTransaction(xdr) desde WalletProvider
   - En exito: enviar hash backend
   - En rechazo: permitir reintentar

### Manejo de Errores

Los errores deben ser amigables:

```typescript
// NO hacer:
"Error: Contract call failed at block 123456"

// SI hacer:
"Transaccion fallo. Tus fondos estan seguros. Queres reintentar?"
```

### Validacion de Red

Antes de permitir SignTx:

```typescript
const network = await kit.getNetwork();
if (network.networkPassphrase !== 'Test SDF Network ; September 2015') {
  showError('Asegurate de estar en Testnet');
}
```

### WalletState Interface

```typescript
interface WalletState {
  kit: StellarWalletsKit;
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signTransaction: (xdr: string) => Promise<string>;
}
```

SignTxButton debe obtener signTransaction desde el contexto:

```typescript
const { signTransaction } = useWallet();
// usa signTransaction(xdr) para firmar
```

---

**Ultima actualizacion**: 2026-03-26
**Version**: 1.0 MVP
