# Track Hedera

Actualizado: 2026-03-25

## Resumen corto

`Hedera` mezcla dos cosas distintas:

- `Ideathon`: foco negocio, validacion y pitch
- `Hackathon`: foco tecnico en `pagos a traves de agentes de IA`

Para un novato, esto es interesante porque la modalidad idea es accesible, y la modalidad tecnica esta mejor conectada con tooling moderno que otros ecosistemas gracias a:

- EVM support
- Remix / Hardhat
- `Hedera AI Agent Kit`
- `Stablecoin Studio`

## Que pide exactamente el track

### Ideathon

- pool `500 USD`
- premios:
  - 1 puesto `250 USD`
  - 2 puesto `150 USD`
  - 3 puesto `100 USD`
- desafio:
  - crear una startup en 48h o resolver un problema real de la region usando los estudios/toolkits de Hedera
- criterio:
  - validacion
  - viabilidad comercial
  - buen pitch
  - justificar `por que Hedera`

### Hackathon

- pool total `1500 USD`
- premios:
  - 1 puesto `300 USD`
  - 2 puesto `200 USD`
  - adicional: `1000 USD` repartidos entre todos los proyectos que cumplan requisitos obligatorios
- desafio:
  - construir soluciones de `pagos a traves de agentes de IA`

Este detalle importa mucho: a veces en Hedera no hace falta ganar el primer puesto para capturar valor; cumplir bien puede ya dar acceso al pool compartido.

## Que hace especial a Hedera para esta hackathon

El track no te pide "cualquier app". Empuja un cruce muy especifico:

- agentes
- pagos
- herramientas institucionales
- casos del mundo real

Eso encaja mejor con productos de:

- asistencia financiera conversacional
- operaciones de pagos para pymes/ONG
- tesoreria simple
- subsidios o desembolsos condicionados

## Lo minimo que debes entender

### Para Ideathon

- que problema resuelves
- por que usar Hedera en vez de una app comun
- si tu caso necesita:
  - pagos
  - trazabilidad
  - gobernanza
  - compliance
  - estabilidad

### Para Hackathon

Ademas:

- como conectar testnet
- como conseguir HBAR de testnet
- como desplegar algo EVM compatible
- como un agente IA puede disparar o asistir pagos

## Stack util para empezar

### Ruta EVM sencilla

La doc oficial de Hedera tiene tutoriales para:

- agregar Hedera a MetaMask
- usar faucet de testnet
- desplegar contratos con `Remix`
- desplegar y verificar con `Hardhat`

Eso reduce la curva si ya te mueves mejor con JS que con herramientas exoticas.

### Ruta agentica

La `Hedera AI Agent Kit` se presenta como un framework open source para apps impulsadas por LLM que interactuan con la red. La documentacion destaca:

- arquitectura por plugins
- integracion con `LangChain`
- herramientas para:
  - cuentas
  - tokens
  - smart contracts
  - topics HCS
  - scheduling
- SDK en `JavaScript` y `Python`

Para la hackathon, esto es oro porque conecta directamente con el tema del track.

### Ruta enterprise

`Stablecoin Studio` y otras soluciones abiertas de Hedera sirven para justificar productos de pagos o tesoreria con lenguaje de negocio serio.

## Ruta minima de onboarding

1. Crear wallet/test account en testnet.
2. Obtener `100 testnet HBAR` con el faucet.
3. Elegir una de estas rutas:
   - `Remix + contrato minimo`
   - `Hardhat + contrato minimo`
   - `Agent Kit + simulacion de pagos`
4. Diseñar un caso donde el agente:
   - explique
   - recomiende
   - prepare
   - o ejecute una accion de pago

## Observacion importante sobre cuentas

La documentacion del faucet explica el flujo de `auto account creation` cuando ingresas una direccion de wallet EVM. Eso vuelve el onboarding mas razonable para un novato, pero igual conviene probarlo con tiempo porque Hedera tiene matices propios en la gestion de cuentas.

## Ideas sociales que mejor encajan

### 1. Agente para becas, viaticos y ayudas

El agente puede:

- responder dudas
- verificar requisitos
- preparar el pago
- dejar rastro verificable

Este es probablemente el mejor fit con el track.

### 2. Asistente de cobro para microcomercios

Un agente que:

- genera solicitudes de pago
- explica montos y estados
- ayuda a cobrar sin friccion

### 3. Asistente para ONG o mutuales

Un panel + agente que:

- distribuye ayuda
- consulta el estado de fondos
- genera evidencia para auditoria

## MVP calificable recomendado

La version mas realista para hackathon no es un agente completamente autonomo con 20 tools. Es:

- un frontend o bot simple
- un flujo muy claro de pago
- una o dos acciones reales sobre testnet
- una historia de usuario bien contada

Por ejemplo:

- "Solicitar ayuda"
- "Evaluar elegibilidad"
- "Autorizar pago"
- "Ejecutar pago"
- "Mostrar comprobante"

## Riesgos del track

### Riesgo 1: hacer "AI wrapper" sin pagos reales

El track tecnico habla de `payments through AI agents`. Si el agente solo conversa y no conecta con una accion economica, pierde fuerza.

### Riesgo 2: sobrecargarte de tooling

Agent Kit, Stablecoin Studio, Playground, MetaMask, Hardhat, HCS, HTS: todo junto es demasiado. Debes elegir una sola historia.

### Riesgo 3: hablar enterprise sin resolver UX

Aunque Hedera tenga tooling institucional, la demo igual necesita ser entendible.

## Valoracion honesta para un novato

- Accesibilidad `Ideathon`: `4.5/5`
- Accesibilidad `Hackathon`: `3.5/5`
- Encaje con IA: `muy alto`
- Encaje con impacto social: `muy alto`
- Riesgo si mantienes alcance chico: `medio-bajo`

## Cuando elegir Hedera

Elige Hedera si:

- te entusiasma hacer un producto de `agentes + pagos`
- quieres sonar serio ante jurado de negocio y tecnologia
- valoras poder bajar a testnet y EVM sin tanta friccion

## Fuentes

- https://dorahacks.io/hackathon/2040/tracks
- https://docs.hedera.com/hedera/getting-started-evm-developers/hedera-testnet-faucet
- https://docs.hedera.com/hedera/getting-started-evm-developers/deploy-a-smart-contract-using-remix
- https://docs.hedera.com/hedera/getting-started-evm-developers/deploy-a-smart-contract-with-hardhat
- https://docs.hedera.com/hedera/open-source-solutions/ai-studio-on-hedera/hedera-ai-agent-kit
- https://docs.hedera.com/hedera/open-source-solutions/stablecoin-studio
