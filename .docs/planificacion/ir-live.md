# Ir Live

Date: 2026-03-27
Status: active
Owner: current repo session
Supersedes as live execution guide: `.docs/planificacion/2026-03-26-remediacion-ui-rfc-live.md`

## Goal and Release Bar

This document is the single operational plan to take `vendimia-tech` to a real live-ready demo on `turismo` while we continue a deep polish pass in parallel.

The release bar is strict:

- `build ok` is not enough
- `fixture` is not enough
- local-only validation is not enough
- partial deploy is not enough
- the cut requires a real end-to-end path from zero total

For this cut, "live" means:

- the app runs deployed on `turismo`
- the frontend is configured in `live` mode
- the contract and token IDs are real and final for the demo
- employer and worker can complete the critical path with real wallets
- the worker claim path signs and confirms a real transaction
- the demo can start from zero without hidden pre-seeded UI state

Current baseline on 2026-03-27:

- frontend lint, typecheck, and build already pass locally
- the remediation baseline exists in `.docs/planificacion/2026-03-26-remediacion-ui-rfc-live.md`
- the compiled contract artifact already exists at `packages/contract/target/wasm32-unknown-unknown/release/contrato_justo.wasm`
- `WalletConnect` is still a release blocker
- `turismo` deploy and live env completion are still pending

## Closed Decisions

These decisions are frozen for this plan and must not be reopened unless a blocker proves them impossible:

- `strategy`: `live-first`
- `polish_scope`: open
- `wallet_cut`: `WalletConnect` is mandatory for the release cut
- `demo_start`: from zero total
- `priority_rule`: live blockers always win over polish
- `runtime_rule`: `fixture` remains a developer fallback only and never counts as release evidence
- `wallet_rule`: the UI only exposes wallets that are actually validated in this repo and in the target environment
- `deploy_target`: `turismo`

Decision implications:

- Any task that touches wallet connection, wallet handoff, signing, submit, chain confirmation, runtime env, or Dokploy belongs to `Track A`.
- Any polish change that risks the real path must stop and yield to live work.
- We do not hide missing live readiness behind a stronger visual demo.

## Track A - Live Readiness

This track is blocker-only. If any item in this track is red, the release is not ready.

### A1. Chain Bootstrap

Objective: make the on-chain path concrete, repeatable, and funded for the demo.

Deliverables:

- choose the final demo network and freeze it in env
- define the real `employer` wallet and `worker` wallet used in the demo
- fund both wallets for fees and expected flows
- create all required trustlines before the rehearsal
- confirm the live contract exists and matches the frontend call surface
- register the final `CONTRACT_ID` and `TOKEN_ID`

Execution checklist:

- confirm the target contract artifact is the current one:
  - `packages/contract/target/wasm32-unknown-unknown/release/contrato_justo.wasm`
- confirm or deploy the live contract for the chosen network
- confirm or mint the token asset used by the contract flow
- capture the final contract ID in the live env contract
- capture the final token ID in the live env contract
- validate that both employer and worker wallets can query balances before the demo
- validate that both wallets have enough gas balance to survive retries

Evidence required:

- real `CONTRACT_ID`
- real `TOKEN_ID`
- wallet addresses frozen for the demo
- proof that balances and trustlines are ready

Red flags:

- contract deployed but frontend still points to placeholder or stale IDs
- wallets exist but are not funded
- token exists but worker cannot receive or claim
- hidden manual chain fixes required during the demo

### A2. Wallet Hardening

Objective: close the wallet path that will actually be used tomorrow, including `WalletConnect`.

Release rule:

- `WalletConnect` is required
- `WalletConnect` means a real connect + sign + submit capable path, not a visual toggle

Compatibility criteria for every wallet exposed in UI:

- connect succeeds from a fresh session
- address becomes visible in app state
- disconnect clears state correctly
- reconnect works after refresh or route change
- sign returns a usable signature payload
- submit or signed handoff completes the live transaction flow

Execution checklist:

- validate which wallet modules are actually enabled by `packages/frontend/lib/wallet.ts`
- validate browser desktop path for the primary demo wallet
- validate the `WalletConnect` path for the same critical actions
- keep disabled or unsupported wallets out of the production wallet picker
- ensure the wallet path used in `/empleador` and `/trabajador` is identical to the one used in rehearsal

Evidence required:

- one desktop-ready path fully validated
- one `WalletConnect` path fully validated
- no wallet shown in UI without validation notes

Red flags:

- wallet connects but cannot sign
- sign works locally but not in deployed `turismo`
- `WalletConnect` needs hidden local hacks or debug-only state
- wallet list overpromises support that has not been proven

### A3. Runtime Env

Objective: freeze one truthful live configuration and reuse it locally and in `turismo`.

Required local and deploy contract:

- `NEXT_PUBLIC_RUNTIME_MODE=live`
- `NEXT_PUBLIC_CONTRACT_ID`
- `NEXT_PUBLIC_TOKEN_ID`
- `NEXT_PUBLIC_SOROBAN_RPC_URL`
- `NEXT_PUBLIC_HORIZON_URL`
- `NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE`
- `NEXT_PUBLIC_STELLAR_SIMULATION_ADDRESS`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `AI_PROXY_URL`
- `AI_PROXY_KEY`
- `AI_MODEL`
- `DOKPLOY_URL`
- `DOKPLOY_API_KEY`
- `DOKPLOY_APP_ID`
- `DOKPLOY_PROJECT_ID`
- `DOKPLOY_ENVIRONMENT_ID`

Source-of-truth files:

- local dev contract: `.env.local` or equivalent untracked live file
- deploy contract: `infra/.env`
- documented contract: `infra/.env.example`

Execution checklist:

- populate `infra/.env` with final values
- verify local live run uses the same core IDs and URLs as `turismo`
- verify no `fixture` fallback is triggered silently when live env is incomplete
- confirm AI route env is present and valid in the deployed target
- confirm `WalletConnect` project ID is present wherever the wallet modal is expected to work

Evidence required:

- one env matrix showing local live and deploy live values come from the same truth set
- no placeholder IDs left in the live contract

Red flags:

- `.env.example` is more complete than the real runtime env
- local run works but `turismo` is missing one critical variable
- live mode boots with partial config and degrades into fake success

### A4. Turismo Deploy

Objective: make the deployed environment on `turismo` the same environment used in rehearsal.

Execution checklist:

- deploy via `dokploy-cli`
- confirm the app is attached to the correct Dokploy project and environment
- verify `/api/health`
- verify the base routes:
  - `/`
  - `/empleador`
  - `/trabajador`
- validate the deployed app reports or behaves as live, not fixture
- confirm the wallet handoff works from the real public deployment

Evidence required:

- healthy deploy on `turismo`
- passing health endpoint
- route smoke on the real URL

Red flags:

- local live works but deployed live does not
- the deployed build has stale env or stale artifacts
- the public URL uses different runtime assumptions than rehearsal

## Track B - Deep Polish

This track is allowed to advance only while `Track A` remains green or while a blocker is waiting on an external dependency. This track is preemptible.

### B1. Home, Role Gate, and App Shell

Polish goals:

- stronger first impression from zero total
- better address visibility and wallet status clarity
- cleaner role choice hierarchy
- sharper mobile and desktop spacing
- reduce visual friction before the first meaningful action

Guardrails:

- do not change wallet runtime behavior in the name of polish
- do not reintroduce hidden persistence or brittle auto-routing

### B2. Worker Chat Polish

Polish goals:

- tighten message rhythm and hierarchy
- improve balance result readability
- make system events feel trustworthy and distinct from AI voice
- make the signature CTA unmistakable without looking scary
- reduce ambiguity in success, waiting, and retry states

Guardrails:

- no polish may hide claim status, tx confirmation, or system event trace
- no polish may blur the distinction between `ai`, `user`, and `system`

### B3. Employer Dashboard Polish

Polish goals:

- clearer create/deposit/terminate sequencing
- stronger post-action feedback
- more confidence in form entry and review
- termination should feel serious but calm

Guardrails:

- no modal detours that contradict the approved flow
- no visual simplification that hides contract state or irreversible actions

### B4. Demo Flow Polish

Polish goals:

- remove awkward pauses
- reduce copy friction
- improve focus order and transition timing
- make the journey read as one coherent story

Guardrails:

- if a polish change touches runtime config, wallet handoff, AI tool calling, chain submit, or deployment behavior, it moves to `Track A`

## Cutover Config

This section defines the minimum configuration matrix that must exist before the live rehearsal is considered valid.

| Layer | Required artifact | Must be final before rehearsal | Notes |
| --- | --- | --- | --- |
| Chain | `CONTRACT_ID` | yes | Real live contract for the demo network |
| Chain | `TOKEN_ID` | yes | Real token or asset identifier used in the flow |
| Chain | employer wallet | yes | Funded and ready |
| Chain | worker wallet | yes | Funded and ready |
| Wallets | wallet module set in `lib/wallet.ts` | yes | UI must only expose validated options |
| Wallets | `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | yes | Mandatory for release |
| Runtime | `NEXT_PUBLIC_RUNTIME_MODE=live` | yes | No silent fallback to `fixture` |
| Runtime | Soroban RPC and Horizon URLs | yes | Must match the chosen network |
| Runtime | AI proxy config | yes | Required for the worker live path |
| Deploy | `infra/.env` | yes | Single deploy contract for `turismo` |
| Deploy | Dokploy app and environment IDs | yes | Must target the real app |
| Evidence | rehearsal checklist | yes | Must be completed from zero total |

Cutover rule:

- a config is not complete because it exists in docs
- a config is complete only when it is loaded, verified, and exercised in the deployed app

## From-Zero Demo Rehearsal

The demo must be rehearsed exactly as it will be shown tomorrow. No hidden warm state is allowed.

### Step 1. Open the deployed app

- precondition: public `turismo` URL is live and healthy
- action: open the public URL in a fresh session
- expected evidence: app loads cleanly and shows the real entry path
- acceptable visible error: temporary network lag with recoverable reload
- abort and retry if: the app loads in fixture mode or fails health

### Step 2. Connect the employer wallet from zero

- precondition: no cached session is assumed
- action: connect through the real wallet picker
- expected evidence: address appears correctly and employer path becomes usable
- acceptable visible error: wallet prompt canceled by the user
- abort and retry if: the wallet picker path differs from what will be shown tomorrow

### Step 3. Create the contract

- precondition: employer wallet is connected and funded
- action: create the contract with the final worker address and split
- expected evidence: success state is visible and contract state updates in UI
- acceptable visible error: recoverable validation or chain retry message
- abort and retry if: create relies on console logs, alerts, or hidden admin actions

### Step 4. Deposit funds

- precondition: contract exists and the employer wallet remains connected
- action: deposit the live amount for the rehearsal
- expected evidence: deposit success is visible and history or state refreshes
- acceptable visible error: temporary submit or confirmation retry
- abort and retry if: the UI loses visible trace of what happened

### Step 5. Switch to the worker path

- precondition: deposit already confirmed
- action: open `/trabajador` in a fresh worker context
- expected evidence: worker path loads with the same live runtime
- acceptable visible error: reconnect prompt
- abort and retry if: worker flow depends on hidden state from the employer browser

### Step 6. Connect the worker wallet from zero

- precondition: worker wallet is funded and ready
- action: connect using the real wallet path that will be shown tomorrow
- expected evidence: worker address is visible and the chat path is unlocked
- acceptable visible error: wallet reconnect prompt
- abort and retry if: the worker needs manual env or dev-only intervention

### Step 7. Ask AI for balance

- precondition: worker wallet is connected
- action: ask for the available balance through the chat
- expected evidence: a readable balance result appears in the worker timeline
- acceptable visible error: temporary AI retry with clear status
- abort and retry if: the app returns fake fixture data or loses the system trace

### Step 8. Prepare the claim

- precondition: balance is visible and claimable amount exists
- action: ask AI to prepare the claim transaction
- expected evidence: the worker sees a clear claim action with signing context
- acceptable visible error: explicit retry state
- abort and retry if: the timeline hides whether the tx is only prepared or already submitted

### Step 9. Sign and confirm the claim

- precondition: a valid claim transaction is prepared
- action: sign through the wallet and wait for real confirmation
- expected evidence: real success with tx confirmation and persistent visible trace
- acceptable visible error: recoverable timeout or chain retry
- abort and retry if: the UI marks success before real confirmation

### Step 10. Terminate the contract

- precondition: worker claim path is complete or the chosen contract state allows termination
- action: return to employer and execute termination with inline confirmation
- expected evidence: the destructive action is explicit and the final state updates visibly
- acceptable visible error: retryable chain confirmation delay
- abort and retry if: termination depends on hidden console, alert, or manual patching

### Step 11. Confirm final state

- precondition: all critical actions have completed
- action: verify the final employer and worker views
- expected evidence: the journey reads as complete and trustworthy
- acceptable visible error: none beyond cosmetic latency
- abort and retry if: final UI contradicts chain reality

## Acceptance Gates

The release cut is ready only if every gate below is green.

### Build and Runtime Gates

- `pnpm --filter frontend lint`
- `pnpm --filter frontend typecheck`
- `pnpm --filter frontend build`
- live local run with final env values
- no silent fallback to `fixture`

### Chain Gates

- final `CONTRACT_ID` frozen
- final `TOKEN_ID` frozen
- employer wallet funded
- worker wallet funded
- required trustlines created

### Wallet Gates

- one desktop path validated end-to-end
- `WalletConnect` validated end-to-end
- no unsupported wallet exposed in production UI
- connect, disconnect, reconnect, sign, and submit are all proven

### Employer Path Gates

- create contract works in live mode
- deposit works in live mode
- termination works in live mode
- every action leaves visible trace in the UI

### Worker Path Gates

- AI returns live balance
- AI prepares claim against the live runtime
- worker signs the real claim
- success only appears after real confirmation
- system events remain visible and distinct

### Deploy Gates

- app is deployed to `turismo`
- `/api/health` passes on the public deployment
- `/`, `/empleador`, and `/trabajador` load on the deployed app
- deployed runtime matches local live assumptions

### Rehearsal Gates

- the full rehearsal completes from zero total
- no hidden state outside the documented plan is required
- at least one clean repeat run succeeds after the first success

### Traceability Closure

Before calling the release ready:

- confirm the live plan still matches `.docs/wiki/14_UXS.md`
- confirm the release behavior still matches the worker and employer `UI-RFC-*`
- confirm `infra/.env.example`, `infra/README-live.md`, and this file tell the same operational story
- if reality changes, update the docs before claiming readiness

## Risks and Fallback Rules

These are operational rules, not optional notes.

- If `WalletConnect` misses the release criteria, the live cut is not ready.
- If the from-zero path fails on wallet onboarding, the live cut is not ready.
- If `turismo` does not match the validated local live config, the live cut is not ready.
- If a polish change breaks the real path, revert or postpone the polish change.
- `fixture` never counts as release evidence.
- Build warnings such as the current `sodium-native` warning are accepted only if they do not affect build success, wallet flow, chain flow, or deployed runtime behavior.
- No hidden scripts, admin-only fixes, or console patches may be required during the demo.
- The demo story must be repeatable by another operator using only this file, the env contract, and the deployed app.

Release decision rule:

- ship the live cut only when `Track A` is green and the rehearsal gates are green
- continue polish only while that state remains protected
