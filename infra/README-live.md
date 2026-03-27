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
  - operator, CI/`turismo`, and explicitly trusted permanent developers only
  - includes deploy, runtime, and operational secrets

Current platform constraint:

- the Infisical free plan on `teslita` does not allow assigning custom project roles to human members
- because of that, the temporary hackathon access is implemented with a revocable `service token` scoped to `demo-window`, not with a human `viewer` user
- the fallback human user may exist in the organization for recovery, but it must stay without project membership unless the plan changes
- trusted long-lived collaborators should use a dedicated read-only `ops` service token or an operator-prepared offline bundle, not the temporary hackathon token

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

If `mkey run` is blocked by the current wrapper bug, use the temporary service token path prepared by the operator for `demo-window` and avoid persisting plaintext env files.

Optional checks:

```powershell
& $MKEY run vendimia-tech demo-window -- pnpm --filter frontend lint
& $MKEY run vendimia-tech demo-window -- pnpm --filter frontend typecheck
& $MKEY run vendimia-tech demo-window -- pnpm --filter frontend build
```

Only the operator should generate or persist `infra/.env` locally.

### Permanent trusted developer outside tailnet

If a collaborator needs ongoing local access and is not on the tailnet:

- prepare an offline bundle outside the repo with:
  - `vendimia-tech.infra.env`
  - demo accounts / wallet material needed for local signing
  - a read-only `ops` service token for later refreshes
- the preferred bootstrap is:

```powershell
powershell -ExecutionPolicy Bypass -File .\bootstrap-vendimia-tech.ps1 -RepoPath C:\ruta\a\vendimia-tech
```

- if the vault later becomes reachable from that machine, the collaborator can refresh from `ops` with the operator-provided token instead of requesting secrets manually again
- if `WalletConnect` is not preconfigured in the bundle, the supported local path is Freighter or another Stellar wallet that can import the provided secret keys

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

- revoke the temporary `demo-window` service token used for the hackathon window
- remove any human fallback user from project membership if it was re-added manually
- revoke any developer-scoped machine identities or access tokens
- verify that a developer identity can no longer run:

```powershell
& $MKEY run vendimia-tech demo-window -- pnpm --filter frontend dev
```

Important:

- this cutoff blocks future retrieval from the official secret system
- it does not remotely erase plaintext `.env` files that were already copied to a developer machine

## 6. AI proxy keys

`vendimia-tech` should not depend on a shared expiring AI key anymore.

Current expectation for this repo:

- `demo-window` uses a dedicated micro-proxy key for temporary runtime access
- `ops` uses a separate dedicated micro-proxy key for operator and trusted developer workflows
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
