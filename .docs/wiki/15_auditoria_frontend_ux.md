# 15 - Auditoría Frontend UX

## Propósito

Consolidar en un documento canónico los gaps que hoy impiden pasar de `UXS` a frontend implementable sin drift.

## Estado general

- Base presente: manifiesto, identidad, lineamientos, patrones, `UXR`, `UXI`, `UJ`, `UXS`, `TECH-FRONTEND`.
- Base faltante al iniciar esta auditoría: `.docs/wiki/10_uxui/`, `UI-RFC-*`, matriz de validación UX, aprendizaje spec-driven.
- Estado del frontend al cierre de esta ola: `packages/frontend/` ya contiene `app/`, `components/`, `lib/`, `providers/`, runtime `fixture/live` y rutas API.

## Hallazgos estructurales

| ID | Severidad | Hallazgo | Impacto | Resolución actual |
|---|---|---|---|---|
| AUD-01 | Alta | `14_UXS` estaba escrita por pantallas grandes y no por pasos críticos | Bloquea paralelización y ownership técnico | Se parte en 10 `UI-RFC` atómicos |
| AUD-02 | Alta | La skill `crear-ui-rfc` asume `src/frontend/web-next/`, pero este repo usa `packages/frontend/` | Riesgo de generar manifests erróneos | Toda referencia técnica se normaliza a `packages/frontend/` |
| AUD-03 | Alta | No existía carpeta canónica `10_uxui` | No había lugar estable para contratos técnicos | Se crea `.docs/wiki/10_uxui/` |
| AUD-04 | Resuelto | El frontend implementado no existía al iniciar la auditoría | Bloqueaba pasar de RFC a código verificable | La estructura real ya existe y quedó en remediación activa |
| AUD-05 | Media | El directorio no tiene `.git` disponible en este entorno | Verificación de diffs limitada | Verificación se hace por lectura directa de archivos |

## Hallazgos UX/UI relevantes

| ID | Severidad | Hallazgo | Resolución |
|---|---|---|---|
| UX-01 | Alta | `Home` se comportaba como primera pantalla obligatoria, pero `UJ` describe accesos rutinarios y rápidos | `Home` pasa a gate inteligente con rol en sesión |
| UX-02 | Alta | Los eventos del trabajador no tenían ownership técnico estable | Se formalizan como `SystemEventMessage` gris dentro del chat |
| UX-03 | Media | El retiro exitoso podía “borrar” el estado del balance | El balance debe quedar actualizado o marcado como transferido |
| UX-04 | Media | `Create Contract` tenía flujo detallado pero sin contrato técnico separado | Se crea `UI-RFC-EMPLOYER-CREATE-CONTRACT.md` |
| UX-05 | Media | El dashboard podía interpretarse como multi-contrato | Se fija un solo contrato activo por wallet para MVP |

## Hallazgos de componentes

- `DOC-ONLY` al iniciar la auditoría: `Logo`, `AppHeader`, `WalletConnect`, `RoleCard`, `Toast`, `ChatFullscreen`, `ChatMessages`, `ChatBubble`, `LoadingIndicator`, `ChatInput`, `BalanceCard`, `SignTxButton`, `ContractStatus`, `CreateContractForm`, `DepositForm`, `TerminateSection`, `ActionButton`.
- `RFC-FIRST`: `SystemEventMessage`, `useWallet()`, `useContract()`.

## Hallazgos de infraestructura frontend

| ID | Severidad | Hallazgo | Acción posterior |
|---|---|---|---|
| FE-01 | Resuelto | Faltaba estructura base Next.js en `packages/frontend` | La estructura base ya está materializada |
| FE-02 | Media | Faltan archivos de config (`tsconfig`, `next.config`, `tailwind`, `postcss`) | Queda para fase de implementación |
| FE-03 | Media | La documentación técnica debe ser la guía de codegen/implementación | Se refuerza con `UI-RFC` y matriz de validación |

## Estado del bridge UX -> UI

- El set canónico de `UI-RFC` atómicos ya existe y está indexado en [10_uxui/UI-RFC-INDEX.md](./10_uxui/UI-RFC-INDEX.md).
- Los archivos `UI-RFC-HOME.md`, `UI-RFC-CHAT.md` y `UI-RFC-DASHBOARD.md` quedan solo como borradores pantalla-a-pantalla; no deben usarse como fuente de implementación.

## Blockers actuales para bajar a código

- Queda pendiente la validación live completa en `turismo`.
- WalletConnect sigue fuera del bundle productivo actual hasta resolver su integración estable con Next 15.
- Falta una ola de pruebas automatizadas si se quiere endurecer el frontend más allá de build + smoke.

## Fuentes

- `.docs/temp/gap-reports/20260326-ui-component-completeness.md`
- `.docs/temp/gap-reports/20260326-frontend-dependencies-env-config.md`
- `.docs/temp/gap-reports/ux-ui-chain-scan.md`
