# UI-RFC-EMPLOYER-DEPOSIT: Depositar

## Source

| Source | Use |
|---|---|
| `14_UXS.md` §Spec 3, estado "Contrato activo" | Deposit form, preview, history |
| `12_UXI.md` Caso 4 | Deposito como responsabilidad y claridad |
| `13_UJ.md` Viaje 4 | Patron deposita y el trabajador recibe notificacion |
| `10_patrones_ui.md` | `DepositForm`, `ContractStatus`, `Toast` |
| `10_identidad_visual.md` + `10_lineamientos_interfaz_visual.md` | Cards, colors, inputs, loading |
| `07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md` | App Router and write tx flow |
| `UI-RFC-DASHBOARD.md` | Macro de referencia solo como insumo |

Locked decisions:
- One active contract per wallet.
- Deposit preview must show the split before signing.
- After success, the visible history updates immediately.

## Component Decomposition

| Component | Path | Lifecycle | Notes |
|---|---|---|---|
| `DepositForm` | `packages/frontend/components/employer/DepositForm.tsx` | `EXTEND` | Main surface owned by this RFC |
| `AmountField` | `packages/frontend/components/employer/DepositForm.tsx` | `NEW` | Numeric USDC input |
| `SplitPreview` | `packages/frontend/components/employer/DepositForm.tsx` | `NEW` | Live 70/30 consequence view |
| `DepositHistory` | `packages/frontend/components/employer/DepositForm.tsx` | `NEW` | Recent deposits list |
| `SubmitButton` | `packages/frontend/components/shared/ActionButton.tsx` | `DOC-ONLY` | Shared primary action |

## TypeScript Interfaces

```ts
interface DepositFormProps {
  savingsPct: number;
  severancePct: number;
  totalDeposited: number;
  onDeposit: (amount: number) => Promise<void>;
  isSubmitting?: boolean;
}

interface DepositSplitPreview {
  amount: number;
  savingsAmount: number;
  severanceAmount: number;
}

interface DepositHistoryItem {
  at: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'failed';
}
```

## File Manifest

```text
packages/frontend/
├── app/
│   └── empleador/page.tsx
├── components/
│   └── employer/
│       └── DepositForm.tsx
├── lib/
│   ├── contract.ts
│   └── format.ts
└── providers/
    └── ContractProvider.tsx
```

## Token Binding Table

| UI element | Tailwind token | Source |
|---|---|---|
| Form card | `bg-white rounded-xl shadow-sm border border-slate-200 p-6` | Cards |
| Amount input | `border border-slate-300 rounded-lg px-4 py-3` | Inputs |
| Preview box | `bg-slate-50 rounded-lg border border-slate-200 p-4` | Split clarity |
| Savings amount | `text-emerald-600 font-semibold` | Positive money |
| Severance amount | `text-slate-500 font-semibold` | Neutral reserve |
| History row | `border-t border-slate-200 py-3` | Timeline |
| Primary submit | `bg-[#1E3A5F] text-white rounded-lg px-6 py-3` | Brand button |
| Loading state | `opacity-60 cursor-not-allowed` | Feedback |

## State Machine

| State | Trigger | UI result |
|---|---|---|
| `idle` | form visible | Empty amount or last value kept |
| `typing` | amount changes | Preview updates live |
| `invalid` | amount <= 0 or malformed | Inline error and disabled submit |
| `ready` | amount valid | Submit enabled |
| `signing` | submit clicked | Wallet handoff opens |
| `confirming` | signature accepted | Await chain confirmation |
| `success` | tx confirmed | Toast + clear field + refresh history |
| `error` | tx fails | Keep amount, show retry copy |

## Copy Catalog

| Key | Text |
|---|---|
| `TITLE` | `Depositar dolares` |
| `AMOUNT_LABEL` | `Monto` |
| `PREVIEW_LABEL` | `Preview del split` |
| `NOTE` | `Esto requiere firma en tu wallet.` |
| `SUBMIT` | `Depositar` |
| `SUBMITTING` | `Depositando...` |
| `SUCCESS` | `Deposito registrado. Ahorro +X, indemnizacion +Y.` |
| `ERROR` | `No se pudo completar el deposito.` |

## Accessibility Contract

- Amount input has an explicit label, not placeholder-only.
- Preview updates are announced with `aria-live="polite"`.
- Error text is linked to the input with `aria-describedby`.
- Submit uses a clear loading label while the wallet handoff is open.
- History rows are readable without color alone.

## Telemetry Spec

| Event | When | Useful fields |
|---|---|---|
| `deposit_form_opened` | form is shown | `hasActiveContract` |
| `deposit_amount_changed` | amount input changes | `amount`, `isValid` |
| `deposit_preview_updated` | split recomputes | `savingsAmount`, `severanceAmount` |
| `deposit_submit_clicked` | submit pressed | `amount`, `walletSuffix` |
| `deposit_wallet_opened` | write tx handoff starts | `contractId` |
| `deposit_success` | tx confirmed | `amount`, `historyCount` |
| `deposit_error` | tx fails | `errorCode` |

## Test Assertions

- Preview updates as the user types.
- Invalid amounts disable the button and show a clear message.
- Successful deposit refreshes totals and inserts a new history row.
- The shell stays in the active-contract state after success.
- Failed deposit keeps the drafted amount for retry.
- Only the active-contract wallet path can reach this form.

## Dependencies

- `UI-RFC-EMPLOYER-DASHBOARD-SHELL.md`.
- `UI-RFC-INDEX.md` step `E03`.
- `contract.ts` for deposit tx building.
- `format.ts` for currency and row copy.
- `ContractProvider` for active contract and history refresh.

## Learning Notes

- Deposit is a recordkeeping action, so the preview and the history need to be equally legible.
- The UI should sound responsible and calm, not transactional in a cold way.
- Immediate visual proof matters more than fancy motion.
