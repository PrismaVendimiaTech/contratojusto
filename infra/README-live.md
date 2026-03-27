# Live And Secrets Runbook

## 1. Secret distribution model

`vendimia-tech` uses `mkey` as the canonical secret entrypoint.

- Primary vault: Infisical (`teslita`)
- Local plaintext file: `infra/.env` (untracked)
- Repo-tracked contract: `infra/.env.example` and `infra/.env.template`
- Backup channel: SOPS + age for operator continuity only

Two secret scopes must exist in the vault:

- `demo-window`
  - temporary developer access
  - enough to run the repo locally in live mode
  - must not include `DOKPLOY_*`
- `ops`
  - only for the operator and CI/`turismo`
  - includes deploy and operational secrets

Programadores should prefer `mkey run` instead of `mkey pull` so secrets stay process-local whenever possible.

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

Expected flow for programadores:

```powershell
$MKEY = "$HOME\\.agents\\skills\\mi-key-cli\\scripts\\mkey.ps1"
& $MKEY run vendimia-tech demo-window -- pnpm --filter frontend dev
```

Optional checks:

```powershell
& $MKEY run vendimia-tech demo-window -- pnpm --filter frontend lint
& $MKEY run vendimia-tech demo-window -- pnpm --filter frontend typecheck
& $MKEY run vendimia-tech demo-window -- pnpm --filter frontend build
```

Only the operator should generate or persist `infra/.env` locally.

## 4. Runtime live checklist

- `NEXT_PUBLIC_RUNTIME_MODE=live`
- `NEXT_PUBLIC_CONTRACT_ID`
- `NEXT_PUBLIC_TOKEN_ID`
- `NEXT_PUBLIC_STELLAR_SIMULATION_ADDRESS`
- `AI_PROXY_URL`
- `AI_PROXY_KEY`
- `AI_MODEL`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` when WalletConnect is enabled

## 5. Cutoff window

The temporary developer access window ends on:

- `Sunday 2026-03-29 23:00` in `America/Buenos_Aires`

At that time:

- remove all programadores from the `demo-window` environment in Infisical
- revoke any developer-scoped machine identities or access tokens
- verify that a developer identity can no longer run:

```powershell
& $MKEY run vendimia-tech demo-window -- pnpm --filter frontend dev
```

Important:

- this cutoff blocks future retrieval from the official secret system
- it does not remotely erase plaintext `.env` files that were already copied to a developer machine

## 6. AI proxy expiration

The current `AI_PROXY_KEY` for `micro-proxy` expires on:

- `Monday 2026-03-30 00:00` in `America/Buenos_Aires`

Current expectation for this repo:

- the app may lose AI capability after that timestamp
- that behavior is acceptable for the temporary developer window
- if AI must remain available after midnight, rotate the key before expiration and update the `ops` environment first

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
