# 10 - Lineamientos de Interfaz Visual: ContratoJusto

## Propósito

Traducir el manifiesto de marca y la identidad visual en reglas de interfaz reutilizables. Este documento es la guía técnica para constructores de UI/componentes.

## Approach de diseño

- **Mobile-first**: diseño comienza en 375px (mobile), se expande responsivamente
- **Target device**: Android gama baja-media (Samsung Galaxy A14, 6.6", 1080x2412px)
- **Viewport primario**: 375-414px (mobile), 768px (tablet), 1024px (desktop)
- **Máximo 1 columna en mobile**: no hay layouts de 2 columnas
- **Mínimo scroll horizontal**: nunca scroll horizontal en mobile
- **Touch targets mínimos**: 44x44px (WCAG AAA)

## Estructura de layout general

```
┌─────────────────┐
│  HEADER FIJO    │ 64px (logo + wallet connect)
├─────────────────┤
│                 │
│  BODY (scroll)  │ flex-1, overflow-y-auto
│                 │
├─────────────────┤
│  FOOTER STICKY  │ 60px (input bar chat) [solo chat]
└─────────────────┘
```

**Especificaciones**:
- Header: `fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50`
- Body: `pt-16 pb-4` (offset para header fijo)
- Footer (chat): `fixed bottom-0 left-0 right-0 h-15 bg-white border-t border-slate-200 z-40`
- No hay sidebar en mobile
- No hay footer permanente

## Navegación

**Estructura de pantallas** (3 pantallas solamente):

1. **Home**: Selector de rol
   - Funciona como gate inteligente, no como landing obligatoria en cada apertura
   - Botón "Empleador"
   - Botón "Trabajador"
   - Sin header persistente, solo logo centrado
   - Si la sesión ya resolvió rol + wallet, el sistema puede entrar directo al flujo correspondiente

2. **Empleador**: Dashboard única pantalla
   - Header con logo + wallet connect
   - Contenido con scroll vertical
   - Botón para crear contrato

3. **Trabajador**: Chat fullscreen
   - Header con logo + wallet connect + saldo
   - Área de mensajes (scroll vertical)
   - Input bar fijo al pie

**Navegación técnica**:
- No hay tabs
- No hay menu hamburguesa
- No hay navegación por drawer
- Back: usar browser back button
- Sin rutas anidadas

## Cards (componente reutilizable)

```
┌──────────────────────┐
│  Card content (16px) │
└──────────────────────┘
```

**Especificaciones**:
- Background: `bg-white`
- Border: `border border-slate-200`
- Border radius: `rounded-xl` (12px)
- Padding: `p-4` (16px)
- Shadow: `shadow-sm`
- Margin bottom: `mb-4`

**Tipos de cards**:
- **BalanceCard**: muestra saldo con icono de billetera
- **ContractStatusCard**: estado de contrato activo
- **TransactionCard**: historial de transacciones
- **DepositFormCard**: formulario de depósito

**Ejemplo HTML**:
```html
<div class="bg-white border border-slate-200 rounded-xl p-4 shadow-sm mb-4">
  <h3 class="text-slate-800 font-semibold mb-2">Tu saldo</h3>
  <p class="text-2xl font-bold text-emerald-500">$70</p>
</div>
```

## Botones (componente reutilizable)

### Primary Button
```
┌───────────────────┐
│   CONFIRMAR       │
└───────────────────┘
```
- Background: `bg-[#1E3A5F]`
- Text: `text-white font-medium`
- Border radius: `rounded-lg`
- Padding: `px-6 py-3` (48px min height)
- Hover: `hover:bg-slate-900` (oscurecer ligeramente)
- Active: `active:scale-95`
- Disabled: `disabled:opacity-50 disabled:cursor-not-allowed`

### Secondary Button
```
┌───────────────────┐
│   CANCELAR        │
└───────────────────┘
```
- Background: `bg-transparent`
- Border: `border-2 border-[#1E3A5F]`
- Text: `text-[#1E3A5F] font-medium`
- Border radius: `rounded-lg`
- Padding: `px-6 py-3`
- Hover: `hover:bg-slate-50`

### Accent Button (firmar contrato)
```
┌───────────────────┐
│   FIRMAR          │
└───────────────────┘
```
- Background: `bg-amber-500`
- Text: `text-white font-bold`
- Border radius: `rounded-lg`
- Padding: `px-6 py-3`
- Hover: `hover:bg-amber-600`
- Solo para acciones críticas (firmar transacciones)

### Danger Button (eliminar, rechazar)
- Background: `bg-red-500`
- Text: `text-white font-medium`
- Border radius: `rounded-lg`
- Padding: `px-6 py-3`
- Hover: `hover:bg-red-600`

**Reglas generales**:
- Mínimo touch target: `h-12` (48px)
- Width: generalmente `w-full` en mobile
- Nunca desahabilitados sin razón clara
- Siempre mostrar loading state mientras se procesa

## Inputs (componente reutilizable)

```
├─ Label (Caption 14px)
│
├─ Input box
│ ┌─────────────────────┐
│ │ placeholder text   │
│ └─────────────────────┘
│
└─ Helper text (Small 12px, slate-500)
```

**Especificaciones**:
- Border: `border border-slate-300`
- Border radius: `rounded-lg`
- Padding: `px-4 py-3` (44px min height)
- Placeholder: `placeholder-slate-400`
- Focus: `ring-2 ring-[#1E3A5F] border-transparent`
- Background: `bg-white`

**Estados**:

| Estado | Border | Ring | Texto de error |
|---|---|---|---|
| Normal | slate-300 | ninguno | — |
| Focus | transparent | 2px azul marino | — |
| Error | red-500 | 2px red-500 | text-red-500 pequeño debajo |
| Disabled | slate-200 | ninguno | opacity-50 |

**Ejemplo HTML**:
```html
<div class="mb-4">
  <label class="block text-sm font-medium text-slate-700 mb-2">
    Tu nombre
  </label>
  <input
    type="text"
    placeholder="Juan Pérez"
    class="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent"
  />
  <p class="text-xs text-slate-500 mt-1">Usa tu nombre completo</p>
</div>
```

## Chat (componente principal)

**Layout**:
```
┌─────────────────────────────┐
│      HEADER                 │ fixed
├─────────────────────────────┤
│                             │
│  Messages area (scroll)     │ flex-1
│                             │
├─────────────────────────────┤
│  Input bar + Send button    │ fixed bottom
└─────────────────────────────┘
```

**Container chat**:
- `flex flex-col h-screen`
- Messages: `flex-1 overflow-y-auto p-4`
- Input: `fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4`

**AI Message Bubble**:
- Background: `bg-blue-50`
- Border radius: `rounded-2xl rounded-bl-sm` (esquina inferior izquierda aguda)
- Padding: `p-4`
- Max width: `max-w-[85%]`
- Alignment: `ml-0` (izquierda)
- Font: 16px normal, text-slate-800
- Texto: de 1 a 3 líneas típicamente

**User Message Bubble**:
- Background: `bg-emerald-50`
- Border radius: `rounded-2xl rounded-br-sm` (esquina inferior derecha aguda)
- Padding: `p-4`
- Max width: `max-w-[85%]`
- Alignment: `ml-auto` (derecha)
- Font: 16px normal, text-slate-800

**System Message Bubble**:
- Background: `bg-slate-100`
- Border: `border border-slate-200`
- Border radius: `rounded-2xl`
- Padding: `p-4`
- Max width: `max-w-[85%]`
- Alignment: `mx-auto`
- Font: 14-16px, text-slate-700
- Uso: eventos oficiales del sistema (contrato creado, depósito, terminación)

**Input Bar**:
```
┌──────────────────────────────────────┐
│ [input field]     [send button]      │
└──────────────────────────────────────┘
```
- `flex gap-3 items-end`
- Input: `flex-1` class
- Send button: Icono `Send` de Lucide (24px)

**Sign Transaction Button** (inline, dentro del chat):
- Aparece en un mensaje AI que contiene el XDR
- Background: `bg-amber-500`
- Text: "FIRMAR CONTRATO" o "CONFIRMAR TRANSFERENCIA"
- Font: bold
- Ancho: `w-full` dentro del bubble

**Ejemplo estructura HTML**:
```html
<div class="flex flex-col h-screen">
  <!-- Header: 64px -->
  <header class="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center px-4">
    <h1 class="font-bold text-lg text-slate-800">ContratoJusto</h1>
  </header>

  <!-- Messages area -->
  <div class="flex-1 overflow-y-auto p-4 pt-20">
    <!-- AI message -->
    <div class="flex mb-4">
      <div class="bg-blue-50 rounded-2xl rounded-bl-sm p-4 max-w-[85%]">
        <p class="text-slate-800">Hola, soy tu asesor. ¿En qué puedo ayudarte?</p>
      </div>
    </div>

    <!-- User message -->
    <div class="flex justify-end mb-4">
      <div class="bg-emerald-50 rounded-2xl rounded-br-sm p-4 max-w-[85%]">
        <p class="text-slate-800">Quiero ver mi saldo</p>
      </div>
    </div>
  </div>

  <!-- Input bar: fixed bottom -->
  <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4">
    <div class="flex gap-3 items-end">
      <input
        type="text"
        placeholder="Escribí tu pregunta..."
        class="flex-1 border border-slate-300 rounded-lg px-4 py-3"
      />
      <button class="p-3 text-[#1E3A5F]">
        <!-- Send icon -->
      </button>
    </div>
  </div>
</div>
```

## Feedback y estados

### Loading state
- **Spinner**: SVG animado (rotación infinita) en color azul marino
- **Texto**: "Procesando..." o "Esperando confirmación..." debajo
- **Duración**: nunca mayor a 30 segundos
- **No usar**: skeleton screens en MVP

### Success state
- **Toast**: notificación en la esquina superior derecha
- **Background**: `bg-green-500`
- **Icon**: `CheckCircle` de Lucide
- **Texto**: "Listo" o "Completado"
- **Auto-dismiss**: 3 segundos, fade out
- **No duplicar**: máximo 1 toast por operación

### Error state
- **Toast**: notificación en la esquina superior derecha
- **Background**: `bg-red-500`
- **Icon**: `AlertCircle` de Lucide
- **Texto**: "Algo salió mal" + detalle técnico en texto menor
- **No auto-dismiss**: el usuario debe cerrar
- **Ejemplo**: "Algo salió mal: saldo insuficiente"

### Transaction pending state
- **Spinner** + Texto: "Esperando confirmación de la red..."
- **Color**: azul marino
- **Ubicación**: dentro del mensaje del chat
- **Duración**: 5-45 segundos según confirmación Stellar

## Responsividad

**Breakpoints**:

| Device | Width | Padding | Font base |
|---|---|---|---|
| Mobile | 375px | 16px | 16px |
| Tablet | 768px | 20px | 16px |
| Desktop | 1024px | 24px | 16px |

**Cambios por breakpoint**:
- Mobile → Tablet: aumentar padding a 20px
- Mobile → Desktop: aumentar padding a 24px, cards pueden ser más anchas
- En tablet y desktop: máximo 2 columnas (empleador dashboard)

**Ejemplos Tailwind**:
```html
<div class="px-4 md:px-5 lg:px-6">
  <!-- Padding responsive -->
</div>

<div class="w-full md:max-w-2xl lg:max-w-4xl mx-auto">
  <!-- Width responsivo con máximo -->
</div>
```

## Accesibilidad (mínima, hackathon)

**Obligatorio**:
- ✅ Contraste AA en todos los textos (verificar con WebAIM)
- ✅ Touch targets mínimo 44x44px
- ✅ Labels en todos los inputs (`<label for="id">`)
- ✅ aria-label en iconos sin texto ("Enviar mensaje", "Copiar dirección")
- ✅ Color + otro indicador (no solo color para estados)

**Ejemplo**:
```html
<input id="email" type="email" aria-label="Tu correo electrónico" />

<button aria-label="Enviar mensaje">
  <SendIcon />
</button>
```

**No implementar (post-MVP)**:
- Keyboard navigation avanzada
- Modo alto contraste
- Texto a escala variable
- Soporte screen reader completo

## Microinteracciones y animaciones

### Referente visual
Wise base (flat, limpio, whitespace generoso) + toques Linear (gradiente sutil header, blur leve chat bg).

### Dependencia
- `framer-motion` para animaciones (50KB gzip)

### Catalogo de animaciones

| Elemento | Animacion | Duracion | Detalle |
|---|---|---|---|
| Boton click | scale(0.97) → spring back | 150ms | `whileTap={{ scale: 0.97 }}` |
| Chat mensaje nuevo | slideUp + fadeIn | 200ms | `initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}` |
| Balance hero number | count-up from previous to new | 500ms | Incremento numerico animado |
| Balance update | number cascade (numeros caen desde arriba) | 600ms | Digitos individuales slide-down con stagger 50ms |
| Transicion de pagina | fade | 200ms | `AnimatePresence` con fade |
| Tx confirmada - glow | flash verde pantalla completa | 300ms | `bg-emerald-500 opacity-[0.05]` overlay fullscreen |
| Tx confirmada - check | scale + rotate del icono check | 400ms | `scale: [0, 1.2, 1], rotate: [0, -10, 0]` |
| Loading skeleton | shimmer left-to-right | 1500ms loop | Gradiente animado sobre bg-slate-200 |
| Toast entrada | slideIn from right | 300ms | `initial={{ x: 100 }} animate={{ x: 0 }}` |
| Toast salida | fadeOut | 200ms | Auto-dismiss 3 segundos |

### Signature moments
1. **Number cascade**: Cuando el balance se actualiza, cada digito "cae" desde arriba con efecto stagger. Elegante, no infantil. Refuerza "tu plata crece".
2. **Confirma-glow**: Cuando una transaccion se confirma on-chain, toda la pantalla hace un flash verde muy sutil (opacity 0.05, 300ms). Comunica "algo bueno acaba de pasar" sin ser intrusivo.

### Gradiente header
- Gradiente sutil de izquierda a derecha: `from-[#1E3A5F] via-[#1E4A6F] to-[#10B981]/20`
- Solo en el header (h-16), no en el resto de la app
- Transicion suave, no llamativa

### NO hacer
- No usar animaciones que duren mas de 600ms (fatiga visual)
- No usar bounce agresivo (infantil)
- No animar elementos que no cambiaron de estado
- No usar particulas, confetti, ni efectos decorativos sin funcion

## Empty states

### Chat trabajador (primera visita)
- AI envia mensaje de bienvenida automatico
- 3 chips clickeables debajo: "Cuanto tengo?", "Mi patron deposito?", "Que es esto?"
- Chips son ActionButton variant="secondary", rounded-full, text-sm
- Al clickear un chip, se envia como mensaje del usuario

### Dashboard empleador (sin contrato)
- Solo muestra CreateContractForm centrado
- Titulo: "Crea tu primer contrato"
- Descripcion: "Define los terminos de ahorro e indemnizacion para tu trabajador"

### Dashboard empleador (contrato terminado)
- ContractStatus con badge "Terminado" (rojo)
- Mensaje: "Este contrato fue terminado. La indemnizacion fue liberada al trabajador."
- Sin acciones disponibles (formularios ocultos)

## Balance display

### Hero number (fijo arriba del chat)
- Posicion: debajo del header, arriba del area de mensajes
- Background: bg-white border-b border-slate-100
- Padding: py-3 px-4
- Numero: text-3xl font-bold text-[#1E3A5F] (hero size)
- Label: "dolares de ahorro" text-sm text-slate-500
- Animacion: count-up al cambiar (500ms)
- Si no hay contrato: no mostrar hero (empty state)

### BalanceCard inline (en chat)
- Aparece cuando AI responde con datos de balance
- Variante inline: sin shadow, sin border, bg-slate-50 rounded-xl p-4
- 3 filas: Ahorro (verde), Indemnizacion (gris), Total (bold)
- Footer: "X depositos realizados" caption

## Anti-patterns (NO hacer)

Estas prácticas están prohibidas:

- ❌ **Modals/Popups**: confunden en mobile. Usar full-screen en su lugar
- Excepción 1: las confirmaciones de acciones destructivas usan confirmación explícita definida por su UI-RFC. En MVP, la opción preferida es inline confirmation; un `alertdialog` solo se admite si el RFC demuestra que la acción irreversible necesita contexto adicional.
- Excepción 2: El modal de conexión de wallet es proporcionado por Stellar Wallets Kit y es UI externa (no controlado por este proyecto)
- ❌ **Carruseles**: imposibles en touch. Usar scroll horizontal si es necesario
- ❌ **Infinite scroll**: consume batería. Usar paginación
- ❌ **Mostrar addresses Stellar**: solo mostrar al empleador si es técnico
- ❌ **Mostrar "USDC" al trabajador**: decir "dólares" siempre
- ❌ **Emojis en UI**: prohibido. Excepción: escudo en logo
- ❌ **Animaciones > 200ms**: consumen batería en Android gama baja
- ❌ **Hover states en mobile**: no funcionan, usar active states
- ❌ **Dropdowns elaborados**: usar `<select>` nativo en mobile
- ❌ **Colores fuera de paleta**: usar solo los 9 colores definidos
- ❌ **Tipografía custom**: solo Inter
- ❌ **Imágenes pesadas**: máximo 300KB, formato WebP

## Checklist de diseño

Antes de enviar un componente a código:

- [ ] Contraste AA pasado
- [ ] Touch targets 44x44px mínimo
- [ ] Todos los inputs tienen label
- [ ] Funcionan en 375px y 1024px
- [ ] Sin modals/popups
- [ ] Sin emojis (excepto logo)
- [ ] Colores de paleta solo
- [ ] Font Inter 400/500/600/700
- [ ] Sombras máximo shadow-md
- [ ] Border radius consistente
- [ ] Loading/error states definidos
- [ ] Responsive sin scroll horizontal

---

**Fecha de creación**: 2026-03-26
**Versión**: 1.0 MVP
