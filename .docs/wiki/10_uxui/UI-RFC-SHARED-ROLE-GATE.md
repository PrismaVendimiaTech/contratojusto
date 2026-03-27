# UI-RFC-SHARED-ROLE-GATE: Gate de Rol y Wallet

**Fecha:** 2026-03-26 | **Versión:** 1.0 MVP

## Source

- **UXS:** [14_UXS.md](../14_UXS.md) - Especificacion 1, Home selector de rol, estados sin wallet / con wallet / cambio de wallet.
- **UJ:** [13_UJ.md](../13_UJ.md) - jornadas de acceso, reingreso rapido y primer paso de entrada.
- **UXI:** [12_UXI.md](../12_UXI.md) - sensacion `calmo-seguro`, control del usuario y seguridad visible.
- **Patrones:** [10_patrones_ui.md](../10_patrones_ui.md) - `RoleCard`, `WalletConnect`, `Toast`, `Logo`.
- **Linea visual:** [10_lineamientos_interfaz_visual.md](../10_lineamientos_interfaz_visual.md), [10_identidad_visual.md](../10_identidad_visual.md).
- **Sistema tecnico:** [07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md](../07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md).
- **Auditoria:** [15_auditoria_frontend_ux.md](../15_auditoria_frontend_ux.md) - `UX-01`, `AUD-04`.

## Component Decomposition

| Component | File Path | Current Status | RFC Action |
|---|---|---|---|
| `HomePage` | `packages/frontend/app/page.tsx` | `DOC-ONLY` | `NEW` gate inteligente con selector de rol |
| `RoleCard` | `packages/frontend/components/home/RoleCard.tsx` | `DOC-ONLY` | `NEW` card interactiva para rol y CTA principal |
| `WalletConnect` | `packages/frontend/components/shared/WalletConnect.tsx` | `DOC-ONLY` | `NEW` control de conectar / desconectar wallet y persistencia en sesion |

## TypeScript Interfaces

```typescript
type Role = 'empleador' | 'trabajador';
type GateMode = 'booting' | 'missing-wallet' | 'missing-role' | 'ready' | 'switch-wallet-confirm' | 'connecting' | 'redirecting' | 'disconnecting' | 'error';

interface HomePageProps {
  initialRoute?: '/' | '/empleador' | '/trabajador';
}

interface RoleCardProps {
  role: Role;
  title: string;
  description: string;
  connected: boolean;
  actionLabel: string;
  hrefWhenConnected: '/empleador' | '/trabajador';
  onAction: (role: Role) => void;
  isBusy?: boolean;
}

interface WalletConnectProps {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  selectedRole: Role | null;
  onConnect: () => Promise<void>;
  onDisconnect: () => Promise<void>;
  onRequestDisconnect: () => void;
}

interface RoleGateState {
  mode: GateMode;
  walletAddress: string | null;
  selectedRole: Role | null;
  resolvedRole: Role | null;
  sessionSource: 'fresh' | 'restored';
  redirectTarget: '/empleador' | '/trabajador' | null;
  errorCode?: 'wallet_unavailable' | 'wrong_network' | 'connect_failed' | 'timeout';
}
```

## File Manifest

```
packages/frontend/
├── app/
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   ├── home/
│   │   └── RoleCard.tsx
│   └── shared/
│       ├── Logo.tsx
│       ├── Toast.tsx
│       └── WalletConnect.tsx
└── providers/
    └── WalletProvider.tsx
```

## Token Binding Table

| UXS / UXI Need | Tailwind Class | Token Source |
|---|---|---|
| Home wrapper | `min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-8` | [10_identidad_visual.md](../10_identidad_visual.md): fondo general |
| Logo block | `text-[#1E3A5F]` | [10_identidad_visual.md](../10_identidad_visual.md): azul marino |
| Tagline | `text-slate-500 text-center text-base leading-6 max-w-[18rem]` | [10_identidad_visual.md](../10_identidad_visual.md): texto secundario |
| Role cards grid | `w-full max-w-md gap-4 mt-12` | [10_lineamientos_interfaz_visual.md](../10_lineamientos_interfaz_visual.md): mobile-first, sin scroll horizontal |
| Role card surface | `bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md` | [10_patrones_ui.md](../10_patrones_ui.md): card reusable |
| Role icon | `text-[#1E3A5F] text-[32px]` | [10_identidad_visual.md](../10_identidad_visual.md): brand primary |
| Role title | `font-semibold text-lg text-[#1E3A5F]` | [10_identidad_visual.md](../10_identidad_visual.md): heading |
| Role description | `text-sm text-slate-500 leading-5` | [10_identidad_visual.md](../10_identidad_visual.md): caption |
| Primary CTA | `bg-[#1E3A5F] text-white rounded-lg px-6 py-3` | [10_identidad_visual.md](../10_identidad_visual.md): brand primary button |
| Connected chip | `inline-flex items-center gap-2 text-emerald-600` | [10_identidad_visual.md](../10_identidad_visual.md): success / positivo |
| Change wallet link | `text-blue-600 hover:text-blue-700` | [14_UXS.md](../14_UXS.md): cambio de wallet visible |
| Network caption | `text-slate-400 text-xs` | [10_identidad_visual.md](../10_identidad_visual.md): caption |
| Disconnect confirm overlay | `fixed inset-0 bg-slate-900/50 p-4 flex items-center justify-center` | [10_lineamientos_interfaz_visual.md](../10_lineamientos_interfaz_visual.md): confirmacion explicita permitida |
| Disconnect confirm surface | `w-full max-w-sm bg-white rounded-xl p-6 shadow-lg` | [10_patrones_ui.md](../10_patrones_ui.md): card / dialog surface |
| Loading state | `opacity-50 pointer-events-none` | [10_lineamientos_interfaz_visual.md](../10_lineamientos_interfaz_visual.md): loading state simple |

## State Machine

| Gate State | Trigger | Next State | UI Change |
|---|---|---|---|
| `booting` | app mount | `missing-wallet` or `missing-role` or `ready` | resolve session-only role and wallet |
| `missing-wallet` | user clicks connect on card or footer | `connecting` | show spinner and disable CTAs |
| `connecting` | wallet succeeds | `missing-role` or `ready` | show truncated address and success toast |
| `connecting` | wallet fails or times out | `missing-wallet` | restore primary CTA and show error toast |
| `missing-role` | user chooses role card | `ready` | store selected role in session only and redirect |
| `ready` | role selected and wallet present | `redirecting` | navigate to `/empleador` or `/trabajador` |
| `redirecting` | router push completes | `ready` | handoff finished; the home gate releases control to the destination route |
| `ready` | change wallet requested | `switch-wallet-confirm` | show explicit confirm overlay |
| `switch-wallet-confirm` | user confirms | `disconnecting` | disconnect wallet and clear session role |
| `disconnecting` | disconnect completes | `missing-wallet` | return to initial home gate |
| `error` | retry | `missing-wallet` or `connecting` | rerender CTA, preserve safety copy |

## Copy Catalog

```typescript
const ROLE_GATE_COPY = {
  LOGO_TEXT: 'ContratoJusto',
  TAGLINE: 'Derechos laborales digitales',
  ROLE_EMPLOYER_TITLE: 'Soy Empleador',
  ROLE_EMPLOYER_DESC: 'Crear contrato, depositar, gestionar pagos',
  ROLE_WORKER_TITLE: 'Soy Trabajador',
  ROLE_WORKER_DESC: 'Ver mi ahorro, hablar con mi asesor, reclamar dinero',
  CONNECT_WALLET: 'Conectar Wallet',
  CONNECTING: 'Conectando...',
  CONNECTED_PREFIX: 'Conectada:',
  CHANGE_WALLET: 'Cambiar wallet',
  BUTTON_DASHBOARD: 'Ir a Dashboard',
  BUTTON_CHAT: 'Ir a Chat',
  NETWORK_LABEL: 'Stellar Testnet (FL-1)',
  TOAST_WALLET_CONNECTED: 'Wallet conectada',
  TOAST_CONNECTION_FAILED: 'No se pudo conectar. Intenta de nuevo.',
  TOAST_TIMEOUT: '¿Sigue abierta tu wallet?',
  TOAST_NO_WALLET: 'Necesitas una wallet compatible para continuar',
  TOAST_WRONG_NETWORK: 'Cambia tu wallet a Testnet',
  TOAST_ROLE_READY: 'Listo',
  CONFIRM_DISCONNECT_TITLE: '¿Desconectar wallet actual?',
  CONFIRM_DISCONNECT_BODY: 'Si confirmas, la sesion actual se reinicia y tendras que volver a conectar tu wallet.',
  CONFIRM_DISCONNECT_ACCEPT: 'Desconectar',
  CONFIRM_DISCONNECT_CANCEL: 'Cancelar',
} as const;
```

## Accessibility Contract

- Cada `RoleCard` expone un unico target interactivo principal; no se anidan botones dentro de botones.
- El contenido descriptivo de cada tarjeta se referencia con `aria-describedby`.
- `WalletConnect` anuncia su estado con texto visible y no solo con color.
- El boton principal mide al menos 44x44 px y tiene `aria-label` cuando el texto es abreviado.
- La confirmacion de desconexion usa `role="alertdialog"` con titulo, cuerpo, boton aceptar y cerrar por Escape.
- Al abrir la confirmacion, el foco entra en el control primario; al cerrar, vuelve al trigger.
- Los mensajes de exito y error salen por una region `aria-live="polite"` o `aria-live="assertive"` segun severidad.
- La redaccion evita depender de emoji como unico indicador funcional.
- El reingreso directo por sesion no debe saltarse el anuncio visual de estado listo.

## Telemetry Spec

```typescript
type GateReason = 'manual' | 'auto-restore' | 'refresh' | 'disconnect';
type GateErrorCode = 'wallet_unavailable' | 'wrong_network' | 'connect_failed' | 'timeout';

function trackRoleGateMounted(payload: {
  route: '/';
  sessionSource: 'fresh' | 'restored';
  hasWallet: boolean;
  hasRole: boolean;
}): void;

function trackRoleSelection(payload: {
  role: Role;
  source: 'card' | 'deep-link' | 'auto-restore';
}): void;

function trackWalletConnectStarted(payload: {
  source: 'card' | 'footer';
  roleContext: Role | null;
}): void;

function trackWalletConnectSucceeded(payload: {
  roleContext: Role | null;
  addressTruncated: string;
  sessionSource: 'fresh' | 'restored';
}): void;

function trackWalletConnectFailed(payload: {
  errorCode: GateErrorCode;
  source: 'card' | 'footer';
}): void;

function trackWalletDisconnectRequested(payload: {
  reason: GateReason;
  selectedRole: Role | null;
}): void;

function trackRoleGateRedirected(payload: {
  target: '/empleador' | '/trabajador';
  reason: GateReason;
}): void;
```

## Test Assertions

- [ ] Primera carga sin wallet muestra 2 `RoleCard` y CTA `Conectar Wallet`.
- [ ] `WalletConnect` entra en estado `Conectando...` mientras la wallet esta abierta.
- [ ] Conexión exitosa muestra direccion truncada y deja la sesion lista para enrutar.
- [ ] Seleccionar rol con wallet presente redirige a `/empleador` o `/trabajador`.
- [ ] Seleccionar rol sin wallet inicia conectividad y luego redirecciona.
- [ ] `Cambiar wallet` muestra confirmacion y no desconecta hasta aceptar.
- [ ] La sesion guarda rol solo mientras dura la sesion; no aparece en `localStorage`.
- [ ] El timeout de 15s muestra mensaje de espera y permite reintentar.
- [ ] Reingreso con sesion viva y rol resuelto entra directo al flujo correspondiente.
- [ ] Responsive correcto desde 320px hasta 1280px sin scroll horizontal.
- [ ] **NUNCA**: persistir rol por wallet o en `localStorage`.
- [ ] **NUNCA**: mostrar direccion Stellar completa.
- [ ] **NUNCA**: dejar una tarjeta con dos controles anidados e inaccesibles.

## Dependencies

- `UI-RFC-SHARED-APP-SHELL.md` para montar el home dentro del shell global y respetar el no-header en Home.
- `packages/frontend/providers/WalletProvider.tsx` para estado de wallet, sesion y acciones de handoff.
- `packages/frontend/components/shared/Logo.tsx` para el bloque de marca centrado.
- `packages/frontend/components/shared/Toast.tsx` para exito, error y timeout.
- `packages/frontend/app/empleador/page.tsx` y `packages/frontend/app/trabajador/page.tsx` para las rutas de salida una vez resuelto el rol.
- Stellar Wallets Kit y validacion de red Testnet.

## Learning Notes

- `Home` no es un landing permanente: es un gate inteligente que desaparece en cuanto wallet y rol ya quedaron resueltos para la sesion.
- El rol se conserva solo en sesion porque ese dato es de navegacion, no de identidad persistente.
- `WalletConnect` y `RoleCard` siguen siendo `DOC-ONLY` en el inventario actual; esta RFC los convierte en `NEW` sin asumir implementacion previa.
- La confirmacion de desconexion se mantiene explicita porque el cambio de wallet borra el contexto operativo de la sesion.
- La copia nunca menciona rutas internas ni tecnicismos del stack; al usuario le debe sonar a acceso y control, no a infraestructura.
- El frontend real sigue anclado en `packages/frontend/`; esta RFC evita cualquier referencia residual a `src/frontend/web-next/`.
