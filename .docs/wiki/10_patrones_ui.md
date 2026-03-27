# 10 - Patrones UI: ContratoJusto

## Propósito
Documentar los componentes reutilizables y tokens de diseño para implementación consistente.

## Design Tokens (Tailwind config)

### Colores custom
```typescript
// tailwind.config.ts extend
colors: {
  brand: {
    primary: '#1E3A5F',    // azul marino
    secondary: '#10B981',  // esmeralda
    accent: '#F59E0B',     // ámbar
  },
  chat: {
    ai: '#EFF6FF',         // blue-50, fondo mensajes AI
    user: '#ECFDF5',       // emerald-50, fondo mensajes usuario
  }
}
```

### Spacing
- Grid base: 4px (Tailwind default)
- Page padding: p-4 (16px mobile), p-6 (24px desktop)
- Card padding: p-4 (16px)
- Gap entre cards: gap-4 (16px)
- Chat bubble padding: p-4

### Radius
- Cards: rounded-xl (12px)
- Buttons: rounded-lg (8px)
- Chat bubbles: rounded-2xl (16px) + corner variant
- Inputs: rounded-lg (8px)
- Avatar/badge: rounded-full

### Shadows
- Cards: shadow-sm
- Modals: shadow-lg (si se usan en el futuro)
- Buttons: sin shadow (diseño plano)

### Transitions
- Default: transition-all duration-200 ease-in-out
- Chat messages: animación fade-in

## Componentes (8)

### 1. WalletConnect
```
Props: ninguno (lee del contexto WalletProvider)
Estados: desconectado, conectando, conectado, modal_open
Render:
  - Desconectado: Botón "Conectar Wallet" (estilo primario)
  - Conectando: Botón deshabilitado + spinner
  - modal_open: Abre Stellar Wallets Kit modal multi-wallet
  - Conectado: Chip con address truncada "GAB...X2K" + punto verde
Behavior:
  - Click → kit.openModal() para seleccionar wallet
```

### 2. BalanceCard
```
Props: { savings: number, severance: number, total: number, depositCount: number }
Render:
  - Card blanca, rounded-xl, shadow-sm
  - 3 filas: Ahorro ($X), Indemnización ($X), separador, Total ($X)
  - Montos en font-semibold text-lg, color esmeralda para positivos
  - Footer: "X depósitos realizados" en caption
  - Variante inline: sin shadow ni border (para usar dentro del chat)
  - Loading state: skeleton lines (bg-slate-200 animate-pulse) for each row
  - Error state: "No se pudo cargar el balance" + boton Reintentar
```

### 3. ChatBubble
```
Props: { role: 'ai' | 'user', content: string, children?: ReactNode }
Render:
  - AI: bg-blue-50, rounded-2xl rounded-bl-sm, max-w-[85%], mr-auto
  - User: bg-emerald-50, rounded-2xl rounded-br-sm, max-w-[85%], ml-auto
  - Content: text-slate-800, text-base
  - Children slot: para BalanceCard inline o SignTxButton
  - Loading state (AI thinking): 3 dots animados en burbuja azul
  - Error state: burbuja con fondo rojo claro, icon AlertCircle
```

### 4. ChatInput
```
Props: { onSend: (msg: string) => void, disabled?: boolean }
Render:
  - Contenedor: bg-white border-t border-slate-200 p-4
  - Input: flex-1, border rounded-lg px-4 py-3, placeholder "Escribí tu pregunta..."
  - Send button: bg-brand-primary text-white rounded-lg p-3, ícono Send de Lucide
  - Disabled state: opacity-50 en todo
```

### 5. SignTxButton
```
Props: { xdr: string, label?: string, onSuccess: (txHash: string) => void, onError: (e: Error) => void }
Render:
  - Button: bg-amber-500 text-white font-bold rounded-lg px-6 py-3 w-full
  - Icon: Lock de Lucide (sugiere seguridad)
  - Text: "Firmar transacción" (o label custom)
  - Loading: spinner + "Firmando..."
  - Success: checkmark verde + "Firmada"
  - Error state: bg-red-100 text-red-700, icon AlertCircle, text "Error al firmar. Reintentar?"
  - Timeout state: text "Wallet no responde. Verifica que este abierta."
  Behavior:
  - Click → llama wallet.signTransaction(xdr) via Stellar Wallets Kit
  - Success → llama onSuccess(txHash)
  - Error → llama onError
```

### 6. DepositForm
```
Props: { onDeposit: (amount: number) => void, loading?: boolean, savingsPct?: number, severancePct?: number }
Render:
  - Card blanca, rounded-xl, shadow-sm
  - Title: "Depositar USDC" (heading style)
  - Input numérico: type="number", min=0, step=0.01, placeholder "Monto en dólares"
  - Split preview (si savingsPct y severancePct presentes): muestra "XX% a ahorro, YY% a indemnización"
  - Button: primario, "Depositar", ancho completo
  - Loading: spinner en botón
```

### 7. ContractStatus
```
Props: { info: ContractInfo, balance: Balance }
Render:
  - Card blanca, rounded-xl, shadow-sm
  - Header: "Estado del contrato" + badge (Activo=punto verde, Terminado=punto rojo)
  - Rows: Trabajador (address truncada), Split (70%/30%), Depósitos (count), Total ($X)
  - If terminated: fondo rojo claro, texto "Terminado"
```

### 8. ActionButton
```
Props: { variant: 'primary' | 'secondary' | 'accent' | 'danger', children, ...rest }
Render por variante:
  - primary: bg-brand-primary text-white
  - secondary: border-brand-primary text-brand-primary bg-transparent
  - accent: bg-amber-500 text-white font-bold
  - danger: bg-red-500 text-white
  - All: rounded-lg px-6 py-3 min-h-12 font-medium transition-all
  - Disabled: opacity-50 cursor-not-allowed
```

---

## Reglas de uso
- Usar ActionButton para todas las acciones (reutilización)
- ChatBubble siempre con bg de chat (ai o user)
- BalanceCard inline solo dentro de ChatBubble (sin shadow)
- Mantener spacing consistente: gap-4 entre secciones
- Font: Inter para todo (del layout.tsx)
- Icons: lucide-react, tamaño 20px por defecto
- Colores: usar solo tokens custom (brand.primary, brand.secondary, brand.accent)
- En este repo todos los componentes siguen en estado documental (`DOC-ONLY`) hasta que exista implementación real en `packages/frontend/`
- El inventario reconciliado de ownership vive en `10_uxui/UX-COMPONENTS.md`

### 9. RoleCard
```
Props: { role: 'empleador' | 'trabajador', description: string, href: string }
Render:
  - Card: bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer
  - Icon: Briefcase (empleador) or User (trabajador) from Lucide, 32px, brand-primary
  - Title: Inter 600, 18px, brand-primary
  - Description: Inter 400, 14px, slate-500
  - Whole card is a link (next/link)
```

### 10. CreateContractForm
```
Props: { onSubmit: (data: { worker: string, savingsPct: number, severancePct: number }) => void, loading?: boolean, signTransaction?: (xdr: string) => Promise<string> }
Render:
  - Card: bg-white rounded-xl shadow-sm p-6
  - Title: "Crear contrato" Inter 600 18px
  - Input: Worker address (text, placeholder "Direccion del trabajador")
  - Input: % Ahorro (number, default 70)
  - Input: % Indemnización (number, auto-calculated: 100 - ahorro)
  - Button: primary "Crear contrato"
  - Validation: sum must be 100, worker address not empty
  - Loading: button disabled + spinner
  - signTransaction: obtenida de WalletProvider context (opcional si no pasada)
```

### 11. Toast
```
Props: { type: 'success' | 'error' | 'info', message: string, duration?: number }
Render:
  - Position: fixed top-4 right-4, z-50
  - success: bg-green-50 border-green-200 text-green-800, icon CheckCircle
  - error: bg-red-50 border-red-200 text-red-800, icon AlertCircle
  - info: bg-blue-50 border-blue-200 text-blue-800, icon Info
  - Auto-dismiss: 3s default
  - Animation: slide-in from right, fade-out
```

### 12. AppHeader
```
Props: { children?: ReactNode }
Render:
  - Container: fixed top-0 w-full h-16 bg-white border-b border-slate-200 z-40 px-4
  - Left: Logo wordmark "ContratoJusto" Inter Bold 18px brand-primary
  - Right: WalletConnect component
  - Mobile: logo + wallet, no nav links
```

### 13. Logo
```
Props: { size?: 'sm' | 'md' | 'lg' }
Render:
  - Shield icon (Lucide) + "ContratoJusto" text
  - sm: icon 20px + text 16px
  - md: icon 24px + text 18px (default, for header)
  - lg: icon 32px + text 24px (for home page)
  - Color: brand-primary (#1E3A5F)
  - Font: Inter Bold, tracking-tight
```

### 14. ChatFullscreen
```
Props: { contractId: string }
Render:
  - Container: flex flex-col h-[calc(100vh-64px)] (full height minus header)
  - Messages area: flex-1 overflow-y-auto p-4
  - Input bar: sticky bottom, bg-white border-t p-4
  - Uses useChat() from Vercel AI SDK
  - Auto-scroll to bottom on new message
```

### 15. ChatMessages
```
Props: { messages: Message[] }
Render:
  - Maps messages to ChatBubble components
  - AI messages: role='ai', may contain BalanceCard or SignTxButton children
  - User messages: role='user'
  - Loading: shows animated dots bubble when AI is thinking
```

### 16. TerminateSection
```
Props: { onTerminate: () => void, loading?: boolean, disabled?: boolean, severanceAmount?: number, signTransaction?: (xdr: string) => Promise<string> }
Render:
  - Card: bg-red-50 border border-red-200 rounded-xl p-6
  - Title: "Terminar contrato" Inter 600 16px text-red-800
  - Warning: "Esto liberará la indemnización al trabajador." Inter 400 14px text-red-600
  - If severanceAmount present: muestra "Indemnización a liberar: $X"
  - Confirmation pattern:
    - Default MVP: inline confirmation [Confirmar terminar?] [Cancelar]
    - Escalation path: alertdialog only if a UI-RFC explicitly requires extra destructive context
    - Confirm: triggers onTerminate, shows loading
    - Cancel: returns to default button
  - signTransaction: obtenida de WalletProvider context (opcional)
```

### 17. LoadingIndicator
```
Props: { text?: string }
Render:
  - 3 bouncing dots (8px circles, brand-primary, 0.4s stagger)
  - Optional text below: Inter 400 14px slate-400
  - Default text: "Procesando..."
  - Centered in parent container
```

### 18. SystemEventMessage
```
Props: { kind: 'contract-created' | 'deposit-received' | 'contract-terminated', title: string, body: string, timestamp?: string, pushDelivered?: boolean }
Render:
  - Bubble: bg-slate-100 border border-slate-200 rounded-2xl p-4 max-w-[85%] mx-auto
  - Variant is distinct from AI and user bubbles
  - Title: Inter 600 14px slate-800
  - Body: Inter 400 14px slate-700
  - Timestamp: Inter 400 12px slate-500
  - Optional status chip: "Notificado" when pushDelivered is true
  - Never framed as opinion or assistant advice
```

### 19. SuggestionChips
```
Props: { suggestions: string[], onSelect: (text: string) => void }
Render:
  - Container: flex flex-wrap gap-2 px-4 py-2
  - Chip: bg-white border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-600
  - Hover: bg-slate-50 border-slate-300
  - Click: sends text as user message, chips disappear
  - Animation: fadeIn stagger 100ms per chip
  - Used in: empty state chat (3 default suggestions)
```

### 20. HeroBalance
```
Props: { amount: number, label?: string }
Render:
  - Container: bg-white border-b border-slate-100 py-3 px-4
  - Amount: text-3xl font-bold text-[#1E3A5F]
  - Label: "dolares de ahorro" text-sm text-slate-500 mt-1
  - Animation: count-up on amount change (500ms, framer-motion useSpring)
  - Null state: hidden when amount is null/undefined
```

### 21. TxProgressSteps
```
Props: { steps: TxStep[], currentStep: number }
Type TxStep: { label: string, status: 'pending' | 'active' | 'done' | 'error' }
Render:
  - Container: flex flex-col gap-1 pl-2 mt-2
  - Done: "✔ {label}" text-emerald-600 text-sm
  - Active: "⏳ {label}" text-slate-600 text-sm, pulse animation
  - Pending: "○ {label}" text-slate-300 text-sm
  - Error: "✗ {label}" text-red-500 text-sm
  - Used inside chat after SignTxButton click
  - Steps: ["Wallet abierta", "Transaccion firmada", "Enviando a la red...", "Confirmado"]
```

### 22. ConfirmaGlow
```
Props: { active: boolean }
Render:
  - Overlay: fixed inset-0 z-50 pointer-events-none
  - Color: bg-emerald-500 opacity-0
  - When active: opacity-[0.05] for 300ms, then back to 0
  - Animation: framer-motion animate={{ opacity: [0, 0.05, 0] }} duration 0.3s
  - Used: triggers on every successful on-chain transaction
  - Placed in layout.tsx (global, not per-page)
```

## Dependencias de animacion
- `framer-motion`: ^11.0.0 (motion components, AnimatePresence, useSpring)
- Agregar a packages/frontend/package.json
