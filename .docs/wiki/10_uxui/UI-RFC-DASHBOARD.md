# UI-RFC-DASHBOARD: Dashboard Empleador

**Fecha:** 2026-03-26 | **Versión:** 1.0 MVP

## Fuentes
- UXS (14_UXS.md §Spec3)
- UXI (12_UXI.md §Cases 4-5)
- Patrones (10_patrones_ui.md)
- Tech (TECH-FRONTEND-SYSTEM-DESIGN.md)

---

## Propósito

Especificación técnica lista para implementación del Dashboard Empleador de ContratoJusto. Define estructura de componentes, interfaces TS, tokens de diseño, máquinas de estado, y criterios de aceptación.

## Componentes

| Componente | Archivo | Responsabilidad |
|---|---|---|
| **EmpleadorPage** | `app/empleador/page.tsx` | Orquestación, layout principal |
| **ContractStatus** | `components/ContractStatus.tsx` | Muestra estado contrato (activo/terminado) |
| **CreateContractForm** | `components/CreateContractForm.tsx` | Formulario crear contrato con validación live |
| **DepositForm** | `components/DepositForm.tsx` | Formulario depósito USDC con preview split |
| **TerminateSection** | `components/TerminateSection.tsx` | Botón terminar + confirmación inline |
| **Toast** | `components/Toast.tsx` | Notificaciones success/error/info |
| **LoadingSkeletons** | `components/LoadingSkeletons.tsx` | Estado de carga |

## Interfaces TypeScript

```typescript
interface ContractStatusProps {
  info: ContractInfo | null;
  balance: Balance | null;
  isLoading: boolean;
}

interface ContractInfo {
  id: string;
  employer: string;
  worker: string;
  savingsPct: number;
  severancePct: number;
  isTerminated: boolean;
  terminatedAt?: string;
}

interface Balance {
  savings: bigint;
  severance: bigint;
  total: bigint;
  depositCount: number;
}

interface CreateContractFormProps {
  onSubmit: (data: CreateContractData) => Promise<void>;
  isLoading?: boolean;
  signTransaction?: (xdr: string) => Promise<string>; // from WalletProvider context
}

interface CreateContractData {
  worker: string;
  savingsPct: number;
  severancePct: number;
}

interface DepositFormProps {
  onDeposit: (amount: bigint) => Promise<void>;
  isLoading?: boolean;
  savingsPct: number;
  severancePct: number;
  signTransaction?: (xdr: string) => Promise<string>; // from WalletProvider context
}

interface TerminateSectionProps {
  onTerminate: () => Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
  severanceAmount: bigint;
  signTransaction?: (xdr: string) => Promise<string>; // from WalletProvider context
}

interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
  onDismiss: (id: string) => void;
}
```

## Copy (es-AR)

Todos los textos en castellano argentino, tono cálido-profesional.

```typescript
const DASHBOARD_COPY = {
  PAGE_TITLE: 'Dashboard de Empleador',
  STATUS_ACTIVE_TITLE: 'Contrato activo',
  STATUS_TERMINATED_TITLE: 'Contrato terminado',
  LABEL_WORKER: 'Trabajador',
  LABEL_SPLIT: 'Split de pagos',
  LABEL_DEPOSITS: 'Depósitos registrados',
  LABEL_TOTAL: 'Total depositado',

  CREATE_TITLE: 'Crear contrato',
  CREATE_SUBMIT: 'Crear contrato',
  CREATE_SUBMITTING: 'Creando...',
  CREATE_ERROR_SUM: 'Los porcentajes deben sumar 100',
  CREATE_ERROR_NO_WALLET: 'Conecta tu wallet primero',

  DEPOSIT_TITLE: 'Depositar dólares',
  DEPOSIT_SUBMIT: 'Depositar',
  DEPOSIT_SUBMITTING: 'Depositando...',

  TERMINATE_TITLE: 'Terminar contrato',
  TERMINATE_BUTTON: 'Terminar contrato',
  TERMINATE_CONFIRM: 'Confirmar terminar?',
  TERMINATE_CANCEL: 'Cancelar',
  TERMINATE_SUCCESS: 'Contrato terminado. Indemnización liberada.',
} as const;
```

## Máquina de Estados

Estados principales:
- **loading**: Carga inicial, fetch en curso
- **no_contract**: Sin contrato, mostrar CreateContractForm
- **active**: Contrato activo, mostrar Status + DepositForm + TerminateSection
- **terminated**: Contrato terminado, mostrar Status read-only

## TerminateSection: Confirmación Inline

CRÍTICO: NO usar modal. La confirmación cambia el botón inline.

Estado default → User click Terminar → Botón cambia a [Confirmar] [Cancelar] (inline)
Si user click Cancelar → vuelve a botón rojo
Si user click Confirmar → wallet handoff abre → Éxito: Toast + refresh page

## Validación

| Campo | Regla | Mensaje de error |
|---|---|---|
| Address | Comienza con G, 56 chars | "Dirección Stellar inválida" |
| % Ahorro | 0-100, número | "Inválido" |
| Suma % | = 100 | "Deben sumar 100" |
| Monto | > 0, número | "Inválido" |

## Tokens Tailwind

| Elemento | Clase |
|---|---|
| Page bg | `bg-slate-50` |
| Container | `max-w-lg mx-auto px-4 py-6` |
| Card | `bg-white rounded-xl shadow-sm p-6` |
| Primary btn | `bg-[#1E3A5F] text-white rounded-lg px-6 py-3` |
| Danger btn | `bg-red-500 text-white rounded-lg px-6 py-3` |
| Success card | `bg-green-50 border-l-4 border-green-500` |
| Warning card | `bg-red-50 border-l-4 border-red-500` |
| Address | `font-mono text-sm` |
| Amount | `text-emerald-600 font-semibold` |

## Criterios de Aceptación

### Creación
- [ ] Sin contrato: CreateContractForm visible
- [ ] Sin wallet conectada: muestra error "Conecta tu wallet primero"
- [ ] Preview actualiza live
- [ ] Suma ≠ 100: botón deshabilitado
- [ ] Click Crear: envia a wallet conectada para firma
- [ ] Éxito: Toast + página refrescar

### Depósito
- [ ] DepositForm visible (contrato activo)
- [ ] Preview split actualiza live
- [ ] Click Depositar: envia a wallet conectada para firma
- [ ] Éxito: Toast + ContractStatus actualizar

### Terminación
- [ ] Botón rojo visible
- [ ] Click: [Confirmar terminar?] [Cancelar] inline
- [ ] Cancelar: vuelve a botón rojo
- [ ] Confirmar: envia a wallet conectada para firma
- [ ] Éxito: Toast + página refrescar (terminated)

## Anti-patterns (NUNCA)

- [ ] NO modal de confirmación (solo inline)
- [ ] NO address completo (truncar a GAB...X2K)
- [ ] NO "USDC" en copy (siempre "dólares")
- [ ] NO button sin spinner durante blockchain
- [ ] NO scroll horizontal en mobile

## WalletState Interface

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

Todos los formularios deben obtener `signTransaction` desde WalletProvider:

```typescript
const { signTransaction } = useWallet();
// usar signTransaction(xdr) para firmar transacciones
```

## Integración Soroban

```typescript
getContractInfo(employer: string): Promise<ContractInfo>
getBalance(employer: string): Promise<Balance>
buildCreateContractTx(employer, worker, savingsPct, severancePct): Promise<string>
buildDepositTx(employer, amount): Promise<string>
buildTerminateTx(employer): Promise<string>
```

## Manifest

```
packages/frontend/
├── app/empleador/page.tsx
├── components/
│   ├── ContractStatus.tsx
│   ├── CreateContractForm.tsx
│   ├── DepositForm.tsx
│   ├── TerminateSection.tsx
│   ├── Toast.tsx
│   └── LoadingSkeletons.tsx
├── lib/
│   ├── contract.ts
│   ├── validation.ts
│   └── format.ts
├── hooks/
│   ├── useContract.ts
│   └── useToast.ts
└── providers/
    ├── WalletProvider.tsx
    └── ContractProvider.tsx
```

## Accessibility Contract

- CreateContractForm: `role="form"`, all inputs have visible `<label>`, tab order top-to-bottom
- DepositForm: `input type="number"` with `min="0"` `step="0.01"`, label "Monto en dólares"
- ContractStatus: `role="status"`, `aria-live="polite"` for auto-refresh updates
- TerminateSection: inline confirm buttons have `aria-label` describing consequence ("Confirmar terminación del contrato")
- Toast: `role="alert"`, `aria-live="assertive"`, auto-dismiss after 3s
- All ActionButtons: min height 48px (touch target), focus-visible ring
- Tab order: ContractStatus → DepositForm → TerminateSection (top to bottom)
- Keyboard: Enter on inputs submits form, Escape on inline confirmation cancels
- Screen reader: balance amounts announced with currency ("70 dólares de ahorro")

## UX Intent (12_UXI.md)

### Caso 4: Empleador deposita
**Emoción:** Cumplimiento, responsabilidad, claridad
**Copy:** "Depósito registrado. 70 dólares a ahorro, 30 a indemnización."

### Caso 5: Empleador termina
**Emoción:** Seriedad, justicia, cierre
**Copy:** "¿Terminar contrato? Esto libera inmediatamente la indemnización al trabajador."

---

**Versión Final:** 1.0 MVP
**Fecha:** 2026-03-26
**Estado:** Listo para implementación
