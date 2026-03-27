# Live And Secrets Runbook

## 1. Secret distribution model

`vendimia-tech` uses `mkey` as the canonical secret entrypoint.

- Primary vault: Infisical (`teslita`)
- Local plaintext file: `infra/.env` (untracked)
- Repo-tracked contract: `infra/.env.example` and `infra/.env.template`
- Backup channel: SOPS + age for operator continuity only

Two vault projects now exist:

- `vendimia-tech`
  - main project
  - contains `demo-window` and `ops`
  - `ops` is for operator, CI/`turismo`, and explicitly trusted permanent developers only
  - includes deploy, runtime, and operational secrets
- `vendimia-tech-public`
  - public-only project
  - contains only the minimal runtime subset needed outside tailnet
  - is the only project assigned to the temporary public user

Current access model:

- Infisical is now reachable publicly at `https://vault.nuestrascuentitas.com`
- permanent trusted collaborators should use a dedicated human user with access to:
  - `vendimia-tech`
  - `vendimia-tech-public`
- the temporary hackathon user must only have `viewer` access to `vendimia-tech-public`
- `DOKPLOY_*` and other operational secrets stay only in `ops` under the main project
- SOPS backup remains operator/continuity-only and is not a distribution channel for teammates

Operator-only local prerequisites in `infra/.env`:

- `INFISICAL_ADMIN_EMAIL`
- `INFISICAL_ADMIN_PASSWORD`
- `INFISICAL_DEFAULT_ORGANIZATION`
- `INFISICAL_VENDIMIA_PUBLIC_TEMP_EMAIL`

Programadores should prefer `mkey run` instead of `mkey pull` so secrets stay process-local whenever possible.

For a copyable teammate handoff, see `infra/DEV-ONBOARDING.md`.

## 2. Repo bootstrap

Tracked files:

- `infra/.env.example`
- `infra/.env.template`
- `infra/mkey.yaml`
- `.sops.yaml`
- `infra/secrets.enc.env` after the first operator-only `mkey backup`

Untracked file:

- `infra/.env`

First-time bootstrap:

```powershell
$MKEY = "$HOME\\.agents\\skills\\mi-key-cli\\scripts\\mkey.ps1"
& $MKEY init
& $MKEY doctor
& $MKEY login teslita
```

## 3. Developer onboarding before the cutoff

Expected flow for temporary public access:

```powershell
$MKEY = "$HOME\\.agents\\skills\\mi-key-cli\\scripts\\mkey.ps1"
& $MKEY run vendimia-tech-public dev -- pnpm --filter frontend dev
```

If `mkey run` is blocked by the current wrapper bug, use the operator-prepared offline bundle and avoid persisting extra plaintext env files outside the intended local `infra/.env`.

Optional checks:

```powershell
& $MKEY run vendimia-tech-public dev -- pnpm --filter frontend lint
& $MKEY run vendimia-tech-public dev -- pnpm --filter frontend typecheck
& $MKEY run vendimia-tech-public dev -- pnpm --filter frontend build
```

Only the operator should generate or persist `infra/.env` locally.

### Permanent trusted developer outside tailnet

If a collaborator needs ongoing local access and is not on the tailnet:

- create a dedicated human Infisical user for that collaborator
- give that user project access to:
  - `vendimia-tech`
  - `vendimia-tech-public`
- the preferred bootstrap is:

```powershell
$MKEY = "$HOME\\.agents\\skills\\mi-key-cli\\scripts\\mkey.ps1"
& $MKEY login teslita
& $MKEY run vendimia-tech ops -- pnpm --filter frontend dev
```

- if the collaborator needs a fast no-questions path, the operator may still hand over the offline bootstrap bundle
- that bundle is now a convenience path, not the primary path
- if `WalletConnect` is not preconfigured in the workstation, the supported local path is Freighter or another Stellar wallet that can import the provided secret keys

## 4. Runtime live checklist

Frontend runtime (build-time, `NEXT_PUBLIC_*`):

- `NEXT_PUBLIC_RUNTIME_MODE=live`
- `NEXT_PUBLIC_CONTRACT_ID`
- `NEXT_PUBLIC_TOKEN_ID`
- `NEXT_PUBLIC_STELLAR_SIMULATION_ADDRESS`
- `NEXT_PUBLIC_SOROBAN_RPC_URL` (defaults to testnet if unset)
- `NEXT_PUBLIC_HORIZON_URL` (defaults to testnet if unset)
- `NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE` (defaults to testnet if unset)
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (required for WalletConnect)
- `NEXT_PUBLIC_WALLETCONNECT_APP_NAME`
- `NEXT_PUBLIC_WALLETCONNECT_APP_URL`
- `NEXT_PUBLIC_WALLETCONNECT_APP_DESCRIPTION`
- `NEXT_PUBLIC_WALLETCONNECT_APP_ICON`

Server runtime (not embedded in client bundle):

- `AI_PROXY_URL`
- `AI_PROXY_KEY`
- `AI_MODEL`

Ops-only (deploy infrastructure):

- `DOKPLOY_URL`
- `DOKPLOY_API_KEY`
- `DOKPLOY_APP_ID`
- `DOKPLOY_PROJECT_ID`
- `DOKPLOY_ENVIRONMENT_ID`

## 5. Cutoff window

The temporary developer access window ends on:

- `Sunday 2026-03-29 23:00` in `America/Buenos_Aires`

At that time:

- remove the temporary public human user from `vendimia-tech-public`
- revoke any temporary public service token if one was issued as fallback
- verify the temporary public user no longer sees any project in Infisical
- verify that a developer identity can no longer run:

```powershell
& $MKEY run vendimia-tech-public dev -- pnpm --filter frontend dev
```

Important:

- this cutoff blocks future retrieval from the official secret system
- it does not remotely erase plaintext `.env` files that were already copied to a developer machine

Manual revocation command:

```powershell
pwsh -ExecutionPolicy Bypass -File .\infra\revoke-public-temp-access.ps1
pwsh -ExecutionPolicy Bypass -File .\infra\revoke-public-temp-access.ps1 -Execute
```

- the first command is a dry-run
- the second command deletes the temporary public user's organization membership
- the script resolves the target from `INFISICAL_VENDIMIA_PUBLIC_TEMP_EMAIL` by default, but it also accepts `-TargetEmail`

## 6. AI proxy keys

`vendimia-tech` should not depend on a shared expiring AI key anymore.

Current expectation for this repo:

- `vendimia-tech-public/dev` uses a dedicated micro-proxy key for temporary runtime access
- `vendimia-tech/ops` uses a separate dedicated micro-proxy key for operator and trusted developer workflows
- if either key must be rotated, update the vault first and then refresh any offline bundles derived from `ops`

## 7. Deploy to `turismo`

Only the operator or CI/`turismo` should have `ops` access for:

- `DOKPLOY_URL`
- `DOKPLOY_API_KEY`
- `DOKPLOY_APP_ID`
- `DOKPLOY_PROJECT_ID`
- `DOKPLOY_ENVIRONMENT_ID`

Deploy workflow:

- use `dokploy-cli`
- authenticate with `x-api-key`
- redeploy the app linked to `DOKPLOY_APP_ID`
- verify `/api/health`

## 8. Remote smoke minimum

- open `/api/health` and expect `status=ok`
- connect employer wallet
- create contract
- deposit
- connect worker wallet
- query balance through chat
- prepare and sign claim
- terminate contract

## 9. Closure

- run `ps-trazabilidad`
- run `ps-auditar-trazabilidad`
- update `.docs/wiki` when live envs, IDs, flow, or wallet constraints change
