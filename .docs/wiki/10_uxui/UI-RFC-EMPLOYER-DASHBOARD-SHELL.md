# UI-RFC-EMPLOYER-DASHBOARD-SHELL: Dashboard Empleador

## Source

| Source | Use |
|---|---|
| `14_UXS.md` §Spec 3 | Layout base, estados visuales, copy de dashboard |
| `12_UXI.md` Caso 4 y 5 | Intencion: cumplimiento, claridad, seriedad y cierre |
| `13_UJ.md` Viaje 4 | Secuencia patron -> deposito -> terminacion |
| `10_patrones_ui.md` | `ContractStatus`, `CreateContractForm`, `DepositForm`, `TerminateSection`, `ActionButton`, `Toast` |
| `10_identidad_visual.md` + `10_lineamientos_interfaz_visual.md` | Tokens, cards, botones, accesibilidad mobile-first |
| `07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md` | Root `packages/frontend/`, App Router, providers |
| `UI-RFC-DASHBOARD.md` | Macro de referencia solo como insumo |

Decisions locked:
- One active contract per wallet.
- Frontend root is `packages/frontend`.
- Destructive actions require explicit confirmation.
- Create contract inherits compliance + clarity, not "wizard" behavior.

## Component Decomposition

| Component | Path | Lifecycle | Notes |
|---|---|---|---|
| `EmpleadorDashboardPage` | `packages/frontend/app/empleador/page.tsx` | `NEW` | Shell route and layout orchestration |
| `AppHeader` | `packages/frontend/components/shared/AppHeader.tsx` | `DOC-ONLY` | Shared shell header |
| `WalletConnect` | `packages/frontend/components/shared/WalletConnect.tsx` | `DOC-ONLY` | Shared wallet state surface |
| `ContractStatus` | `packages/frontend/components/employer/ContractStatus.tsx` | `EXTEND` | Employer-specific state summary |
| `CreateContractForm` | `packages/frontend/components/employer/CreateContractForm.tsx` | `DOC-ONLY` | Rendered when no active contract exists |
| `DepositForm` | `packages/frontend/components/employer/DepositForm.tsx` | `DOC-ONLY` | Rendered when contract is active |
| `TerminateSection` | `packages/frontend/components/employer/TerminateSection.tsx` | `DOC-ONLY` | Rendered when contract is active |
| `Toast` | `packages/frontend/components/shared/Toast.tsx` | `DOC-ONLY` | Success/error feedback |

## TypeScript Interfaces

```ts
type EmployerDashboardState = 'loading' | 'no_contract' | 'active' | 'terminated' | 'error';

interface ContractInfo {
  workerAddress: string;
  savingsPct: number;
  severancePct: number;
  isTerminated: boolean;
  terminatedAt?: string;
}

interface EmployerDashboardShellProps {
  contractInfo: ContractInfo | null;
  state: EmployerDashboardState;
}
```

## File Manifest

```text
packages/frontend/
├── app/
│   └── empleador/
│       └── page.tsx
├── components/
│   ├── shared/
│   │   ├── AppHeader.tsx
│   │   ├── Toast.tsx
│   │   └── WalletConnect.tsx
│   └── employer/
│       ├── ContractStatus.tsx
│       ├── CreateContractForm.tsx
│       ├── DepositForm.tsx
│       └── TerminateSection.tsx
└── providers/
    ├── ContractProvider.tsx
    └── WalletProvider.tsx
```

## Token Binding Table

| UI element | Tailwind token | Source |
|---|---|---|
| Page bg | `bg-slate-50` | Visual identity |
| Shell container | `max-w-3xl mx-auto px-4 py-6` | Mobile-first lineamientos |
| Header | `fixed top-0 h-16 bg-white border-b border-slate-200` | System design |
| Status card active | `bg-green-50 border-l-4 border-green-500` | UXI Case 4 |
| Status card terminated | `bg-slate-50 border-l-4 border-slate-400` | UXI Case 5 |
| Primary action | `bg-[#1E3A5F] text-white rounded-lg` | Identity + buttons |
| Danger action | `bg-red-500 text-white rounded-lg` | Destructive action |
| Card surface | `bg-white rounded-xl shadow-sm border border-slate-200` | Patterns |
| Inline helper | `text-slate-500 text-sm` | Copy hierarchy |

## State Machine

| State | Trigger | UI result |
|---|---|---|
| `loading` | provider refresh | Skeleton or neutral loading |
| `no_contract` | no active contract found | Show `CreateContractForm` only |
| `active` | active contract found | Show status + deposit + terminate |
| `terminated` | contract ended | Read-only status and create-new CTA |
| `error` | fetch or sync fails | Error toast + retry CTA |

Child microstates are owned by the create, deposit, and terminate RFCs.

## Copy Catalog

| Key | Text |
|---|---|
| `PAGE_TITLE` | `Dashboard de Empleador` |
| `STATUS_ACTIVE` | `Contrato activo` |
| `STATUS_TERMINATED` | `Contrato terminado` |
| `NO_CONTRACT_HELP` | `Todavia no hay un contrato activo para esta wallet.` |
| `CREATE_NEW` | `Crear nuevo contrato` |
| `RETRY` | `Reintentar` |
| `UPDATED` | `Actualizado` |

## Accessibility Contract

- Use a main landmark and a single H1 for the dashboard title.
- Keep wallet and status changes in an `aria-live="polite"` region.
- All actions have visible labels, not icon-only buttons.
- Destroying actions never rely on color alone.
- Touch targets are at least 44x44px.

## Telemetry Spec

| Event | When | Useful fields |
|---|---|---|
| `employer_dashboard_viewed` | page loads | `state`, `hasContract` |
| `employer_contract_loaded` | provider resolves | `isTerminated`, `savingsPct`, `severancePct` |
| `employer_contract_missing` | no active contract | `walletSuffix` |
| `employer_refresh_tick` | polling cycle | `latencyMs` |
| `employer_shell_error` | read failure | `errorCode` |

## Test Assertions

- Renders the active, terminated, no-contract, and error shells.
- Only one active contract is assumed per wallet.
- Active shell exposes deposit and terminate sections.
- Terminated shell removes destructive controls.
- Header and wallet controls remain available across all states.
- Refresh does not wipe the visible shell state.

## Dependencies

- `UI-RFC-INDEX.md` step `E01`.
- `UI-RFC-EMPLOYER-CREATE-CONTRACT.md`.
- `UI-RFC-EMPLOYER-DEPOSIT.md`.
- `UI-RFC-EMPLOYER-TERMINATE-CONTRACT.md`.
- `ContractProvider`, `WalletProvider`, and shared header/toast primitives.

## Learning Notes

- The shell is an orchestrator, not a business-logic container.
- The "one active contract per wallet" rule should be visible in the UI model, not hidden in code.
- Every state should read as calm, explicit, and reversible only where the domain allows it.
