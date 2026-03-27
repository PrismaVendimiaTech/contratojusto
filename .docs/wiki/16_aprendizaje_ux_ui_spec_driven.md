# 16 - Aprendizaje UX/UI Spec-Driven

## Propósito

Registrar decisiones tomadas al traducir la experiencia deseada a contratos técnicos, para no reabrir las mismas discusiones en implementación.

## Aprendizajes actuales

### 1. `UXS` grande no equivale a unidad de implementación

Una pantalla puede contener varios momentos emocionales, varios estados y más de un journey. Para este repo, la unidad correcta de handoff es el paso crítico, no la pantalla completa.

### 2. El repo manda sobre la skill

La skill `crear-ui-rfc` trae una ruta por defecto (`src/frontend/web-next`) que no coincide con este proyecto. La fuente de verdad del repo es `packages/frontend/`.

### 3. Cuando no hay código, el inventario importa más

Como el frontend todavía no existe, la mayor defensa contra drift es clasificar componentes como `DOC-ONLY` o `RFC-FIRST` antes de crear archivos.

### 4. La entrada a la app también es producto

El `Home` no es solo un layout de bienvenida; define fricción, memoria de sesión y percepción de control. Por eso se fijó como gate inteligente con persistencia solo en sesión.

### 5. Los eventos oficiales necesitan voz propia

En este dominio, un depósito o una terminación no son “opiniones” del asistente. Necesitan una variante visual separada y trazable dentro del historial.

## Defaults elegidos

- Gate inteligente
- Rol recordado solo en sesión
- Eventos del trabajador como mensajes de sistema grises
- Un contrato activo por wallet para el dashboard employer
- Resultado del retiro con rastro visual persistente

## Deudas conscientes

- Falta una UXI específica para `Crear contrato`; por ahora hereda intención de cumplimiento y claridad del branch empleador.
- Falta implementación real del frontend y de los providers.
- Falta convertir la validación UX a evidencia de implementación una vez que exista código.
