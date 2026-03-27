# UI-RFC-EMPLOYER-CREATE-CONTRACT: Crear Contrato

## Source

| Source | Use |
|---|---|
| `14_UXS.md` §Spec 3, estado "Sin contrato creado" | Layout y form preview |
| `12_UXI.md` Caso 4 | Sensacion de cumplimiento y claridad |
| `13_UJ.md` Viaje 4, fase patron | Flujo de creacion antes del deposito |
| `10_patrones_ui.md` | `CreateContractForm`, `ActionButton` |
| `10_identidad_visual.md` + `10_lineamientos_interfaz_visual.md` | Palette, cards, inputs y warning copy |
| `07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md` | `packages/frontend`, contract tx flow |
| `UI-RFC-DASHBOARD.md` | Macro de referencia solo como insumo |

Locked decisions:
- One active contract per wallet.
- Create contract must read like a compliance step, not a wizard.
- Preview must explain impact before signing.

## Component Decomposition

| Component | Path | Lifecycle | Notes |
|---|---|---|---|
| `CreateContractForm` | `packages/frontend/components/employer/CreateContractForm.tsx` | `EXTEND` | Main surface owned by this RFC |
| `WorkerAddressField` | `packages/frontend/components/employer/CreateContractForm.tsx` | `NEW` | Monospace Stellar address input |
| `SplitPercentInputs` | `packages/frontend/components/employer/CreateContractForm.tsx` | `NEW` | Savings and severance percentages |
| `SplitPreview` | `packages/frontend/components/employer/CreateContractForm.tsx` | `NEW` | Live consequence preview |
| `HelpPanel` | `packages/frontend/components/employer/CreateContractForm.tsx` | `NEW` | Explains what the address is |
| `SubmitButton` | `packages/frontend/components/shared/ActionButton.tsx` | `DOC-ONLY` | Shared primary action |

## TypeScript Interfaces

```ts
interface CreateContractFormProps {
  walletAddress: string;
  onSubmit: (draft: CreateContractDraft) => Promise<void>;
  isSubmitting?: boolean;
}

interface CreateContractDraft {
  workerAddress: string;
  savingsPct: number;
  severancePct: number;
}

interface CreateContractPreview {
  savingsPct: number;
  severancePct: number;
  summary: string;
}
```

## File Manifest

```text
packages/frontend/
├── app/
│   └── empleador/page.tsx
├── components/
│   └── employer/
│       └── CreateContractForm.tsx
├── lib/
│   ├── contract.ts
│   ├── format.ts
│   └── validation.ts
└── providers/
    ├── ContractProvider.tsx
    └── WalletProvider.tsx
```

## Token Binding Table

| UI element | Tailwind token | Source |
|---|---|---|
| Form card | `bg-white rounded-xl shadow-sm border border-slate-200 p-6` | Cards |
| Title | `text-slate-800 font-semibold text-lg` | Typography |
| Address input | `font-mono border border-slate-300 rounded-lg px-4 py-3` | Inputs |
| Percentage input | `border border-slate-300 rounded-lg px-4 py-3` | Inputs |
| Preview box | `bg-slate-50 border border-slate-200 rounded-lg p-4` | Clarity block |
| Valid state | `text-emerald-600` | Success |
| Invalid state | `text-red-600` | Error |
| Primary submit | `bg-[#1E3A5F] text-white rounded-lg px-6 py-3` | Brand button |
| Loading state | `opacity-60 cursor-not-allowed` | Feedback |

## State Machine

| State | Trigger | UI result |
|---|---|---|
| `idle` | form ready | Empty fields or defaults visible |
| `editing` | user types | Preview recomputes live |
| `invalid` | validation fails | Inline error + disabled submit |
| `ready` | all inputs valid | Submit enabled |
| `signing` | submit clicked | Wallet handoff opens |
| `confirming` | signature accepted | Wait for tx result |
| `success` | tx confirmed | Toast + shell refresh |
| `error` | tx or validation fails | Preserve draft, show retry |

## Copy Catalog

| Key | Text |
|---|---|
| `TITLE` | `Crear contrato` |
| `ADDRESS_LABEL` | `Direccion del trabajador` |
| `SAVINGS_LABEL` | `Porcentaje de ahorro` |
| `SEVERANCE_LABEL` | `Porcentaje de indemnizacion` |
| `HELP` | `La direccion del trabajador es su wallet Stellar y empieza con G.` |
| `PREVIEW_LABEL` | `Preview del split` |
| `SUM_ERROR` | `La suma debe ser 100%` |
| `SUBMIT` | `Crear contrato` |
| `SUBMITTING` | `Creando contrato...` |
| `SUCCESS` | `Contrato creado. Ya podes depositar.` |

## Accessibility Contract

- Each input has a visible label and an error message linked with `aria-describedby`.
- Address and percent fields announce validation changes without relying on color.
- Preview changes are exposed in `aria-live="polite"`.
- Submit is disabled while invalid or while the wallet handoff is open.
- Keyboard order is address -> ahorro -> indemnizacion -> submit.

## Telemetry Spec

| Event | When | Useful fields |
|---|---|---|
| `create_contract_opened` | form becomes visible | `walletSuffix` |
| `create_contract_address_changed` | address input changes | `length`, `isValid` |
| `create_contract_split_changed` | pct changes | `savingsPct`, `severancePct` |
| `create_contract_submit_clicked` | submit pressed | `isValid`, `previewSummary` |
| `create_contract_wallet_opened` | tx handoff starts | `contractVersion` |
| `create_contract_success` | tx confirmed | `workerSuffix` |
| `create_contract_error` | tx fails | `errorCode` |

## Test Assertions

- Defaults to a clear 70/30 split.
- Invalid address blocks submit and shows inline error.
- Percentages must sum to 100.
- Preview updates on every input change.
- Success refreshes the shell to the active-contract state.
- Draft values survive a transaction failure.
- The UI never hides the consequence of the contract being created.

## Dependencies

- `UI-RFC-EMPLOYER-DASHBOARD-SHELL.md`.
- `UI-RFC-INDEX.md` step `E02`.
- `validation.ts` for address and percentage rules.
- `contract.ts` for transaction building and wallet handoff.
- `format.ts` for address truncation and preview copy.

## Learning Notes

- Creation is a commitment step, so the preview should explain what will happen next.
- This RFC inherits the compliance/clarity intent from `12_UXI.md`.
- The one-active-contract rule belongs in the UI model and the error copy, not as a hidden assumption.
