# AGENTS.md

## 1. Project Purpose and Repo Shape

- `vendimia-tech` / `ContratoJusto` is a spec-driven hackathon monorepo for digital labor contracts on Stellar.
- Current delivery priority from [.docs/wiki/02_arquitectura.md](./.docs/wiki/02_arquitectura.md): `Velocidad de entrega > Demo funcional > Completitud`.
- Current stack snapshot:
  - `packages/contract/` - Soroban smart contract in Rust.
  - `packages/frontend/` - Next.js 15 + React 19 frontend package with App Router scaffold, providers, shared/chat/employer components, and API routes under active remediation.
  - Wallet integration uses Stellar Wallets Kit.
  - AI chat is expected to use Vercel AI SDK plus an OpenAI-compatible proxy.
- Canonical documentation root: `.docs/wiki/`.
- Canonical frontend UX handoff root: `.docs/wiki/10_uxui/`.
- Deployment and ops root: `infra/` with a local untracked `infra/.env`. The folder is materialized; secrets stay local only.
- Do not reintroduce historical layouts such as `src/frontend/web-next/`, `src/frontend/`, or `src/backend/`. For this repo the active code layout is `packages/*`.

## 2. Skill Invocation Semantics

- Start every non-trivial task with `ps-contexto`.
- After context load, run `brainstorming` once before planning or execution when decisions, tradeoffs, or missing assumptions remain.
- When the next documentation layer is unclear, run `ps-asistente-wiki` before choosing a deeper specialist skill.
- Use `$mi-lsp` first, always, for repository exploration, code navigation, docs-first Q&A, and batch reads. Bootstrap it or report the blocker before broad raw inspection in `packages/`.
- If the task edits `AGENTS.md` or `CLAUDE.md`, use `ps-crear-agentsclaudemd`.
- Use `writing-plans` when the user explicitly asks for a structured implementation plan after context is loaded.
- For spec-driven docs, use only the specialist skill that matches the target layer.
- For visible UX or UI work, enforce this canon in order:
  1. `.docs/wiki/10_manifiesto_marca_experiencia.md`
  2. `.docs/wiki/11_UXR.md`
  3. `.docs/wiki/12_UXI.md`
  4. `.docs/wiki/13_UJ.md`
  5. `.docs/wiki/14_UXS.md`
  6. `.docs/wiki/10_uxui/UI-RFC-*`
  7. `.docs/wiki/07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md`
  8. `packages/frontend/`
- `UXI` must exist before `UJ`.
- Lock the intended sensation explicitly in both `UJ` and `UXS`; never infer it silently from broader journey text.
- Create or update an atomic `UI-RFC` before structured frontend implementation when a touched step does not already have one.
- Use `request_user_input` when it is available in the current mode; otherwise ask directly in chat.
- Run `ps-trazabilidad` before closing every non-trivial task.
- Run `ps-auditar-trazabilidad` for large, risky, or multi-module changes.
- When a human decision is needed, use the full brainstorming question protocol one question at a time:
  1. learning context
  2. why it matters
  3. a small ASCII diagram
  4. options with pros and cons
  5. a recommended option

## 3. Workflow Catalog

### Standard Task Flow

1. Run `ps-contexto`.
2. Run `brainstorming` when open decisions remain.
3. Execute the change.
4. Run `ps-trazabilidad`.

### Large, Risky, or Multi-Module Change Flow

1. Run `ps-contexto`.
2. Run `brainstorming`.
3. If the user explicitly asked for delegation or parallel exploration, split the work into at least 2 disjoint agents when safe and keep the main agent focused on integration and final verification.
4. Execute and verify.
5. Run `ps-auditar-trazabilidad`.
6. Run `ps-trazabilidad`.

### AGENTS.md or CLAUDE.md Policy Change Flow

1. Run `ps-contexto`.
2. Use `ps-crear-agentsclaudemd`.
3. Update both policy files in the same task.
4. Verify structural and semantic parity, allowing only platform-specific tooling and prompting differences.

### Spec-Driven Wiki Flow

1. Run `ps-contexto`.
2. Run `brainstorming` if the next decision is still open.
3. If the next documentation layer is unclear, run `ps-asistente-wiki`.
4. Execute exactly one recommended specialist skill for the target layer.
5. Run `ps-trazabilidad`.

### Frontend UX-to-Code Flow

1. Run `ps-contexto`.
2. Run `brainstorming` if intent, interaction, or component boundaries are still open.
3. Load the relevant `10_*`, `11-15`, `10_uxui/`, and `07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md` context.
4. If `UXS` changed or no atomic RFC exists for the touched step, run `crear-ui-rfc` before writing code.
5. Implement only against `packages/frontend/`.
6. Update validation, audit, and learning docs when user-visible behavior changed.
7. Run `ps-trazabilidad`.

### Deployment or Troubleshooting Flow

1. Use `dokploy-cli` for Dokploy actions.
2. Use `ssh-remote` or direct `ssh turismo "..."` for host-level logs, filesystem checks, Docker inspection, and Traefik troubleshooting.
3. Keep `infra/.env` local and untracked.
4. Run `ps-trazabilidad` if deployment work changes repo docs, scripts, env contracts, or operational guidance.

## 4. Canonical Source of Truth

| Artifact | Path | Status |
| --- | --- | --- |
| Governance doc | `AGENTS.md` | Active |
| Claude governance mirror | `CLAUDE.md` | Active peer policy doc |
| Wiki governance doc | `.docs/wiki/00_gobierno_documental.md` | Expected canonical layer, currently missing |
| Scope doc | `.docs/wiki/01_alcance_funcional.md` | Active |
| Architecture doc | `.docs/wiki/02_arquitectura.md` | Active |
| FL index | `.docs/wiki/03_FL.md` | Active |
| FL docs folder | `.docs/wiki/FL/` | Active |
| RF index | `.docs/wiki/04_RF.md` | Active |
| RF docs folder | `.docs/wiki/RF/` | Not materialized; use `04_RF.md` until created |
| Data model doc | `.docs/wiki/05_modelo_datos.md` | Active |
| Test matrix | `.docs/wiki/06_matriz_pruebas_RF.md` | Expected canonical layer, currently missing |
| Test docs folder | `.docs/wiki/06_pruebas/` | Expected folder, currently missing |
| Technical baseline | `.docs/wiki/07_baseline_tecnica.md` | Active |
| Frontend system design | `.docs/wiki/07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md` | Active |
| Technical detail folder | `.docs/wiki/07_tech/` | Active |
| Physical data model | `.docs/wiki/08_modelo_fisico_datos.md` | Active |
| Physical detail folder | `.docs/wiki/08_db/` | Expected delegated folder, currently missing |
| Technical contracts | `.docs/wiki/09_contratos_tecnicos.md` | Active |
| Contract detail folder | `.docs/wiki/09_contratos/` | Expected delegated folder, currently missing |
| Experience manifesto | `.docs/wiki/10_manifiesto_marca_experiencia.md` | Active |
| Visual identity | `.docs/wiki/10_identidad_visual.md` | Active |
| Interface guidelines | `.docs/wiki/10_lineamientos_interfaz_visual.md` | Active |
| UI patterns | `.docs/wiki/10_patrones_ui.md` | Active |
| UI-RFC index | `.docs/wiki/10_uxui/UI-RFC-INDEX.md` | Active canonical handoff index |
| UI-RFC prefix | `.docs/wiki/10_uxui/UI-RFC-` | Active canonical prefix |
| UX component inventory | `.docs/wiki/10_uxui/UX-COMPONENTS.md` | Active |
| UXR index | `.docs/wiki/11_UXR.md` | Active |
| UXR docs folder | `.docs/wiki/UXR/` | Not materialized; use `11_UXR.md` until created |
| UXI index | `.docs/wiki/12_UXI.md` | Active |
| UXI docs folder | `.docs/wiki/UXI/` | Not materialized; use `12_UXI.md` until created |
| UJ index | `.docs/wiki/13_UJ.md` | Active |
| UJ docs folder | `.docs/wiki/UJ/` | Not materialized; use `13_UJ.md` until created |
| UXS index | `.docs/wiki/14_UXS.md` | Active |
| UXS docs folder | `.docs/wiki/UXS/` | Not materialized; use `14_UXS.md` until created |
| UX audit doc | `.docs/wiki/15_auditoria_frontend_ux.md` | Active |
| UX validation matrix | `.docs/wiki/15_matriz_validacion_ux.md` | Active |
| UX evidence folder | `.docs/wiki/15_evidence/` | Expected evidence folder, currently missing |
| Process learning doc | `.docs/wiki/16_aprendizaje_ux_ui_spec_driven.md` | Active |

Layering note:

- `00-06` are the functional truth, although `00` and `06` are still missing in this repo.
- `07+` are the technical truth.
- `10_*` are the global experience and visual canon.
- `11-15` are the case-level UX canon and validation layers.
- `.docs/wiki/10_uxui/` is the canonical bridge between `14_UXS` and frontend implementation.

## 5. Placeholder Mapping

| Placeholder | Resolved path | Notes |
| --- | --- | --- |
| `<GOVERNANCE_DOC>` | `AGENTS.md` | Active Codex governance doc |
| `<WIKI_GOVERNANCE_DOC>` | `.docs/wiki/00_gobierno_documental.md` | Expected canonical layer, missing today |
| `<ALCANCE_DOC>` | `.docs/wiki/01_alcance_funcional.md` | Active |
| `<ARQUITECTURA_DOC>` | `.docs/wiki/02_arquitectura.md` | Active |
| `<FL_INDEX_DOC>` | `.docs/wiki/03_FL.md` | Active |
| `<FL_DOCS_DIR>` | `.docs/wiki/FL/` | Active |
| `<RF_INDEX_DOC>` | `.docs/wiki/04_RF.md` | Active |
| `<RF_DOCS_DIR>` | `.docs/wiki/RF/` | Not materialized; fall back to `04_RF.md` |
| `<MODELO_DATOS_DOC>` | `.docs/wiki/05_modelo_datos.md` | Active |
| `<TP_INDEX_DOC>` | `.docs/wiki/06_matriz_pruebas_RF.md` | Expected canonical layer, missing today |
| `<TP_DOCS_DIR>` | `.docs/wiki/06_pruebas/` | Expected folder, missing today |
| `<BASELINE_TECNICA_DOC>` | `.docs/wiki/07_baseline_tecnica.md` | Active |
| `<FRONTEND_SYSTEM_DESIGN_DOC>` | `.docs/wiki/07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md` | Active |
| `<MODELO_FISICO_DOC>` | `.docs/wiki/08_modelo_fisico_datos.md` | Active |
| `<CONTRATOS_TECNICOS_DOC>` | `.docs/wiki/09_contratos_tecnicos.md` | Active |
| `<MANIFIESTO_EXPERIENCIA_DOC>` | `.docs/wiki/10_manifiesto_marca_experiencia.md` | Active |
| `<IDENTIDAD_VISUAL_DOC>` | `.docs/wiki/10_identidad_visual.md` | Active |
| `<LINEAMIENTOS_INTERFAZ_DOC>` | `.docs/wiki/10_lineamientos_interfaz_visual.md` | Active |
| `<PATRONES_UI_DOC>` | `.docs/wiki/10_patrones_ui.md` | Active |
| `<UI_RFC_INDEX_DOC>` | `.docs/wiki/10_uxui/UI-RFC-INDEX.md` | Active |
| `<UI_RFC_PREFIX>` | `.docs/wiki/10_uxui/UI-RFC-` | Use for atomic UI-RFC generation |
| `<UX_COMPONENTS_DOC>` | `.docs/wiki/10_uxui/UX-COMPONENTS.md` | Active |
| `<UXR_INDEX_DOC>` | `.docs/wiki/11_UXR.md` | Active |
| `<UXI_INDEX_DOC>` | `.docs/wiki/12_UXI.md` | Active |
| `<UJ_INDEX_DOC>` | `.docs/wiki/13_UJ.md` | Active |
| `<UXS_INDEX_DOC>` | `.docs/wiki/14_UXS.md` | Active |
| `<UX_AUDIT_DOC>` | `.docs/wiki/15_auditoria_frontend_ux.md` | Active |
| `<UXV_DOC>` | `.docs/wiki/15_matriz_validacion_ux.md` | Active |
| `<UXV_EVIDENCE_DIR>` | `.docs/wiki/15_evidence/` | Expected folder, missing today |
| `<LEARNING_DOC>` | `.docs/wiki/16_aprendizaje_ux_ui_spec_driven.md` | Active |

## 6. Local Search Playbook

- Use `$mi-lsp` as the mandatory first tool for repository exploration.
- Do not start source-code exploration with broad raw file reads or broad `rg` scans in `packages/` while `$mi-lsp` can answer the question.
- If `$mi-lsp` is unavailable, repair `PATH`, bootstrap the workspace, or report the blocker before falling back to raw inspection.
- Prefer `mi-lsp` commands like these first:

```powershell
mi-lsp workspace status vendimia-tech --format compact
mi-lsp nav ask "how is this workspace organized?" --workspace vendimia-tech --format compact
mi-lsp nav workspace-map --workspace vendimia-tech --format compact
mi-lsp nav search "UI-RFC" --include-content --workspace vendimia-tech --format compact
mi-lsp nav multi-read AGENTS.md:1-220 CLAUDE.md:1-220 .docs/wiki/10_uxui/UI-RFC-INDEX.md:1-220 --workspace vendimia-tech --format compact
mi-lsp nav related <symbol> --workspace vendimia-tech --format compact
mi-lsp nav service packages/frontend --workspace vendimia-tech --format compact
```

- Use `rg` only for narrow follow-up inspection or doc-only lookups, for example:

```powershell
rg -n "UI-RFC-|UXR-|UXI-|UJ-|UXS-" .docs/wiki/10_* .docs/wiki/11_UXR.md .docs/wiki/12_UXI.md .docs/wiki/13_UJ.md .docs/wiki/14_UXS.md .docs/wiki/10_uxui
rg -n "packages/frontend|packages/contract|src/frontend/web-next" AGENTS.md CLAUDE.md .docs/wiki
rg -n "turismo|DOKPLOY_|dokploy-cli|x-api-key" AGENTS.md CLAUDE.md .docs
rg -n "FL-0[1-7]|RF-|USDC|Soroban|wallet" .docs/wiki/03_FL.md .docs/wiki/FL .docs/wiki/04_RF.md
```

- Never use `.docs/wiki/14_UXS.md.bak` as a source of truth.
- When `infra/` is materialized locally, include it in deploy-oriented searches.

## 7. Documentation Synchronization Rule

When changing contracts, states, errors, entities, or flows, review and update as applicable:

- `.docs/wiki/03_FL.md`
- `.docs/wiki/FL/`
- `.docs/wiki/04_RF.md`
- `.docs/wiki/05_modelo_datos.md`
- `.docs/wiki/06_matriz_pruebas_RF.md` when it exists; until then, call out the missing layer explicitly in closure notes

When changing technical implementation details, also review and update:

- `.docs/wiki/07_baseline_tecnica.md`
- `.docs/wiki/07_tech/`
- `.docs/wiki/08_modelo_fisico_datos.md`
- `.docs/wiki/09_contratos_tecnicos.md`
- delegated `08_db/` and `09_contratos/` folders when they are created

When changing visible UX, UI, or frontend behavior, also review and update as applicable:

- `AGENTS.md` and `CLAUDE.md` if governance changed
- `.docs/wiki/10_manifiesto_marca_experiencia.md`
- `.docs/wiki/10_identidad_visual.md`
- `.docs/wiki/10_lineamientos_interfaz_visual.md`
- `.docs/wiki/10_patrones_ui.md`
- `.docs/wiki/11_UXR.md`
- `.docs/wiki/12_UXI.md`
- `.docs/wiki/13_UJ.md`
- `.docs/wiki/14_UXS.md`
- `.docs/wiki/10_uxui/UI-RFC-INDEX.md`
- affected `.docs/wiki/10_uxui/UI-RFC-*.md`
- `.docs/wiki/15_auditoria_frontend_ux.md`
- `.docs/wiki/15_matriz_validacion_ux.md`
- `.docs/wiki/16_aprendizaje_ux_ui_spec_driven.md`
- `.docs/wiki/07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md`

- If no atomic `UI-RFC` exists for a touched critical step, create it before implementation.

## 8. Traceability Closure Rules

- Run `ps-trazabilidad` before closing every non-trivial task that changed docs, code, contracts, states, UX, UI, or deployment guidance.
- Run `ps-auditar-trazabilidad` for large, risky, or multi-module changes before final closure.
- When functional behavior changed, verify the chain from `01_alcance_funcional` -> `02_arquitectura` -> `03_FL` and `.docs/wiki/FL/` -> `04_RF` -> `05_modelo_datos`.
- When technical behavior changed, verify the chain from `07_baseline_tecnica` -> `07_tech` -> `08_modelo_fisico_datos` -> `09_contratos_tecnicos` -> `packages/*`.
- When visible UX or UI behavior changed, verify this chain explicitly:

```text
10_manifiesto_marca_experiencia
  -> 11_UXR
  -> 12_UXI
  -> 13_UJ
  -> 14_UXS
  -> 10_uxui/UI-RFC
  -> 07_tech/TECH-FRONTEND-SYSTEM-DESIGN
  -> packages/frontend
```

- If a required layer is missing, such as `00_gobierno_documental`, `06_matriz_pruebas_RF`, `15_evidence/`, or any not-materialized folder placeholder, record it as a blocker or explicit accepted gap. Never claim completion by implication.
- For UX closures, confirm whether `15_matriz_validacion_ux.md`, `15_auditoria_frontend_ux.md`, and `16_aprendizaje_ux_ui_spec_driven.md` were updated or were explicitly not needed.
- For frontend closures, confirm the canonical docs no longer point to `src/frontend/web-next/`.

## 9. Deployment Infrastructure

- Target deployment host: `turismo`.
- Prefer `dokploy-cli` over Dokploy MCP for redeploys, env updates, domains, and troubleshooting.
- For Codex on Windows, prefer the installed PowerShell wrapper under the local skill path, usually `~/.agents/skills/dokploy-cli/scripts/dkp.ps1`. On POSIX, use the matching `dkp.sh` wrapper.
- Prefer `ssh-remote` for SSH operations. If it is unavailable, fall back to direct `ssh turismo "..."`.
- This repo should use a local untracked `infra/.env` searched upward from the working directory by `dokploy-cli`. The `infra/` folder is materialized in-repo as the tracked contract and template location.
- Minimum expected keys in `infra/.env`:
  - `DOKPLOY_URL`
  - `DOKPLOY_API_KEY`
  - `DOKPLOY_APP_ID`
  - `DOKPLOY_PROJECT_ID`
  - `DOKPLOY_ENVIRONMENT_ID`
- Optional project-specific aliases or extra Dokploy IDs may exist locally, but never store secrets in tracked docs.
- Dokploy API auth uses the `x-api-key` header. Never use `Authorization: Bearer`.
- Default Dokploy base URL in this environment is `http://dokploy.gestionturismo.xyz:3000` unless local `infra/.env` overrides it.
- Suggested first checks:

```powershell
& $DKP doctor
& $DKP status $env:DOKPLOY_APP_ID
& $DKP redeploy $env:DOKPLOY_APP_ID
```

- Use SSH fallback on `turismo` for live container logs, Traefik files, Docker inspection, or filesystem cleanup when the API is insufficient.

## 10. Platform-Specific Collaboration Notes

- Use `request_user_input` when it is available in the current mode; otherwise ask directly.
- Use `spawn_agent` or the `dispatching-parallel-agents` skill only when the user explicitly asks for delegation or parallel exploration. When that happens and the split is safe, prefer at least 2 disjoint agents and keep the main agent focused on integration.
- Keep `AGENTS.md` and `CLAUDE.md` fully self-contained and aligned. Do not delegate policy meaning to the other file.
- Keep reusable workflow logic in `ps-*` skills and repo-specific rules in this file.
- Keep governance docs in English. The wiki under `.docs/wiki/` may stay in Spanish.
- Avoid emojis in governance and documentation outputs.
- Non-canonical and legacy exclusions:
  - `.docs/wiki/14_UXS.md.bak` is a backup, not a source of truth.
  - `.docs/wiki/10_uxui/UI-RFC-HOME.md`, `UI-RFC-CHAT.md`, and `UI-RFC-DASHBOARD.md` are screen-level drafts only. The atomic RFC set indexed in `.docs/wiki/10_uxui/UI-RFC-INDEX.md` is canonical for implementation.
  - Do not treat missing folders as implicitly satisfied. Materialize them or call out the gap.
