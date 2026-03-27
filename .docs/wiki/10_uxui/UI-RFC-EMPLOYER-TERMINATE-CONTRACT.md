# UI-RFC-EMPLOYER-TERMINATE-CONTRACT: Terminar Contrato

## Source

| Source | Use |
|---|---|
| `14_UXS.md` §Spec 3, estado "Contrato activo" y "Contrato terminado" | Termination card and final state |
| `12_UXI.md` Caso 5 | Seriedad, justicia y cierre |
| `13_UJ.md` Viaje 4 | Patron termina y el trabajador recibe la indemnizacion |
| `10_patrones_ui.md` | `TerminateSection`, `ContractStatus`, `ActionButton`, `Toast` |
| `10_identidad_visual.md` + `10_lineamientos_interfaz_visual.md` | Red danger card, confirmation clarity |
| `07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md` | Write tx handoff and shell refresh |
| `UI-RFC-DASHBOARD.md` | Macro de referencia solo como insumo |

Locked decisions:
- Destructive actions need explicit confirmation.
- No modal is required for this MVP; inline confirmation is the default.
- One active contract per wallet means termination is terminal for the current contract.

## Component Decomposition

| Component | Path | Lifecycle | Notes |
|---|---|---|---|
| `TerminateSection` | `packages/frontend/components/employer/TerminateSection.tsx` | `EXTEND` | Main surface owned by this RFC |
| `TerminateWarningPanel` | `packages/frontend/components/employer/TerminateSection.tsx` | `NEW` | Explains the consequence |
| `TerminateInlineConfirm` | `packages/frontend/components/employer/TerminateSection.tsx` | `NEW` | Confirm / cancel inline controls |
| `TerminateResultSummary` | `packages/frontend/components/employer/TerminateSection.tsx` | `NEW` | Read-only state after success |
| `SubmitButton` | `packages/frontend/components/shared/ActionButton.tsx` | `DOC-ONLY` | Shared danger action |

## TypeScript Interfaces

```ts
interface TerminateSectionProps {
  severanceAmount: number;
  onTerminate: () => Promise<void>;
  isSubmitting?: boolean;
  isDisabled?: boolean;
}

interface TerminationSummary {
  terminatedAt: string;
  severanceAmount: number;
  workerAddress: string;
}

interface TerminateInlineState {
  mode: 'idle' | 'armed' | 'confirming' | 'submitting' | 'success' | 'error';
}
```

## File Manifest

```text
packages/frontend/
├── app/
│   └── empleador/page.tsx
├── components/
│   └── employer/
│       └── TerminateSection.tsx
├── lib/
│   ├── contract.ts
│   └── format.ts
└── providers/
    └── ContractProvider.tsx
```

## Token Binding Table

| UI element | Tailwind token | Source |
|---|---|---|
| Danger card | `bg-red-50 border-l-4 border-red-500 rounded-lg p-6` | Destructive state |
| Warning title | `text-red-800 font-semibold text-lg` | Serious copy |
| Warning body | `text-red-700 text-sm` | Explicit consequence |
| Confirm button | `bg-red-500 text-white rounded-lg px-6 py-3` | Danger action |
| Cancel button | `bg-white text-slate-700 border border-slate-300 rounded-lg px-6 py-3` | Recovery action |
| Terminated card | `bg-slate-50 border-l-4 border-slate-400 rounded-lg p-6` | Final state |
| Summary text | `text-slate-800 font-medium` | Visible proof |
| Loading state | `opacity-60 cursor-not-allowed` | Feedback |

## State Machine

| State | Trigger | UI result |
|---|---|---|
| `idle` | contract active and section visible | Show red terminate button |
| `armed` | user clicks terminate | Inline confirm + cancel appear |
| `confirming` | user checks consequence | Button focus moves to confirm |
| `submitting` | confirm clicked | Wallet handoff opens |
| `success` | tx confirmed | Terminated summary + toast |
| `error` | tx fails | Restore idle state and allow retry |
| `terminated` | shell refreshes with ended contract | Remove destructive controls |

## Copy Catalog

| Key | Text |
|---|---|
| `TITLE` | `Terminar contrato` |
| `WARNING` | `Esto liberara la indemnizacion al trabajador inmediatamente.` |
| `CONFIRM` | `Confirmar terminar?` |
| `CANCEL` | `Cancelar` |
| `SUBMITTING` | `Terminando...` |
| `SUCCESS` | `Contrato terminado. Indemnizacion liberada.` |
| `TERMINATED_BADGE` | `Terminado` |

## Accessibility Contract

- The inline confirm group has clear button labels and a shared description.
- The destructive action is announced with `aria-label` and not only red color.
- Result and error messages use `aria-live="assertive"` or `polite` as needed.
- No modal is used, so focus must stay inside the inline control group.
- Touch targets remain at least 44x44px.

## Telemetry Spec

| Event | When | Useful fields |
|---|---|---|
| `terminate_section_opened` | section becomes visible | `walletSuffix` |
| `terminate_confirm_shown` | user arms the action | `severanceAmount` |
| `terminate_cancelled` | user cancels | `reason='user_cancel'` |
| `terminate_submit_clicked` | confirm pressed | `contractId` |
| `terminate_wallet_opened` | write tx handoff starts | `walletSuffix` |
| `terminate_success` | tx confirmed | `terminatedAt`, `severanceAmount` |
| `terminate_error` | tx fails | `errorCode` |

## Test Assertions

- The section only appears when a contract is active.
- Clicking terminate reveals inline confirm and cancel controls.
- Cancel restores the original danger button.
- Confirm opens the wallet handoff and keeps the consequence explicit.
- Success hides the destructive controls and shows the terminated state.
- A second termination attempt is blocked by the shell state.

## Dependencies

- `UI-RFC-EMPLOYER-DASHBOARD-SHELL.md`.
- `UI-RFC-INDEX.md` step `E04`.
- `contract.ts` for terminate tx building.
- `format.ts` for the termination summary copy.
- `ContractProvider` for active contract and refresh after success.

## Learning Notes

- The copy must say what happens to the indemnizacion, immediately and without ambiguity.
- Inline confirmation is intentional: it fits the mobile-first anti-pattern rules and keeps the action visible.
- Termination ends the current contract, but it should not erase the historical proof of what happened.
