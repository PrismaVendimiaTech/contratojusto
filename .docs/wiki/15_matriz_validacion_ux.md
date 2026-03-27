# 15 - Matriz de Validación UX

## Propósito

Verificar que cada paso crítico del recorrido tenga intención UX clara, contrato técnico asociado y criterios de aceptación verificables.

## Matriz principal

| Step ID | Paso crítico | UJ | UXI | UXS | UI-RFC | Validación clave | Estado |
|---|---|---|---|---|---|---|---|
| S01 | App shell compartido | UJ-01/02/03/04 | Global `calmo-seguro` | Home, Chat, Dashboard | `UI-RFC-SHARED-APP-SHELL.md` | Header, wallet chip, settings, toast y navegación consistentes | RFC definido |
| S02 | Gate de rol y wallet | UJ-02/03 | Global + caso 3 parcial | Home | `UI-RFC-SHARED-ROLE-GATE.md` | El gate solo aparece cuando falta contexto y no persiste rol fuera de sesión | RFC definido |
| W01 | Chat shell trabajador | UJ-02/03/04 trabajador | Casos 1, 2, 3, 5 parcial | Chat Trabajador | `UI-RFC-WORKER-CHAT-SHELL.md` | Layout fullscreen, input fijo, loading y suggested prompts | RFC definido |
| W02 | Consulta de balance | UJ-02 | Caso 1 | Chat Trabajador | `UI-RFC-WORKER-BALANCE-QUERY.md` | Balance visible, claro, protegido y sin jerga técnica | RFC definido |
| W03 | Retiro y firma | UJ-03 | Caso 2 | Chat Trabajador | `UI-RFC-WORKER-CLAIM-SIGN.md` | Flujo de firma claro, reversible hasta firmar, con rastro post-éxito | RFC definido |
| W04 | Eventos de sistema | UJ-01/04 trabajador | Caso 3 parcial + caso 5 parcial | Chat Trabajador + side-effects dashboard | `UI-RFC-WORKER-SYSTEM-EVENTS.md` | Contrato creado, depósito y terminación quedan en historial gris | RFC definido |
| E01 | Dashboard shell empleador | UJ-01/04 empleador | Casos 4 y 5 | Dashboard Empleador | `UI-RFC-EMPLOYER-DASHBOARD-SHELL.md` | Un contrato activo por wallet, estados claros y timeline coherente | RFC definido |
| E02 | Crear contrato | UJ-01 | Caso 4 heredado | Dashboard Empleador | `UI-RFC-EMPLOYER-CREATE-CONTRACT.md` | Validación de address, split y preview antes de firmar | RFC definido |
| E03 | Depositar | UJ-01 | Caso 4 | Dashboard Empleador | `UI-RFC-EMPLOYER-DEPOSIT.md` | Preview de split, confirmación y actualización inmediata de historial | RFC definido |
| E04 | Terminar contrato | UJ-04 empleador | Caso 5 | Dashboard Empleador | `UI-RFC-EMPLOYER-TERMINATE-CONTRACT.md` | Acción irreversible explícita y cierre limpio del contrato | RFC definido |

## NUNCA tests transversales

| ID | NUNCA | Cobertura esperada |
|---|---|---|
| N-01 | Nunca mostrar términos blockchain al trabajador | Chat, system events, confirmations |
| N-02 | Nunca perder el rastro visual de una operación crítica | Retiro, depósito, terminación |
| N-03 | Nunca pedir persistencia de wallet/rol fuera de sesión sin decisión explícita | Gate, app shell |
| N-04 | Nunca dejar una acción destructiva sin confirmación clara | Terminar contrato |
| N-05 | Nunca mezclar evento oficial del sistema con opinión del AI sin distinguir variante visual | Chat shell, system events |

## Regla de cierre

Esta matriz no pasa a `Completado` hasta que:

- exista el `UI-RFC` enlazado,
- la auditoría frontend UX no marque blocker nuevo,
- y la implementación futura demuestre el criterio de validación.
