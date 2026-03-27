# 10 UXUI - Índice de UI-RFC

## Propósito

Traducir la `14_UXS` monolítica a contratos técnicos atómicos y paralelizables, sin perder trazabilidad con `UXI`, `UJ`, patrones y system design.

## Convenciones del repositorio

- Los `UI-RFC` de este proyecto viven en `.docs/wiki/10_uxui/`.
- El frontend real del repo vive en `packages/frontend/`. Toda referencia histórica a `src/frontend/web-next/` se considera obsoleta para este repositorio.
- El naming de RFCs prioriza claridad operacional sobre rigidez del template original.

## Matriz de pasos críticos

| Step ID | Experiencia | Fuente UXS | UJ relacionados | UXI relacionados | UI-RFC | Estado |
|---|---|---|---|---|---|---|
| S01 | App shell compartido | Home, Chat, Dashboard | UJ-01, UJ-02, UJ-03, UJ-04 | Global `calmo-seguro` | `UI-RFC-SHARED-APP-SHELL.md` | RFC definido |
| S02 | Gate de rol y wallet | Home | UJ-02, UJ-03 | Global + caso 3 parcial | `UI-RFC-SHARED-ROLE-GATE.md` | RFC definido |
| W01 | Chat shell trabajador | Chat Trabajador | UJ-02, UJ-03, UJ-04 trabajador | Casos 1, 2, 3, 5 parcial | `UI-RFC-WORKER-CHAT-SHELL.md` | RFC definido |
| W02 | Consulta de balance | Chat Trabajador | UJ-02 | Caso 1 | `UI-RFC-WORKER-BALANCE-QUERY.md` | RFC definido |
| W03 | Retiro y firma | Chat Trabajador | UJ-03 | Caso 2 | `UI-RFC-WORKER-CLAIM-SIGN.md` | RFC definido |
| W04 | Eventos de sistema | Chat Trabajador + Dashboard side-effects | UJ-01, UJ-04 trabajador | Casos 3 y 5 parcial | `UI-RFC-WORKER-SYSTEM-EVENTS.md` | RFC definido |
| E01 | Dashboard shell empleador | Dashboard Empleador | UJ-01, UJ-04 empleador | Casos 4 y 5 | `UI-RFC-EMPLOYER-DASHBOARD-SHELL.md` | RFC definido |
| E02 | Crear contrato | Dashboard Empleador | UJ-01 | Caso 4 heredado | `UI-RFC-EMPLOYER-CREATE-CONTRACT.md` | RFC definido |
| E03 | Depositar | Dashboard Empleador | UJ-01 | Caso 4 | `UI-RFC-EMPLOYER-DEPOSIT.md` | RFC definido |
| E04 | Terminar contrato | Dashboard Empleador | UJ-04 empleador | Caso 5 | `UI-RFC-EMPLOYER-TERMINATE-CONTRACT.md` | RFC definido |

## Decisiones activas

- `Home` es un gate inteligente, no un peaje permanente.
- El rol se conserva solo en sesión.
- Los eventos oficiales del trabajador quedan en historial como mensajes de sistema grises.
- El dashboard employer opera un solo contrato activo por wallet para el MVP.
- El resultado del retiro debe dejar un rastro visible del nuevo estado.

## Dependencias transversales

- [UX-COMPONENTS.md](./UX-COMPONENTS.md)
- [15_auditoria_frontend_ux.md](../15_auditoria_frontend_ux.md)
- [15_matriz_validacion_ux.md](../15_matriz_validacion_ux.md)
- [07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md](../07_tech/TECH-FRONTEND-SYSTEM-DESIGN.md)

## Definition of Done

- Cada paso crítico tiene un `UI-RFC` propio.
- Cada `UI-RFC` referencia `packages/frontend/...`.
- Cada `UI-RFC` declara componentes `EXISTS`, `EXTEND`, `DOC-ONLY` o `NEW`.
- La matriz de validación UX cubre todos los pasos y `NUNCA tests`.

## Notas de canon

- `UI-RFC-HOME.md`, `UI-RFC-CHAT.md` y `UI-RFC-DASHBOARD.md` se conservan como borradores pantalla-a-pantalla. La fuente de verdad para implementación es el set atómico listado arriba.
