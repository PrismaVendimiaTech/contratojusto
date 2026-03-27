# 14 - Especificaciones UX: ContratoJusto

## Propósito
Especificaciones detalladas de las 3 pantallas críticas del demo path: Home, Chat Trabajador, Dashboard Empleador. Implementación-lista.

---

## Índice de pasos críticos y UI-RFC

La matriz operativa de traducción técnica vive en [10_uxui/UI-RFC-INDEX.md](./10_uxui/UI-RFC-INDEX.md). Los contratos técnicos derivados de esta UXS se escriben en `.docs/wiki/10_uxui/` y apuntan al frontend real del repo: `packages/frontend/`.

### Decisiones de consolidación 2026-03-26

- `Home` funciona como gate inteligente: aparece cuando falta wallet o rol resuelto en la sesión actual.
- El rol elegido se recuerda solo en estado de sesión. No se persiste por wallet ni en `localStorage`.
- Los eventos oficiales del trabajador usan burbuja gris de sistema dentro del chat y pueden complementarse con push.
- El dashboard del empleador, para el MVP, asume un solo contrato activo por wallet.
- Después de un retiro exitoso, el estado visible del balance queda actualizado o marcado como transferido; no desaparece sin rastro.

### Mapa rápido de contratos técnicos

| Paso crítico | UI-RFC objetivo | Estado |
|---|---|---|
| Entrada / app shell compartido | [10_uxui/UI-RFC-SHARED-APP-SHELL.md](./10_uxui/UI-RFC-SHARED-APP-SHELL.md) | Definido |
| Gate de rol y wallet | [10_uxui/UI-RFC-SHARED-ROLE-GATE.md](./10_uxui/UI-RFC-SHARED-ROLE-GATE.md) | Definido |
| Chat worker shell | [10_uxui/UI-RFC-WORKER-CHAT-SHELL.md](./10_uxui/UI-RFC-WORKER-CHAT-SHELL.md) | Definido |
| Consulta de balance | [10_uxui/UI-RFC-WORKER-BALANCE-QUERY.md](./10_uxui/UI-RFC-WORKER-BALANCE-QUERY.md) | Definido |
| Retiro y firma | [10_uxui/UI-RFC-WORKER-CLAIM-SIGN.md](./10_uxui/UI-RFC-WORKER-CLAIM-SIGN.md) | Definido |
| Eventos de sistema worker | [10_uxui/UI-RFC-WORKER-SYSTEM-EVENTS.md](./10_uxui/UI-RFC-WORKER-SYSTEM-EVENTS.md) | Definido |
| Dashboard employer shell | [10_uxui/UI-RFC-EMPLOYER-DASHBOARD-SHELL.md](./10_uxui/UI-RFC-EMPLOYER-DASHBOARD-SHELL.md) | Definido |
| Crear contrato | [10_uxui/UI-RFC-EMPLOYER-CREATE-CONTRACT.md](./10_uxui/UI-RFC-EMPLOYER-CREATE-CONTRACT.md) | Definido |
| Depositar | [10_uxui/UI-RFC-EMPLOYER-DEPOSIT.md](./10_uxui/UI-RFC-EMPLOYER-DEPOSIT.md) | Definido |
| Terminar contrato | [10_uxui/UI-RFC-EMPLOYER-TERMINATE-CONTRACT.md](./10_uxui/UI-RFC-EMPLOYER-TERMINATE-CONTRACT.md) | Definido |

---

## Especificación 1: Home - Selector de Rol

### Propósito
Pantalla de entrada cuando falta wallet o rol resuelto en la sesión actual. Debe permitir que el usuario elija si es empleador o trabajador y completar la conexión de wallet Stellar.

### Flujo de pantalla

```
ESTADO 1: Sin wallet conectada (primera carga)
─────────────────────────────────────────────

┌───────────────────────────────────┐
│                                   │ ← top padding 64px (safe area iOS)
│        🛡️  ContratoJusto          │ ← wordmark Inter 800, 32px, #1E3A5F
│                                   │
│    Derechos laborales             │ ← Inter 16px, text-slate-500, line-height 1.5
│    digitales                      │
│                                   │ ← gap 32px
│   ┌─────────────────────────────┐ │
│   │  👷  Soy Empleador          │ │ ← card: bg-white, border 1px #e2e8f0
│   │                             │ │   rounded-xl 12px, padding 24px
│   │  Crear contrato, depositar, │ │   cursor-pointer, hover shadow
│   │  gestionar pagos            │ │
│   │                             │ │
│   │   [  Conectar wallet  ]     │ │ ← button primary in-card, w-full
│   └─────────────────────────────┘ │
│                                   │ ← gap 16px
│   ┌─────────────────────────────┐ │
│   │  👤  Soy Trabajador         │ │ ← card similar
│   │                             │ │
│   │  Ver mi ahorro, hablar      │ │
│   │  con mi asesor, reclamar    │ │
│   │  dinero                     │ │
│   │                             │ │
│   │   [  Conectar wallet  ]     │ │
│   └─────────────────────────────┘ │
│                                   │ ← gap 40px
│  [   🔗  Conectar Wallet   ]       │ ← button secondary full-width
│                                   │   bg-slate-100, text-slate-700
│  Stellar Testnet (FL-1)            │ ← caption Inter 12px, text-slate-400
│                                   │ ← padding bottom 32px (safe area iOS)
└───────────────────────────────────┘


ESTADO 2: Wallet conectada
─────────────────────────────────────────────

┌───────────────────────────────────┐
│                                   │
│        🛡️  ContratoJusto          │
│                                   │
│    Derechos laborales             │
│    digitales                      │
│                                   │
│   ┌─────────────────────────────┐ │
│   │  👷  Soy Empleador          │ │
│   │                             │ │
│   │  Crear contrato, depositar, │ │
│   │  gestionar pagos            │ │
│   │                             │ │
│   │   [Ir a Dashboard]          │ │ ← button secondary in-card
│   └─────────────────────────────┘ │
│                                   │
│   ┌─────────────────────────────┐ │
│   │  👤  Soy Trabajador         │ │
│   │                             │ │
│   │  Ver mi ahorro, hablar      │ │
│   │  con mi asesor, reclamar    │ │
│   │  dinero                     │ │
│   │                             │ │
│   │   [Ir a Chat]               │ │ ← button secondary in-card
│   └─────────────────────────────┘ │
│                                   │
│  ✅ Conectada: GAB...X2K           │ ← inline status, text-green-600
│  [Cambiar wallet]                 │ ← link text-blue-600
│                                   │
│  Stellar Testnet (FL-1)            │
│                                   │
└───────────────────────────────────┘
```

### Propiedades de componentes

#### Wordmark
```
Tipografía:      Inter 800 (Bold)
Tamaño:          32px
Color:           #1E3A5F (slate-900)
Espacio:         tracking 0px (sin espaciado extra)
Ícono + texto:   💪 no, 🛡️ sí (escudo + ContratoJusto lado a lado)
Espaciado:       ícono 8px antes de texto
```

#### Subtitle
```
Tipografía:      Inter 400 (Regular)
Tamaño:          16px
Color:           #64748b (slate-500)
Line-height:     1.5
Max-width:       300px (para flujo natural)
Alignment:       center
```

#### Cards (rol selector)
```
Contenedor:      bg-white
Border:          1px solid #e2e8f0 (slate-200)
Border-radius:   rounded-xl (12px)
Padding:         24px (24px top-bottom, 20px left-right)
Sombra:          0 1px 2px rgba(0,0,0,0.05) (default)
Sombra hover:    0 4px 6px rgba(0,0,0,0.1) (slight elevation)
Cursor:          pointer (indicates clickable)
Gap interno:     12px (ícono + título), 8px (título + descripción), 16px (descripción + botón)

Ícono rol:       Emoji 32px (👷, 👤)
Título:          Inter 700, 18px, #1E3A5F
Descripción:     Inter 400, 14px, #64748b, line-height 1.4
Botón interno:   Secondary style, w-full
```

#### Buttons

**Primary (conectar wallet)**
```
Tipografía:      Inter 600, 16px
Color texto:     white
Color fondo:     #3b82f6 (blue-500)
Padding:         12px 24px
Border-radius:   rounded-lg (8px)
Sombra:          0 1px 3px rgba(0,0,0,0.1)
Hover:           #2563eb (blue-600), shadow lift
Active:          #1d4ed8 (blue-700)
Width:           full en cards, auto en footer
Transition:      all 200ms ease
```

**Secondary (cambiar wallet)**
```
Tipografía:      Inter 500, 14px
Color texto:     #3b82f6 (blue-600)
Color fondo:     transparent
Padding:         8px 16px
Border:          none
Cursor:          pointer
Hover:           text-blue-700
```

### Interacciones

#### Click en card "Soy Empleador" (sin wallet)
```
1. User toca la card
   → Card elevation sutil (box-shadow aumenta)
   → Transición 100ms

2. Si no hay wallet: botón "Conectar wallet" se anima (pulse suave)

3. User toca botón "Conectar wallet"
   → Wallet connect flow inicia
   → Loading: "Conectando..." en el botón

4. Post-conexión exitosa
   → Toast: "Wallet conectada" (verde, top-right, 3s auto-dismiss)
   → Card se actualiza: "Ir a Dashboard"
   → Router: /employer/dashboard
```

#### Click en card "Soy Trabajador" (sin wallet)
```
Similar a empleador, pero:
   → Router: /worker/chat
```

#### Click en botón "Cambiar wallet" (post-conexión)
```
1. User toca "Cambiar wallet"
2. Modal confirma: "¿Desconectar wallet actual?"
3. Si confirma:
   → Desconecta wallet
   → Página recarga a estado "sin wallet"
4. Si rechaza:
   → Modal cierra, nada cambia
```

### Estados especiales

**Loading de conexión**
```
Botón cambia a:
   "⏳ Conectando..." (texto, cursor wait)
   Deshabilitado (pointer-events: none)
   Duración: mientras la wallet está abierta
```

**Error de conexión**
```
Toast (rojo):
   "No se pudo conectar. Intenta de nuevo."
   Botón vuelve a "Conectar wallet"
   Permite reintentar
```

**Timeout (> 15 segundos sin respuesta)**
```
Toast (naranja):
   "¿Sigue abierta tu wallet?"
   [Cerrar] [Reintentar]
```

### Especificaciones de seguridad

- Wallet address se trunca a primeros 8 + últimos 4 caracteres: `GAB...X2K`
- Nunca mostrar private key en pantalla
- Botón "Cambiar wallet" requiere confirmación adicional
- No guardar wallet address en localStorage (solo en estado de sesión)
- Al volver a abrir la app, si la sesión sigue viva y el rol ya está resuelto, el gate puede enviar directo al flujo correspondiente sin pedir reelección

### Testing / Validación

**Casos a cubrir:**
- [ ] Primera carga sin wallet
- [ ] Reingreso con sesión activa y rol resuelto entra directo al flujo correspondiente
- [ ] Conexión exitosa de wallet
- [ ] Timeout en conexión (15s)
- [ ] Error de conexión (rechazo usuario)
- [ ] Cambio de wallet
- [ ] Desconexión
- [ ] Responsividad: 320px a 1280px
- [ ] Dark mode (si aplica)

---

## Especificación 2: Chat Trabajador (Fullscreen)

### Propósito
Interfaz principal para Carlos. Debe ser segura, clara, simple. Chat-first con integración de balance y acciones (retiro, consultas).

### Flujo de pantalla

```
LAYOUT BASE
─────────────────────────────────────────────

┌─────────────────────────────────────────────┐
│ 🛡️ ContratoJusto        [GAB...X2K] [⚙️]   │ ← header fijo, h-64px (16rem)
│ Status: Contrato activo                    │    bg-white, border-b 1px #e2e8f0
├─────────────────────────────────────────────┤
│                                             │
│   ┌─────────────────────────────────────┐  │
│   │ 🤖                                  │  │ ← AI bubble, animated fade-in
│   │ Bienvenido. Soy tu asesor de       │  │ ← bg-blue-50, rounded-lg
│   │ ContratoJusto. Preguntame lo que   │  │ ← max-width 80%, max-width 600px
│   │ necesites.                         │  │ ← padding 16px, margin 12px
│   └─────────────────────────────────────┘  │
│                                             │
│                    ┌─────────────────┐    │ ← user bubble, right align
│                    │ cuanto tengo?   │    │ ← bg-emerald-50, rounded-lg
│                    └─────────────────┘    │
│                                             │
│   ┌─────────────────────────────────────┐  │
│   │ 🤖                                  │  │ ← AI response con card inline
│   │ Tu ahorro está protegido:           │  │
│   │                                     │  │
│   │ ┌─────────────────────────────────┐│  │ ← BalanceCard
│   │ │ Ahorro               70 USD     ││  │   bg-white, border 2px #10b981
│   │ │ Indemnización        30 USD     ││  │   border-radius 8px, padding 16px
│   │ │ ─────────────────────────────── ││  │
│   │ │ Total               100 USD     ││  │
│   │ │ Actualizado hoy                 ││  │
│   │ └─────────────────────────────────┘│  │
│   └─────────────────────────────────────┘  │
│                                             │
│   ┌─────────────────────────────────────┐  │ ← Si hay XDR para firma
│   │ [⚡ Firmar transacción 🔐]         │  │   SignTxButton (warning color)
│   │ (esto abre tu wallet)              │  │   Importante: explicar qué es
│   └─────────────────────────────────────┘  │
│                                             │ ← flex-1 (messages container)
│   ┌─────────────────────────────────────┐  │ ← Loading indicator
│   │ 🤖 ...                              │  │   bouncing dots, text-slate-400
│   └─────────────────────────────────────┘  │
│                                             │ ← scroll area
├─────────────────────────────────────────────┤
│ [Escribi tu pregunta...]      📤 [⚙️]       │ ← input bar fijo, h-64px
│                                             │   bg-white, border-t 1px
└─────────────────────────────────────────────┘
```

### Propiedades de componentes

#### Header
```
Alto:            64px (64px h-16 en Tailwind)
Padding:         16px horizontal, 12px vertical
Border:          1px solid #e2e8f0 (bottom)
Bg:              white
Flex:            space-between align-center

Wordmark:        🛡️ + "ContratoJusto"
                 Inter 600, 16px, #1E3A5F
Wallet display:  Inter 400, 14px, #64748b
                 Ej: "GAB...X2K"
Settings:        ⚙️ icon, 20px, cursor-pointer
Status badge:    "Contrato activo" (opcional)
                 pequeño badge verde (8px padding)
```

#### Messages Container
```
Flex:            flex-1 (expande)
Overflow:        auto (scroll vertical)
Padding:         16px
Gap:             12px entre mensajes
Scroll behavior: smooth, auto-scroll al último mensaje
```

#### AI Message Bubble
```
Align:           left
Bg:              #f0f9ff (blue-50)
Border:          none
Border-radius:   rounded-lg (8px)
Padding:         16px
Max-width:       85% (max 600px)
Margin:          0 12px 12px 12px
Tipografía:      Inter 400, 16px, #1e293b
Line-height:     1.5
Avatar:          🤖 emoji 20px, left margin 8px

Animación:
  - Fade-in: 200ms ease-in
  - Slide-in: translateX(-20px) → 0
  - Timing: al aparecer

Dentro del bubble (si hay card): card tiene padding extra 4px bottom
```

#### User Message Bubble
```
Align:           right
Bg:              #f0fdf4 (emerald-50)
Border:          1px solid #d1fae5 (emerald-200)
Border-radius:   rounded-lg (8px)
Padding:         16px
Max-width:       85% (max 600px)
Margin:          0 12px 12px auto
Tipografía:      Inter 400, 16px, #1e293b
Line-height:     1.5

Animación:
  - Fade-in: 200ms ease-in
  - Slide-in: translateX(+20px) → 0
```

#### BalanceCard (inline en AI bubble)
```
Layout:          3 rows + 1 summary
Bg:              white
Border:          2px solid #10b981 (emerald-500)
Border-radius:   rounded-lg (8px)
Padding:         16px
Margin:          12px 0 0 0

Fila 1: Ahorro
  Etiqueta:      "Ahorro", Inter 500, 14px, #64748b
  Monto:         "70 USD", Inter 700, 20px, #10b981, monoespace

Fila 2: Indemnización
  Etiqueta:      "Indemnización", Inter 500, 14px, #64748b
  Monto:         "30 USD", Inter 700, 20px, #9ca3af, monoespace
  Nota pequeña:  "(se libera si termina contrato)", Inter 400, 12px, #9ca3af
  Nota sobre color: Per 12_UXI: gris neutral indica 'no inmediatamente disponible' vs verde para ahorro disponible

Divisor:         línea 1px #e5e7eb (full width card)

Fila 4: Total
  Etiqueta:      "Total", Inter 600, 14px, #1e293b
  Monto:         "100 USD", Inter 800, 22px, #1e293b, monoespace

Timestamp:       "Actualizado hoy", Inter 400, 12px, #9ca3af, right align, top 4px

Animación:
  - Aparece con fade-in 200ms
  - Números se "rellenan" con contador (0 → 70) en 600ms
```

#### SignTxButton
```
Estilo:          Warning / action button
Bg:              #f59e0b (amber-500)
Text:            white, Inter 600, 16px
Padding:         12px 24px
Border-radius:   rounded-lg (8px)
Width:           full (dentro del bubble)
Margin:          12px 0 0 0
Height:          44px (touch friendly)
Cursor:          pointer
Icon:            ⚡ emoji left de "Firmar"
Texto completo:  "⚡ Firmar transacción 🔐"

Hover:
  - Bg: #d97706 (amber-600)
  - Shadow: 0 4px 12px rgba(245, 158, 11, 0.3)

Active:
  - Bg: #92400e (amber-900)
  - Transform: scale(0.98)

Disabled (durante firma):
  - Opacity: 0.6
  - Cursor: not-allowed
  - Text: "Abriendo wallet..."

Nota debajo:
  - "(esto abre tu wallet)" - Inter 400, 12px, #9ca3af
```

#### Input Bar
```
Alto:            64px
Padding:         12px 16px
Border:          1px solid #e2e8f0 (top)
Bg:              white
Flex:            flex row, gap 8px
Sticky:          bottom, z-index 10

Input field:
  - Flex:        flex-1
  - Placeholder: "Escribi tu pregunta..."
  - Tipografía:  Inter 400, 16px
  - Border:      1px solid #e2e8f0
  - Border-r:    rounded-lg (8px)
  - Padding:     12px 16px
  - Height:      40px
  - Outline:     none
  - Focus:       border 2px #3b82f6, shadow 0 0 0 3px #dbeafe

Send button:
  - Icon:        📤 emoji
  - Size:        20px
  - Bg:          #3b82f6 (blue-500)
  - Padding:     12px (square)
  - Border-r:    rounded-lg (8px)
  - Cursor:      pointer
  - Disabled:    opacity 0.5 durante procesamiento

Settings:
  - Icon:        ⚙️ emoji
  - Size:        20px
  - Cursor:      pointer
  - Abre modal de settings (silencio, tema, etc.)
```

#### Loading Indicator (typing)
```
Estilo:          Bouncing dots
Animation:
  - Dot 1: scale 0.8 → 1 → 0.8 (0-0.6s)
  - Dot 2: delay 200ms
  - Dot 3: delay 400ms
  - Loop infinito

Color:           #9ca3af (slate-400)
Dentro de:       AI message bubble
Ej: "🤖 ..."
```

### Interacciones detalladas

#### Flujo: Usuario pregunta "cuanto tengo?"

```
1. User toca input, escribe "cuanto tengo?"
   → Input activo (border azul, cursor visible)
   → Texto aparece mientras escribe

2. User toca botón enviar (📤)
   → Mensaje "cuanto tengo?" aparece en bubble verde derecha
   → Input se limpia
   → Focus regresa a input (opcional)
   → Scroll automático al último mensaje

3. AI está procesando
   → Nueva AI bubble aparece de golpe con "🤖 ..."
   → Loading animation: dots animados
   → Timing: <500ms cached, <2s AI simple, <3s con tools. Si >3s: mostrar "El asistente está procesando..."

4. AI responde
   → Bubble se actualiza (dots desaparecen)
   → Texto aparece: "Tu ahorro está protegido:"
   → Card Balance aparece debajo con fade-in 200ms
   → Números se "rellenan" con contador (0 → 70, 0 → 30)
   → Scroll automático al latest

5. User puede seguir preguntando o actuar
   → Si pregunta: regresa a paso 1
   → Si quiere retirar: debe escribir "quiero sacar"
```

#### Flujo: Usuario quiere retirar dinero

```
1. User: "quiero sacar mi ahorro"
   → Sigue el flujo de pregunta normal

2. AI responde
   → "Perfecto. Tenés $210 ahorrados."
   → "Voy a preparar la transacción para que la firmes."
   → [SignTxButton: "⚡ Firmar transacción 🔐"]
   → "(esto abre tu wallet)"

3. User toca SignTxButton
   → Button se disablediza: text "Abriendo wallet..."
   → Wallet app abre (launch URL handler)
   → XDR se muestra en la wallet

4. User aprueba en la wallet
   → Vuelve a app ContratoJusto
   → New AI bubble aparece: "... (loading)"
   → Stellar network procesa (5-15 segundos)

5. AI confirma resultado
   → Si éxito: "✅ Listo. 210 dólares transferidos a tu wallet."
   → Check verde animado (400ms pulse)
   → BalanceCard queda visible con estado actualizado o etiqueta "Transferido"
   → Input listo para siguiente pregunta

   → "⚠️  La transaccion tardo mas de lo esperado. Tus fondos estan seguros. Queres reintentar?"
   → [Reintentar]
   → SignTxButton sigue disponible
```


#### Flujo: Manejo de errores con "calmo-seguro"

**Error de transacción (timeout/falla):**
```
→ "⚠️  La transaccion tardo mas de lo esperado. Tus fondos estan seguros. Queres reintentar?"
→ [Reintentar] [Mas tarde]
→ SignTxButton disponible para reintentar
```

**Error de red (conexión lenta):**
```
→ "⚠️  La red esta respondiendo lento. No te preocupes, tus fondos estan protegidos. Intenta en un momento."
→ [Reintentar]
→ Opción de offline: "Puedes intentar más tarde"
```

**Mensaje clave:** Nunca decir "error" o "fallo". Siempre incluir garantía sobre fondos.

#### Flujo: Notificación de depósito

```
1. Patrón deposita USDC en Stellar
   → Smart contract/backend lo detecta

2. Push notification en app de Carlos
   → "Tu patrón depositó $100" (silencioso si mute on)
   → Sonido suave (ding) si sonido on

3. User abre app
   → Chat se actualiza con nuevo mensaje del AI
   → "Tu patron transfirió $100. Ahorro +$70, indemnización +$30."
   → Card aparece con breakdown: Ahorro +70, Indemn +30

4. Balance actualizado globalmente
   → Si user había preguntado "cuanto tengo?" antes
   → Card vieja se actualiza (no reload full, solo cambio números)
```

### Respuestas de ejemplo del AI

#### Query: "cuanto tengo?"
```
🤖: Tu ahorro está protegido:

[BalanceCard]
Ahorro                70 USD
Indemnización         30 USD
─────────────────────────────
Total                100 USD
Actualizado hoy

¿Necesitás algo más?
```

#### Query: "quiero sacar mi ahorro"
```
🤖: Perfecto. Tenés $210 ahorrados.

Voy a preparar la transacción para
que la firmes con tu wallet.

[SignTxButton: "⚡ Firmar transacción 🔐"]
(esto abre tu wallet)

Una vez que apruebes en la wallet,
el dinero llegará a tu wallet.
```

#### Query: "cuanto tiempo tarda?"
```
🤖: Una transacción típicamente toma
3-15 segundos en completarse.

Yo te aviso cuando esté listo.
```

#### Query: algo que no entiende
```
🤖: No entendí bien.

¿Quisiste preguntar por:
- Mi ahorro
- Sacar dinero
- Mi contrato

O escribi tu pregunta de otra forma.
```

### Especificaciones de accesibilidad

- aria-label en botones: "Firmar transacción", "Enviar mensaje"
- Colores: contraste mínimo AA (WCAG 2.1)
- Tamaño texto: mínimo 16px (font base)
- Touch targets: mínimo 44x44px (botones)
- Scroll accessible sin JS (fallback)
- Teclado: Tab navega input → enviar → settings

### Testing / Validación

**Casos a cubrir:**
- [ ] Primer mensaje bienvenida aparece
- [ ] User puede escribir y enviar
- [ ] AI responde en < 3s
- [ ] Balance card se renderiza correctamente
- [ ] SignTxButton abre wallet
- [ ] Post-firma se actualiza balance
- [ ] Notificaciones empujan mensajes nuevos
- [ ] Scroll automático al fondo
- [ ] Responsive: 320px a 1280px
- [ ] Navegación con teclado (Tab, Enter)

---

## Especificación 3: Dashboard Empleador

### Propósito
Interfaz para el patrón. Debe permitir crear contrato, depositar USDC, y terminar contrato. Información clara y acciones irreversibles con confirmación.

### Flujo de pantalla

```
ESTADO 1: Sin contrato creado
─────────────────────────────────────────────

┌─────────────────────────────────────────────┐
│ 🛡️ ContratoJusto        [GAB...X2K] [⚙️]   │ ← header idéntico a chat
│ Dashboard de Empleador                     │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ 📋 Crear contrato                   │   │ ← card blanca, border
│ │                                     │   │   padding 24px, gap 16px
│ │ Dirección trabajador:               │   │
│ │ [_____________________________]      │   │ ← input address, monospace
│ │                                     │   │
│ │ % para ahorro:                      │   │
│ │ [__70__]  % [__30__] % indemn.      │   │ ← input numericos con labels
│ │                                     │   │
│ │ Preview:                            │   │
│ │ • De cada $100, $70 → ahorro        │   │ ← preview en bullets
│ │ • De cada $100, $30 → indemnización │   │
│ │                                     │   │
│ │  [  Crear contrato  ]               │   │ ← button primary
│ │                                     │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ ℹ️ Ayuda                             │   │ ← card info
│ │                                     │   │ ← bg-blue-50, border-l 4px blue
│ │ La dirección del trabajador es su   │   │
│ │ wallet Stellar (comienza con G).    │   │
│ │                                     │   │
│ │ Si no la conoces, pidele que te la  │   │
│ │ pase por WhatsApp.                  │   │
│ │                                     │   │
│ └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘


ESTADO 2: Contrato activo
─────────────────────────────────────────────

┌─────────────────────────────────────────────┐
│ 🛡️ ContratoJusto        [GAB...X2K] [⚙️]   │
│ Dashboard de Empleador                     │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ ✅ Contrato activo                   │   │ ← status card, bg-green-50
│ │                                     │   │   border-l 4px green
│ │ Trabajador:                         │   │
│ │ GAB...X2K                           │   │ ← address truncado, mono
│ │                                     │   │
│ │ Split de pagos:                     │   │
│ │ • 70% → Ahorro                      │   │
│ │ • 30% → Indemnización               │   │
│ │                                     │   │
│ │ Depósitos registrados: 3            │   │
│ │ Total depositado: $300 USDC         │   │
│ │                                     │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ 💰 Depositar USDC                   │   │ ← deposit form
│ │                                     │   │ ← bg-white, border
│ │ Monto:                              │   │   padding 24px
│ │ [_____________________] USDC        │   │ ← input number
│ │                                     │   │
│ │ Preview del split:                  │   │
│ │ Si depositas $100:                  │   │
│ │ → $70 irán a ahorro                 │   │
│ │ → $30 irán a indemnización          │   │
│ │                                     │   │
│ │  [   Depositar   ]                  │   │ ← button primary
│ │                                     │   │
│ │ Nota: Esto requerirá firma en tu    │   │ ← small text, muted
│ │ wallet conectada                    │   │
│ │                                     │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ ⚠️  Terminar contrato                │   │ ← danger card
│ │                                     │   │ ← bg-red-50, border-l 4px red
│ │ Esto liberará la indemnización al   │   │   padding 24px
│ │ trabajador inmediatamente.          │   │
│ │                                     │   │
│ │ El trabajador recibirá:             │   │
│ │ • Su indemnización: $30 USDC        │   │ ← mostrar cantidad exacta
│ │                                     │   │
│ │  [  Terminar contrato  ]            │   │ ← button danger (rojo)
│ │                                     │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ Historial de depósitos                     │
│ ┌─────────────────────────────────────┐   │
│ │ 27 Mar 2026 | $100 | ✅ Confirmado  │   │ ← timeline simple
│ │ 20 Mar 2026 | $100 | ✅ Confirmado  │   │   bordes, timestamps
│ │ 13 Mar 2026 | $100 | ✅ Confirmado  │   │
│ └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘


ESTADO 3: Contrato terminado
─────────────────────────────────────────────

┌─────────────────────────────────────────────┐
│ 🛡️ ContratoJusto        [GAB...X2K] [⚙️]   │
│ Dashboard de Empleador                     │
├─────────────────────────────────────────────┤
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ ❌ Contrato terminado                │   │ ← status card, bg-slate-50
│ │    (28 Mar 2026)                    │   │   border-l 4px gray
│ │                                     │   │
│ │ Trabajador:                         │   │
│ │ GAB...X2K                           │   │
│ │                                     │   │
│ │ Total depositado: $300 USDC         │   │
│ │ Indemnización liberada: $30 USDC    │   │ ← muestra lo que paso
│ │ Fecha cierre: 28 Mar 2026           │   │
│ │                                     │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ Historial de depósitos                     │
│ ┌─────────────────────────────────────┐   │
│ │ 27 Mar 2026 | $100 | ✅ Confirmado  │   │
│ │ 20 Mar 2026 | $100 | ✅ Confirmado  │   │
│ │ 13 Mar 2026 | $100 | ✅ Confirmado  │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ + Crear nuevo contrato              │   │ ← link a crear uno nuevo
│ │ (con otro trabajador)               │   │
│ └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```


### Estados de transicion (in-flight)

**Creando contrato:**
- Form se deshabilita
- Boton cambia a "Creando contrato..." con spinner
- Wallet abre para firma
- Post-firma: toast verde "Contrato creado", dashboard actualiza

**Depositando:**
- Input + boton se deshabilitan
- Boton: "Depositando..." con spinner
- Wallet abre para firma
- Post-firma: toast verde "Deposito registrado. Ahorro +$X, indemnización +$Y"

**Terminando contrato:**
- Boton rojo deshabilitado: "Terminando..."
- Wallet abre para firma
- Post-firma: toast azul "Contrato terminado. indemnización liberada al trabajador."
- Dashboard cambia a estado "Terminado"

**Notificaciones (Chat del trabajador):**
- Cuando empleador deposita: AI envia mensaje sistema "Tu patron transfirió $100. Ahorro +$70, indemnización +$30."
- Cuando empleador termina: AI envia "Tu contrato fue terminado. Recibiste $30 de indemnizacion en tu wallet."
- Mensajes de sistema usan fondo gris (#f3f4f6) en vez de azul claro
### Propiedades de componentes

#### Status Card (activo)
```
Bg:              #f0fdf4 (green-50)
Border-left:     4px solid #10b981 (green-500)
Border-radius:   rounded-lg (8px)
Padding:         24px
Margin:          0 0 20px 0

Ícono estado:    ✅ emoji, 20px
Título:          "Contrato activo", Inter 700, 18px, #059669
Dirección:       monospace Inter 400, 14px, #64748b
                 Ej: "GAB8GZGXSQXBKYLUFEHXJ4Y5RWBKQLHNMDX7GDDFCFVT5ZKXPBX2K"
                 Truncado en UI: "GAB...X2K"

Items:
  Layout:        bullet list (•)
  Tipografía:    Inter 500, 14px, #1e293b
  Color bullet:  #10b981
  Gap:           8px entre items

Totales:
  Tipografía:    Inter 600, 16px, #1e293b
  Peso visual:   destacado con color más oscuro
  Moneda:        siempre USDC explícito
```

#### Deposit Form Card
```
Bg:              white
Border:          1px solid #e2e8f0
Border-radius:   rounded-lg (8px)
Padding:         24px
Gap:             16px entre elementos

Título:          "💰 Depositar USDC", Inter 700, 18px, #1e293b

Input monto:
  Label:         "Monto:", Inter 500, 14px, #64748b
  Field:         Inter 400, 16px
  Placeholder:   "Ej: 100"
  Type:          number, min 0, step 0.01
  Ancho:         ~300px o full en mobile
  Suffix:        "USDC" inline text gris

Preview:
  Título:        "Preview del split:", Inter 500, 14px, #64748b
  Items:         bullets con cálculo automático
  Actualización: en tiempo real mientras escribe
  Ej: "Si depositas $100: → $70 irán a ahorro, → $30 irán a indemn."
  Colores:       ahorro verde (#10b981), indemn azul (#1e40af)

Button:
  Estilo:        Primary
  Text:          "Depositar"
  Width:         full en desktop, constrained en mobile

Nota:
  Tipografía:    Inter 400, 12px, #9ca3af
  Contenido:     "Nota: Esto requerirá firma en tu wallet"
  Margin:        top 12px, gris muted
```

#### Termination Card (rojo/peligro)
```
Bg:              #fef2f2 (red-50)
Border-left:     4px solid #ef4444 (red-500)
Border-radius:   rounded-lg (8px)
Padding:         24px
Margin:          20px 0 0 0

Ícono:           ⚠️ emoji, 20px
Título:          "Terminar contrato", Inter 700, 18px, #991b1b
Advertencia:     "Esto liberará la indemnización al trabajador inmediatamente."
                 Inter 500, 15px, #7f1d1d

Monto indemn:    "El trabajador recibirá: • Su indemnización: $30 USDC"
                 Inter 600, 15px, #1e293b
                 Rojo suave: #fca5a5 como fondo

Button:
  Estilo:        Danger (rojo)
  Text:          "Terminar contrato"
  Bg:            #ef4444
  Hover:         #dc2626
  Active:        #991b1b
  Width:         full o constrained
  Height:        44px
```

#### Historial (Timeline)
```
Contenedor:      bg-white, border, rounded-lg, padding 24px

Items:
  Layout:        grid con columnas: fecha | monto | estado
  Tipografía:    Inter 400, 14px, #64748b
  Fecha:         "27 Mar 2026"
  Monto:         "$100"
  Estado badge:  "✅ Confirmado" (verde), "⏳ Pendiente" (gris)

  Separadores:   línea 1px #e5e7eb entre items

Orden:           descendente (más reciente primero)
```

### Interacciones detalladas

#### Crear contrato

```
1. User está en pantalla crear contrato
   → Form con 3 inputs: address, % ahorro, % indemn

2. User pega address trabajador
   → Input se valida (comienza con G, longitud correcta)
   → Si inválida: error inline "Dirección inválida"
   → Si válida: OK silencioso

3. User ajusta porcentajes
   → Default: 70 ahorro, 30 indemn
   → Suma debe ser 100% (validación)
   → Si suma != 100: warning "La suma debe ser 100%"
   → Si válido: preview se actualiza en tiempo real

4. User toca "Crear contrato"
   → Button se disablediza: "Creando..."
   → Wallet abre (crear contrato TX)
   → User aprueba firma

5. Post-firma exitosa
   → Toast verde: "Contrato creado exitosamente"
   → Dashboard se recarga
   → Ahora muestra ESTADO 2 (contrato activo)
   → Puede empezar a depositar

6. Si error
   → Toast rojo: "No se pudo crear contrato"
   → [Reintentar]
```

#### Depositar USDC

```
1. User ingresa monto
   → Preview se actualiza live
   → Ej: 100 → "Si depositas $100: $70 ahorro, $30 indemn"

2. User toca "Depositar"
   → Button disablediza: "Procesando..."
   → Wallet abre con TX de depósito
   → User aprueba en la wallet

3. Post-firma
   → Button re-habilita
   → Toast verde: "Depósito registrado"
   → Input se limpia
   → Historial se actualiza (new item arriba)
   → Status card: total actualizado

4. Si error
   → Toast rojo: "No se pudo completar depósito"
   → [Reintentar]
   → Input mantiene valor
```



#### Terminar contrato

```
1. User toca botón rojo "Terminar contrato"
   → Botón cambia inline a [Confirmar terminar?] [Cancelar]
   → No hay modal

2. INLINE CONFIRMATION STATE
   Botones lado a lado en la misma TerminateSection:
   [Confirmar terminar?] [Cancelar]

3. Si cancela (click Cancelar)
   → Botones vuelven a estado inicial: [Terminar contrato]
   → Dashboard sin cambios

4. Si confirma (click Confirmar terminar?)
   → Botones se deshabilitan: "Terminando..."
   → Wallet abre con TX de terminación
   → User aprueba en la wallet

5. Post-firma exitosa
   → Toast: "✅ Contrato terminado. Indemnización liberada."
   → Dashboard se actualiza a ESTADO 3 (terminado)
   → TerminateSection desaparece completamente
   → Status card muestra "Terminado" gris
   → Link para crear nuevo contrato aparece

6. Si error
   → Toast rojo: "No se pudo terminar contrato"
   → Botones vuelven a estado inicial: [Terminar contrato]
   → [Reintentar] disponible en Toast
```
#### Auto-refresh

```
Dashboard se actualiza cada 10 segundos (polling)
  → Chequea estado del contrato
  → Actualiza historial de depósitos
  → Actualiza totales sin reload full page

Si cambio detectado:
  → UI se actualiza smoothly (transiciones)
  → Toast suave: "Actualizado"
  → No interrumpe si user está escribiendo
```

### Especificaciones de validación

| Campo | Validación | Error message |
|-------|-----------|---|
| Address | Comienza con G, 56 caracteres | "Dirección Stellar inválida" |
| Monto depósito | > 0, ≤ saldo en wallet | "Monto inválido o fondos insuficientes" |
| Porcentaje ahorro | 0-100, suma = 100 | "La suma debe ser 100%" |

### Especificaciones de accesibilidad

- Botón rojo tiene aria-label explícito: "Terminar contrato - acción destructiva"
- Modal de confirmación usa role="alertdialog"
- Inputs tienen labels explícitos (no placeholder only)
- Colores: contraste AA mínimo
- Touch targets: 44x44px mínimo

### Testing / Validación

**Casos a cubrir:**
- [ ] Crear contrato sin wallet → error
- [ ] Validación address invalid
- [ ] Preview actualiza en tiempo real
- [ ] Crear contrato exitoso → wallet abre
- [ ] Depósito exitoso → historial se actualiza
- [ ] Terminar contrato → modal de confirmación
- [ ] Cierre exitoso → estado cambia a "Terminado"
- [ ] Errores de red → retry funciona
- [ ] Auto-refresh cada 10s
- [ ] Responsive: 320px a 1280px

---

## Notas finales sobre implementación

### Stack recomendado
- Frontend: React/Next.js
- Styling: Tailwind CSS (presets de colores de spec)
- State: React Query (polling, refresh)
- Blockchain: Stellar SDK, Stellar Wallets Kit
- Chat AI: Streaming SSE, loading states
- Database: Supabase o similar (para historial)

### Conversión de spec a código
1. Crear componentes Tailwind atómicos (Button, Card, Input, Badge)
2. Componer en layouts por pantalla
3. Añadir interacciones con event handlers
4. Integrar wallet adapter para transacciones
5. Implementar polling/real-time updates
6. Agregar tests (Vitest, React Testing Library)

### Notas de performance
- Lazy load images (emojis inline, no)
- Virtualizar listas largas si > 50 items
- Debounce input de monto (500ms)
- Cache respuestas AI por 5 minutos
- Preconnect de wallet y endpoints API

### Dark mode (opcional)
Si se implementa:
- Adjust: bg-white → bg-slate-900
- Adjust: text-slate-700 → text-slate-200
- Adjust: borders #e2e8f0 → #334155
- Keep colores de estado (verde, rojo, azul)
