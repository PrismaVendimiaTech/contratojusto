# UI-RFC-HOME: Pantalla Home (Selector de Rol)

## Fuente

- **UXS**: 14_UXS.md §Especificación 1 (Home - Selector de Rol)
- **Jornada**: 13_UJ.md Jornada 1 Paso 1
- **UXI**: 12_UXI.md (sensación calmo-seguro)
- **Patrones**: 10_patrones_ui.md (RoleCard, Logo, WalletConnect, ActionButton)

## Descomposición de Componentes

| Componente | Ruta de Archivo | Estado | Acción |
|---|---|---|---|
| HomePage | app/page.tsx | NEW | Crear componente de página |
| AppHeader | components/AppHeader.tsx | NEW | Crear header reutilizable |
| Logo | components/Logo.tsx | NEW | Crear componente logo |
| RoleCard | components/RoleCard.tsx | NEW | Crear tarjeta selectora de rol |
| WalletConnect | components/WalletConnect.tsx | NEW | Crear botón de conexión |

## Interfaces TypeScript

```typescript
// components/Logo.tsx
interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showShield?: boolean;
}

// components/RoleCard.tsx
interface RoleCardProps {
  role: 'empleador' | 'trabajador';
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  onNavigate?: () => void;
}

// components/WalletConnect.tsx
interface WalletConnectProps {
  // lee del contexto WalletProvider
  // retorna: { address, isConnected, isConnecting, connect, disconnect, signTransaction }
}

// components/AppHeader.tsx
interface AppHeaderProps {
  children?: React.ReactNode;
}
```

## Manifiesto de Archivos

```
packages/frontend/
├── app/
│   ├── page.tsx           ← HomePage (esta RFC)
│   └── layout.tsx         ← Root layout con proveedores
├── components/
│   ├── AppHeader.tsx
│   ├── Logo.tsx
│   ├── RoleCard.tsx
│   └── WalletConnect.tsx
├── lib/
│   └── wallet.ts          ← StellarWalletsKit integration
├── providers/
│   └── WalletProvider.tsx
└── tailwind.config.ts
```

## Tabla de Vinculación de Tokens

| Propiedad UXS | Clase Tailwind | Fuente de Token |
|---|---|---|
| Fondo de página | bg-slate-50 | 10_identidad_visual: #F8FAFC |
| Color del logo | text-[#1E3A5F] | 10_identidad_visual: brand primario |
| Fondo de tarjeta | bg-white | 10_lineamientos: cards |
| Borde de tarjeta | border border-slate-200 | 10_lineamientos: cards |
| Radio de tarjeta | rounded-xl | 10_lineamientos: 12px |
| Sombra hover | hover:shadow-md | 10_lineamientos: interactive cards |
| Fuente de título | font-semibold text-lg | 10_identidad_visual: Heading 18px |
| Descripción | text-sm text-slate-500 | 10_identidad_visual: Caption 14px |
| Botón primario | bg-blue-500 text-white rounded-lg px-6 py-3 | 10_lineamientos: primary button |
| Padding de página | px-4 py-8 | 10_lineamientos: 16px mobile |
| Padding superior | pt-24 | Espacio para breathing room |

## Máquina de Estados

| Estado | Disparador | Estado Siguiente | Cambio en UI |
|---|---|---|---|
| desconectado | carga de página | desconectado | Mostrar botón "Conectar Wallet" |
| desconectado | click "Conectar Wallet" | conectando | Botón: "Conectando..." + spinner |
| conectando | kit.openModal() | modal_open | Kit abre modal de selección de wallet |
| modal_open | usuario selecciona wallet | conectando | Esperando respuesta del wallet |
| conectando | kit.getAddress() exitoso | conectado | Botón muestra dirección "GAB...X2K" |
| conectando | Error conexión | desconectado | Toast error "No se pudo conectar" |
| conectado | click RoleCard | navegando | Navegar a /empleador o /trabajador |

## Catálogo de Textos (es-AR)

```typescript
const COPY_HOME = {
  LOGO_TEXT: 'ContratoJusto',
  TAGLINE: 'Derechos laborales digitales',
  ROLE_EMPLOYER_TITLE: 'Soy Empleador',
  ROLE_EMPLOYER_DESC: 'Crear contrato, depositar, gestionar pagos',
  ROLE_WORKER_TITLE: 'Soy Trabajador',
  ROLE_WORKER_DESC: 'Ver mi ahorro, hablar con mi asesor, reclamar dinero',
  WALLET_CONNECT: 'Conectar Wallet',
  WALLET_CONNECTING: 'Conectando...',
  WALLET_CONNECTED: (addr: string) => addr.slice(0, 4) + '...' + addr.slice(-4),
  WALLET_CHANGE: 'Cambiar wallet',
  WALLET_MODAL_TITLE: 'Elegí tu wallet',
  NETWORK_LABEL: 'Stellar Testnet (FL-1)',
  BUTTON_TO_DASHBOARD: 'Ir a Dashboard',
  BUTTON_TO_CHAT: 'Ir a Chat',
  STATUS_CONNECTED: 'Conectada:',
  ERROR_WRONG_NETWORK: 'Cambia tu wallet a Testnet',
  ERROR_CONNECTION_FAILED: 'No se pudo conectar. Intenta de nuevo.',
  ERROR_TIMEOUT: '¿Esperando la wallet?',
} as const;
```

## Contrato de Accesibilidad

- **RoleCards**: role="link", tabIndex=0, navegación con Enter
- **WalletConnect**: aria-label="Conectar wallet"
- **Logo**: aria-label="ContratoJusto - Inicio"
- **Orden de enfoque**: Logo → WalletConnect → RoleCard Empleador → RoleCard Trabajador
- **Touch targets**: Todos los botones mínimo 44x44px
- **Contraste**: AA WCAG en todos los textos

## Afirmaciones de Prueba

- [ ] La página se renderiza con 2 RoleCards y botón WalletConnect
- [ ] Click "Conectar Wallet" abre modal multi-wallet (no queda atado a una sola wallet)
- [ ] Modal muestra opciones de wallets disponibles
- [ ] Seleccionar wallet en modal dispara kit.getAddress()
- [ ] Después de conectar, la dirección aparece truncada
- [ ] Click RoleCard navega a ruta correcta (/empleador o /trabajador)
- [ ] Sin wallet conectada: aparece toast de error
- [ ] Con wallet: RoleCards cambian a botones "Ir a Dashboard" e "Ir a Chat"
- [ ] Botón "Cambiar wallet" desconecta y vuelve a estado "sin wallet"
- [ ] Responsive: funciona en 375px a 1024px
- [ ] **NUNCA**: mostrar direcciones Stellar sin truncar
- [ ] **NUNCA**: mostrar "Stellar" o "Soroban" en la interfaz

## Notas de Implementación

### Comportamiento de Conexión

1. **Primera carga**: WalletProvider intenta conectar automáticamente (si existe sesión previa)
2. **Sin sesión**: muestra estado "desconectado"
3. **Click "Conectar Wallet"**: kit.openModal() abre selector de wallets
4. **Usuario selecciona wallet**: kit.getAddress() obtiene dirección
5. **Conexión exitosa**: WalletProvider actualiza estado, UI se actualiza automáticamente
6. **Timeout**: Si la wallet no responde en 15 segundos, mostrar toast "¿Esperando la wallet?"
7. **Click en RoleCard sin wallet**: muestra toast "Necesitas conectar wallet primero"

### Estructura HTML

```html
<!-- HomePage (app/page.tsx) -->
<div class="min-h-screen bg-slate-50 flex flex-col items-center px-4 py-8">
  <!-- Logo + Tagline -->
  <Logo size="lg" showShield={true} />
  <p class="text-slate-500 text-center mt-6">Derechos laborales digitales</p>

  <!-- RoleCards Container -->
  <div class="w-full max-w-md gap-4 mt-12">
    <RoleCard role="empleador" title="Soy Empleador" ... />
    <RoleCard role="trabajador" title="Soy Trabajador" ... />
  </div>

  <!-- WalletConnect Button/Status -->
  <WalletConnect />
</div>
```

### WalletProvider Context

El componente WalletConnect debe leer del contexto:

```typescript
const { address, isConnected, isConnecting, connect, disconnect } = useWallet();

// Estados:
// - desconectado: muestra botón "Conectar Wallet"
// - conectando: muestra "Conectando..." + spinner
// - conectado: muestra address truncada + opción "Cambiar wallet"
```

### Validación de Red

WalletProvider debe validar que la red sea Testnet:

```typescript
const network = await kit.getNetwork();
if (network.networkPassphrase !== 'Test SDF Network ; September 2015') {
  showError('Cambia tu wallet a Testnet');
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

---

**Última actualización**: 2026-03-26
**Versión**: 1.0 MVP
