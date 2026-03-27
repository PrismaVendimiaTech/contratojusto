# Live Tomorrow Checklist

## 1. Completar `infra/.env`

- Copiar `infra/.env.example` a `infra/.env`.
- Cargar los IDs reales de Dokploy y las variables live de frontend.
- No commitear `infra/.env`.

## 2. Preparar runtime live

- Setear `NEXT_PUBLIC_RUNTIME_MODE=live`.
- Cargar `NEXT_PUBLIC_CONTRACT_ID`, `NEXT_PUBLIC_TOKEN_ID` y `NEXT_PUBLIC_STELLAR_SIMULATION_ADDRESS`.
- Confirmar `AI_PROXY_URL`, `AI_PROXY_KEY` y `AI_MODEL`.

## 3. Desplegar en `turismo`

- Usar `dokploy-cli`.
- Verificar auth con `x-api-key`.
- Redeploy de la app asociada a `DOKPLOY_APP_ID`.

## 4. Smoke remoto minimo

- Abrir `/api/health` y esperar `status=ok`.
- Conectar wallet empleador.
- Crear contrato.
- Depositar.
- Conectar wallet trabajador.
- Consultar balance desde chat.
- Preparar y firmar claim.
- Terminar contrato.

## 5. Cierre

- Correr `ps-trazabilidad`.
- Correr `ps-auditar-trazabilidad`.
- Actualizar `.docs/wiki` si cambian envs, IDs, flujo real o restricciones wallet.
