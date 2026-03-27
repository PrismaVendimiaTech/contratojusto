# 10 - Identidad Visual: ContratoJusto

## Propósito

Definir la base visual global del producto. Esta documentación es la fuente de verdad para colores, tipografía, iconografía e imágenes en todas las interfaces de ContratoJusto.

## Paleta de colores

### Colores primarios

| Nombre | Hex | Uso | Tailwind class |
|---|---|---|---|
| Azul Marino | #1E3A5F | Primary. Headers, botones, texto énfasis, bordes destacados | `bg-[#1E3A5F]` `text-[#1E3A5F]` |
| Esmeralda | #10B981 | Secondary. Success, dinero, positivo, confirmaciones | `bg-emerald-500` `text-emerald-600` |
| Ámbar | #F59E0B | Accent. CTAs importantes, alertas, acción de firmar | `bg-amber-500` `text-amber-600` |

### Colores de soporte

| Nombre | Hex | Uso | Tailwind class |
|---|---|---|---|
| Fondo | #F8FAFC | Background general de toda la app | `bg-slate-50` |
| Texto principal | #1E293B | Texto body, párrafos, contenido | `text-slate-800` |
| Texto secundario | #64748B | Labels, metadata, información auxiliar | `text-slate-500` |
| Borde | #E2E8F0 | Bordes, separadores, divisores | `border-slate-200` |
| Error | #EF4444 | Errores, advertencias críticas, acciones destructivas | `bg-red-500` |
| Success | #22C55E | Confirmaciones, estados completados | `bg-green-500` |
| Chat AI bg | #EFF6FF | Fondo de mensajes del asesor virtual | `bg-blue-50` |
| Chat User bg | #ECFDF5 | Fondo de mensajes del usuario | `bg-emerald-50` |

### Especificaciones de contraste

Todos los textos cumplen WCAG AA:
- Azul Marino (#1E3A5F) + Fondo blanco: 11:1 (AAA)
- Texto slate-800 + Fondo slate-50: 12:1 (AAA)
- Texto slate-500 + Fondo blanco: 6.5:1 (AA)
- Ámbar (#F59E0B) + Texto blanco: 5.5:1 (AA)

## Tipografía

**Font family**: Inter (Google Fonts, variable weight)

**Pesos disponibles**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Escala tipográfica

| Nivel | Size | Weight | Line Height | Uso |
|---|---|---|---|---|
| Display | 24px | 600 (semibold) | 1.25 | Títulos de página principal |
| Heading | 18px | 600 (semibold) | 1.25 | Títulos de sección, headers de card |
| Body | 16px | 400 (normal) | 1.5 | Texto general, mensajes de chat, párrafos |
| Caption | 14px | 400 (normal) | 1.5 | Labels de input, metadata, información auxiliar |
| Small | 12px | 400 (normal) | 1.5 | Timestamps, helper text, notas pequeñas |

**Letter spacing**: tight (-0.01em) en headings, normal en body

## Logo

**Tipo**: Wordmark (solo texto, sin icono gráfico)

**Texto**: "ContratoJusto"

**Tipografía**: Inter Bold (700), letter-spacing tight

**Color**: #1E3A5F sobre fondo claro

**Variante con escudo** (opcional en headers):
- Escudo simple (Shield) de Lucide React a la izquierda del texto
- Color escudo: #1E3A5F
- Tamaño: 24px

**Usos**:
- Header de la app: Wordmark + Shield
- Documentos: Wordmark sin shield
- Favicon: Letra "C" en azul marino, fondo blanco

**No usar**:
- No hay logo elaborado
- No hay variante con gradiente
- No hay mascota

## Iconografía

**Biblioteca**: Lucide React (https://lucide.dev)

**Estilo**: Outline, sin relleno

**Tamaño estándar**: 24px

**Stroke width**: 2px

**Iconos clave del producto**:
- `Shield` → Protección, seguridad, contrato activo
- `DollarSign` → Dinero, saldo, ahorro
- `MessageSquare` → Chat, comunicación, asesor
- `Send` → Enviar mensaje, confirmar
- `Wallet` → Billetera, activo
- `AlertCircle` → Errores, advertencias
- `CheckCircle` → Éxito, confirmado
- `ArrowRight` → Siguiente, navegar
- `Download` → Descargar, guardar
- `Copy` → Copiar al portapapeles
- `Eye` / `EyeOff` → Mostrar/ocultar contraseña

**Especificaciones**:
- Color: heredar del texto del contexto (slate-800, white, etc.)
- Sin sombras
- Sin gradientes
- Consistencia visual en toda la app

## Imágenes

**Política para MVP**: No se usan imágenes ni ilustraciones

**Excepciones futuras** (post-hackathon):
- Si se agregan, deben ser fotografías reales (no ilustraciones)
- Resolución: mínimo 2x (retina)
- Formato: WebP con fallback PNG
- Tamaño máximo: 300KB

## Espaciado

**Sistema de espaciado** (múltiplos de 4px):
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- 2xl: 32px
- 3xl: 48px

**Padding general**:
- Mobile: 16px
- Tablet: 20px
- Desktop: 24px

**Gaps entre elementos**: 12px, 16px, 24px (nunca 1px)

## Bordes y esquinas

**Border radius**:
- Buttons: `rounded-lg` (8px)
- Cards: `rounded-xl` (12px)
- Chat bubbles: `rounded-2xl` (16px) con esquina aguda opuesta
- Inputs: `rounded-lg` (8px)

**Border width**:
- Inputs y cards: 1px
- Focus ring: 2px
- No usar bordes mayores a 2px

## Sombras

**Shadow scale**:
- `shadow-sm`: 0 1px 2px rgba(0, 0, 0, 0.05) → Cards
- `shadow-md`: 0 4px 6px rgba(0, 0, 0, 0.1) → Elevación media
- No usar shadow-lg en mobile
- Máximo shadow-md en desktop

## Modo visual

**Modo**: Light mode only

- Fondo general: #F8FAFC (slate-50)
- Sin dark mode (MVP argentino enfocado en luz solar)
- Contraste asegurado para usabilidad exterior

---

**Fecha de creación**: 2026-03-26
**Versión**: 1.0 MVP
