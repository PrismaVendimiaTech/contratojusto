# Track Stellar

Actualizado: 2026-03-25

## Resumen corto

`Stellar` es el track mas amable para alguien que empieza de cero porque ofrece dos puertas:

- `Ideathon`: propuesta fuerte, sin codigo
- `Hackathon`: app funcional con codigo

Ademas, el ecosistema esta muy orientado a `pagos`, `activos`, `wallets`, `anchors` y `protocolos estandarizados`, que son casos muy utiles para productos sociales.

## Que pide exactamente el track

### Modalidades y premios

- `Ideathon`
  - pool `500 USD`
  - 1 puesto `300 USD`
  - 2 puesto `200 USD`
- `Hackathon`
  - pool `1500 USD`
  - 1 puesto `700 USD`
  - 2 puesto `600 USD`
  - 3 puesto `200 USD`

### Restriccion de equipos

- equipos de `2 a 5 integrantes`
- puede ser hibrido
- al menos `1 persona presencial`

### Regla de stack

La pagina del track pide integrar alguno de estos componentes del ecosistema:

- `Soroban`
- `SDKs`
- `CAPs/SEPs`
- wallets
- anchors

Para `Ideathon`, alcanza con explicar bien como se usarian.

### Entregables

#### Hackathon

- repo publico
- demo funcional accesible por link
- video demo + pitch
- deck
- evidencia de validacion del problema

#### Ideathon

- deck
- video pitch
- validacion de mercado

## Por que Stellar es interesante para valor social

Stellar es especialmente fuerte cuando el problema es:

- pagos transfronterizos
- becas o ayudas
- pagos a freelancers o cooperativas
- rails de cobro y retiro
- interoperabilidad entre wallets y servicios

La documentacion oficial tiene una capa muy util de `Anchor Platform` y `SEPs`, que son estandares para resolver problemas reales, no solo demos de smart contracts.

## Lo minimo que debes entender

### Si vas por Ideathon

- que es Stellar
- por que sirve para mover valor
- que es un `anchor`
- que resuelve `SEP-31` para pagos transfronterizos
- como una wallet usuaria se integraria

### Si vas por Hackathon

Ademas de lo anterior:

- como crear una cuenta en testnet
- como fondearla con Friendbot
- como usar `Stellar Lab`
- si usas Soroban: nocion basica de contrato y CLI

## Ruta minima de onboarding

### Para idea validada

1. Entender un caso de uso de pagos reales.
2. Mapear el flujo a:
   - usuario
   - wallet
   - anchor o emision de activo
   - validacion/KYC si aplica
3. Explicar por que Stellar es mejor que una base de datos comun.

### Para MVP tecnico

1. Crear keypair/testnet account.
2. Fonsear con `Friendbot` o `Stellar Lab`.
3. Elegir una de estas rutas:
   - demo de wallet + transferencias
   - prototipo usando `SEP-31`
   - pequeño contrato `Soroban`
4. Publicar frontend/demo.

## Ruta tecnica recomendada para novatos

### Mejor opcion

No arrancar por un contrato complejo en Soroban si todavia no entiendes el problema. Primero conviene una demo de:

- pagos
- cuentas
- activos
- flujo de usuario

### Cuando Soroban si tiene sentido

Usalo si de verdad necesitas:

- reglas programables de liberacion
- vouchers
- escrow
- logica de asignacion

## Herramientas oficiales utiles

### Stellar CLI

La doc oficial propone instalarlo con:

- script en macOS/Linux
- `winget` en Windows
- `cargo` desde fuente

### Stellar Lab

Es ideal para novatos porque permite:

- crear cuentas
- fondear en testnet con Friendbot
- probar smart contracts
- explorar endpoints

### Soroban

La documentacion oficial tiene un flujo de `hello world` en Rust con `stellar contract init`, que sirve como referencia de proyecto minimo.

## Casos sociales donde Stellar encaja mejor

### 1. Remesas familiares o pagos transfronterizos

Es el caso mas natural. `SEP-31` existe exactamente para una categoria parecida.

### 2. Becas y viaticos

Sirve mucho para:

- desembolsos programados
- activos digitales ligados a un programa
- trazabilidad de entrega

### 3. Cobros a trabajadores remotos o cooperativas

Especialmente si el dolor principal es:

- costo de mover dinero
- demora
- opacidad del estado del pago

## MVP calificable recomendado

### Opcion A: la mas segura

`Ideathon` con una propuesta muy fuerte, validada y con flujo detallado.

### Opcion B: la mas interesante si llegas

Frontend + flujo de testnet donde:

- el usuario crea o conecta cuenta
- recibe un pago o voucher
- ve estado e historial
- se muestra claramente donde entra Stellar

No hace falta resolver toda la infraestructura real del mundo para mostrar valor.

## Riesgos del track

### Riesgo 1: hacer un deck lindo sin integrar bien el stack

Aunque Ideathon no pida codigo, si no explicas concretamente:

- que SEP o componente usas
- que actor hace que
- por que Stellar resuelve el problema

la propuesta queda debil.

### Riesgo 2: meterte muy rapido en Soroban Rust

Es una gran herramienta, pero puede robar tiempo si todavia no tienes claro el flujo de negocio.

### Riesgo 3: ignorar validacion

El track explicitamente pide `evidencia de validacion del problema`. Sin eso, la idea parece inventada para hackathon.

## Valoracion honesta para un novato

- Accesibilidad `Ideathon`: `5/5`
- Accesibilidad `Hackathon`: `3.5/5`
- Tiempo para un MVP serio: `bajo a medio`
- Encaje con impacto social: `muy alto`
- Encaje con pagos reales: `excelente`
- Riesgo total: `bajo` si mantienes el alcance chico

## Decision recomendada

Si necesitas una ruta de menor riesgo, `Stellar` es el mejor track para diseñar una idea social fuerte que:

- pueda competir como `Ideathon`
- y, si llegas, escalar a un `Hackathon MVP`

## Fuentes

- https://dorahacks.io/hackathon/2040/tracks
- https://developers.stellar.org/docs/build
- https://developers.stellar.org/docs/tools/cli/install-cli
- https://developers.stellar.org/docs/tools/lab
- https://developers.stellar.org/docs/build/smart-contracts/getting-started/hello-world
- https://developers.stellar.org/docs/platforms/anchor-platform/sep-guide/sep31
