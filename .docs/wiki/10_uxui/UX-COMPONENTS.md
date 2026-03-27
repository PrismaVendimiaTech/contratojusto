# UX Components Inventory

## Propósito

Inventario reconciliado de componentes UX/UI para `ContratoJusto`. Este documento separa lo que hoy existe solo en documentación de lo que falta formalizar o implementar.

## Estados

- `DOC-ONLY`: existe en specs, no en código.
- `RFC-FIRST`: no debe implementarse sin `UI-RFC`.
- `SHARED`: reusable entre más de un flujo.

## Inventario

| Component | Estado | Tipo | Fuente principal | Target path | UI-RFC dueño |
|---|---|---|---|---|---|
| `Logo` | DOC-ONLY | SHARED | `14_UXS`, `10_identidad_visual` | `packages/frontend/components/shared/Logo.tsx` | `UI-RFC-SHARED-APP-SHELL.md` |
| `AppHeader` | DOC-ONLY | SHARED | `14_UXS`, `07_tech` | `packages/frontend/components/shared/AppHeader.tsx` | `UI-RFC-SHARED-APP-SHELL.md` |
| `WalletConnect` | DOC-ONLY | SHARED | `10_patrones_ui`, `07_tech` | `packages/frontend/components/shared/WalletConnect.tsx` | `UI-RFC-SHARED-ROLE-GATE.md` |
| `Toast` | DOC-ONLY | SHARED | `10_lineamientos_interfaz_visual` | `packages/frontend/components/shared/Toast.tsx` | `UI-RFC-SHARED-APP-SHELL.md` |
| `RoleCard` | DOC-ONLY | SHARED | `14_UXS`, `10_patrones_ui` | `packages/frontend/components/home/RoleCard.tsx` | `UI-RFC-SHARED-ROLE-GATE.md` |
| `ChatFullscreen` | DOC-ONLY | SHARED | `07_tech`, `14_UXS` | `packages/frontend/components/chat/ChatFullscreen.tsx` | `UI-RFC-WORKER-CHAT-SHELL.md` |
| `ChatMessages` | DOC-ONLY | SHARED | `07_tech`, `10_patrones_ui` | `packages/frontend/components/chat/ChatMessages.tsx` | `UI-RFC-WORKER-CHAT-SHELL.md` |
| `ChatBubble` | DOC-ONLY | SHARED | `10_patrones_ui` | `packages/frontend/components/chat/ChatBubble.tsx` | `UI-RFC-WORKER-CHAT-SHELL.md` |
| `SystemEventMessage` | RFC-FIRST | SHARED | `14_UXS`, `13_UJ` | `packages/frontend/components/chat/SystemEventMessage.tsx` | `UI-RFC-WORKER-SYSTEM-EVENTS.md` |
| `LoadingIndicator` | DOC-ONLY | SHARED | `14_UXS`, `10_patrones_ui` | `packages/frontend/components/shared/LoadingIndicator.tsx` | `UI-RFC-WORKER-CHAT-SHELL.md` |
| `ChatInput` | DOC-ONLY | SHARED | `10_patrones_ui` | `packages/frontend/components/chat/ChatInput.tsx` | `UI-RFC-WORKER-CHAT-SHELL.md` |
| `BalanceCard` | DOC-ONLY | SHARED | `10_patrones_ui`, `14_UXS` | `packages/frontend/components/shared/BalanceCard.tsx` | `UI-RFC-WORKER-BALANCE-QUERY.md` |
| `SignTxButton` | DOC-ONLY | SHARED | `10_patrones_ui` | `packages/frontend/components/shared/SignTxButton.tsx` | `UI-RFC-WORKER-CLAIM-SIGN.md` |
| `ContractStatus` | DOC-ONLY | EMPLOYER | `10_patrones_ui`, `14_UXS` | `packages/frontend/components/employer/ContractStatus.tsx` | `UI-RFC-EMPLOYER-DASHBOARD-SHELL.md` |
| `CreateContractForm` | DOC-ONLY | EMPLOYER | `10_patrones_ui`, `14_UXS` | `packages/frontend/components/employer/CreateContractForm.tsx` | `UI-RFC-EMPLOYER-CREATE-CONTRACT.md` |
| `DepositForm` | DOC-ONLY | EMPLOYER | `10_patrones_ui` | `packages/frontend/components/employer/DepositForm.tsx` | `UI-RFC-EMPLOYER-DEPOSIT.md` |
| `TerminateSection` | DOC-ONLY | EMPLOYER | `10_patrones_ui`, `14_UXS` | `packages/frontend/components/employer/TerminateSection.tsx` | `UI-RFC-EMPLOYER-TERMINATE-CONTRACT.md` |
| `ActionButton` | DOC-ONLY | SHARED | `10_patrones_ui` | `packages/frontend/components/shared/ActionButton.tsx` | Shared utility across RFCs |

## Hooks y providers asociados

| Hook/provider | Estado | Target path | Owner |
|---|---|---|---|
| `WalletProvider` | DOC-ONLY | `packages/frontend/providers/WalletProvider.tsx` | Shared shell + role gate |
| `useWallet()` | RFC-FIRST | `packages/frontend/providers/WalletProvider.tsx` | Shared shell + role gate |
| `ContractProvider` | DOC-ONLY | `packages/frontend/providers/ContractProvider.tsx` | Worker + employer shells |
| `useContract()` | RFC-FIRST | `packages/frontend/providers/ContractProvider.tsx` | Worker + employer shells |

## Notas

- Ningún componente UI existe todavía en `packages/frontend/`; todos están en fase `DOC-ONLY`.
- Cualquier componente nuevo que aparezca durante implementación debe agregarse primero a este inventario o a `10_patrones_ui.md`.
