# UI-RFC-SHARED-APP-SHELL: App Shell Compartido

**Fecha:** 2026-03-26 | **Versión:** 1.0 MVP

## Source

- **UXS:** [14_UXS.md](../14_UXS.md) - decisiones de consolidacion 2026-03-26 y mapa rapido de contratos tecnicos.
- **UJ:** [13_UJ.md](../13_UJ.md) - journeys 1 a 5, especialmente acceso rutinario, apertura del chat y retorno al dashboard.
- **UXI:** [12_UXI.md](../12_UXI.md) - sensacion global `calmo-seguro`, confirmacion visible, sin friccion de reingreso.
- **Patrones:** [10_patrones_ui.md](../10_patrones_ui.md) - `Logo`, `AppHeader`, `Toast`, `WalletConnect`.
- **Linea visual:** [10_lineamientos_interfaz_visual.md](../10_lineamientos_interfaz_visual.md), [10_identidad_visual.md](../10_identidad_visual.md).
- **Sistema tecnico:** [07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md](../07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md).
- **Auditoria:** [15_auditoria_frontend_ux.md](../15_auditoria_frontend_ux.md) - `UX-01`, `AUD-01`, `FE-01`.

## Component Decomposition

| Component | File Path | Current Status | RFC Action |
|---|---|---|---|
| `AppLayout` | `packages/frontend/app/layout.tsx` | `DOC-ONLY` | `NEW` root layout con providers, fuentes y shells de ruta |
| `AppHeader` | `packages/frontend/components/shared/AppHeader.tsx` | `DOC-ONLY` | `NEW` header fijo para rutas autenticadas |
| `Logo` | `packages/frontend/components/shared/Logo.tsx` | `DOC-ONLY` | `NEW` wordmark con escudo opcional |
| `Toast` | `packages/frontend/components/shared/Toast.tsx` | `DOC-ONLY` | `NEW` capa global de notificacion |

## TypeScript Interfaces

```typescript
type ShellVariant = 'home' | 'authenticated';
type AuthenticatedRoute = '/empleador' | '/trabajador';

interface AppLayoutProps {
  children: React.ReactNode;
}

interface AppHeaderProps {
  walletSlot?: React.ReactNode;
  balanceSlot?: React.ReactNode;
  statusLabel?: string;
  showSkipLink?: boolean;
  route?: AuthenticatedRoute;
}

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withShield?: boolean;
  ariaLabel?: string;
}

interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
  actionLabel?: string;
  onDismiss: (id: string) => void;
}

interface ShellState {
  variant: ShellVariant;
  route: '/' | AuthenticatedRoute;
  isHydrated: boolean;
  isTransitioning: boolean;
  hasToastQueue: boolean;
}
```

## File Manifest

```
packages/frontend/
├── app/
│   ├── layout.tsx
│   ├── empleador/page.tsx
│   └── trabajador/page.tsx
├── components/
│   └── shared/
│       ├── AppHeader.tsx
│       ├── Logo.tsx
│       └── Toast.tsx
└── providers/
    ├── WalletProvider.tsx
    └── ContractProvider.tsx
```

## Token Binding Table

| UXS / UXI Need | Tailwind Class | Token Source |
|---|---|---|
| App background | `min-h-screen bg-slate-50 text-slate-800` | [10_identidad_visual.md](../10_identidad_visual.md): fondo + texto principal |
| Authenticated header | `fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-40 px-4` | [10_lineamientos_interfaz_visual.md](../10_lineamientos_interfaz_visual.md): header fijo 64px |
| Brand wordmark | `font-bold text-[#1E3A5F] tracking-tight` | [10_identidad_visual.md](../10_identidad_visual.md): azul marino + Inter |
| Header status | `text-slate-500 text-sm` | [10_identidad_visual.md](../10_identidad_visual.md): texto secundario |
| Main content on auth routes | `pt-16 px-4 md:px-6` | [10_lineamientos_interfaz_visual.md](../10_lineamientos_interfaz_visual.md): header + body scroll |
| Home shell | `min-h-screen flex flex-col items-center justify-center px-4 py-8` | [14_UXS.md](../14_UXS.md): Home sin header persistente |
| Toast host | `fixed top-4 right-4 z-50 w-[calc(100vw-2rem)] md:w-auto md:max-w-sm` | [10_patrones_ui.md](../10_patrones_ui.md): toast top-right |
| Authenticated content width | `w-full max-w-4xl mx-auto` | [10_lineamientos_interfaz_visual.md](../10_lineamientos_interfaz_visual.md): responsividad |
| Chat viewport shell | `h-[calc(100vh-64px)]` | [10_patrones_ui.md](../10_patrones_ui.md): fullscreen minus header |

## State Machine

| Shell State | Trigger | Next State | UI Change |
|---|---|---|---|
| `server-rendered` | request completed | `hydrating` | render SSR shell without client-only affordances |
| `hydrating` | client boot on `/` | `home-chrome` | centered brand, no persistent header |
| `hydrating` | client boot on `/empleador` or `/trabajador` | `authenticated-chrome` | fixed header + routed content frame |
| `home-chrome` | session redirect resolved | `route-transitioning` | swap to role-gated route |
| `authenticated-chrome` | route change | `route-transitioning` | preserve header, update body content |
| `authenticated-chrome` | toast queued | `toast-visible` | show live notification in top-right |
| `toast-visible` | dismiss or timeout | `authenticated-chrome` | remove toast from stack |
| `route-transitioning` | navigation settled | `authenticated-chrome` or `home-chrome` | focus main heading, keep shell stable |

## Copy Catalog

```typescript
const APP_SHELL_COPY = {
  APP_NAME: 'ContratoJusto',
  APP_TAGLINE: 'Derechos laborales digitales',
  SKIP_TO_CONTENT: 'Saltar al contenido principal',
  HEADER_STATUS_ACTIVE: 'Contrato activo',
  HEADER_STATUS_LOADING: 'Cargando...',
  TOAST_SUCCESS_GENERIC: 'Actualizado',
  TOAST_INFO_GENERIC: 'Listo',
  TOAST_ERROR_GENERIC: 'Algo salio mal',
  TOAST_CLOSE: 'Cerrar notificacion',
} as const;
```

## Accessibility Contract

- Usar landmarks reales: `header` en rutas autenticadas y `main` en todas las rutas.
- Incluir skip link visible al foco con `aria-label="Saltar al contenido principal"`.
- `Logo` debe ser enlace al inicio con `aria-label="ContratoJusto, ir al inicio"`.
- `AppHeader` no debe capturar foco ni esconder controles del usuario.
- `Toast` usa `role="status"` para success/info y `role="alert"` para error.
- Cada toast tiene un boton de cierre con label accesible.
- Todos los controles de header y acciones de shell cumplen 44x44 px minimo.
- El cambio de ruta mueve el foco al titulo principal de la nueva vista.

## Telemetry Spec

```typescript
type ShellRoute = '/' | '/empleador' | '/trabajador';
type ShellToastType = 'success' | 'error' | 'info';

function trackAppShellRendered(payload: {
  route: ShellRoute;
  variant: ShellVariant;
  hydrated: boolean;
}): void;

function trackAppHeaderAction(payload: {
  route: ShellRoute;
  action: 'skip-link' | 'logo-click' | 'wallet-slot-click' | 'status-click';
}): void;

function trackToastShown(payload: {
  id: string;
  type: ShellToastType;
  source: 'shell' | 'wallet' | 'routing' | 'contract';
}): void;

function trackRouteVariantResolved(payload: {
  route: ShellRoute;
  variant: ShellVariant;
  source: 'session' | 'navigation' | 'hard-refresh';
}): void;
```

## Test Assertions

- [ ] `/` renderiza sin header fijo y con el bloque centrado de marca.
- [ ] `/empleador` y `/trabajador` renderizan `AppHeader` fijo a 64px.
- [ ] `Logo` navega al inicio y conserva el foco accesible.
- [ ] `Toast` anuncia mensajes de exito, error e info con ARIA correcto.
- [ ] El shell no genera scroll horizontal entre 320px y 1280px.
- [ ] El contenido de autenticado arranca debajo del header, sin salto visual.
- [ ] El area de main recibe foco despues de un cambio de ruta.
- [ ] `AppHeader` acepta slots para wallet y saldo sin romper layout.
- [ ] **NUNCA**: mostrar header persistente en Home.
- [ ] **NUNCA**: ocultar el estado de toast al lector de pantalla.
- [ ] **NUNCA**: usar rutas o wrappers basados en `src/frontend/web-next`.

## Dependencies

- `UI-RFC-SHARED-ROLE-GATE.md` para decidir cuando el shell entra en modo Home inteligente.
- `packages/frontend/providers/WalletProvider.tsx` para estado de wallet y sesion.
- `packages/frontend/providers/ContractProvider.tsx` para saldo y contrato cuando exista.
- `UI-RFC-WORKER-CHAT-SHELL.md` y `UI-RFC-EMPLOYER-DASHBOARD-SHELL.md` para los slots autenticados.
- `packages/frontend/components/shared/WalletConnect.tsx` como slot consumido por el header, aunque su logica de acceso se resuelve en el role gate.

## Learning Notes

- Este RFC no decide quien es el usuario; solo define la cáscara compartida que no debe drift-ear entre rutas.
- `Home` queda sin header persistente a proposito: el header fijo aparece solo cuando el usuario ya esta entrando a una experiencia autenticada.
- El toast vive en la shell porque los mensajes de red, sesion y contrato deben verse igual en Home, Dashboard y Chat.
- Todo el frontend nuevo se ancla en `packages/frontend/`; la ruta historica `src/frontend/web-next/` queda fuera del contrato.
- `DOC-ONLY` hoy: `AppHeader`, `Logo`, `Toast`. `NEW` en este RFC: sus implementaciones y el layout raiz.
- `WalletConnect` se consume como slot desde este shell, pero su contrato funcional se documenta en el gate de rol.
