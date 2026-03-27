# Track BNB Chain

Actualizado: 2026-03-25

## Resumen corto

Este track busca `apps de consumo masivo` que combinen `IA + Web3` y corran sobre `BSC` u `opBNB`. Es el track mas alineado con bots, agentes, asistentes conversacionales, mini apps y productos "consumer".

Si vienes de frontend/JavaScript y aceptas hacer una integracion onchain minima pero real, es una ruta viable.

## Que pide exactamente el track

Segun la pagina oficial del evento:

- Tema oficial: `Next-Gen Consumer AI`
- Premios:
  - 1 lugar: `800 USD`
  - 2 lugar: `400 USD`
  - 3 lugar: `300 USD`
- Modalidad: `hibrida`
- El pitch deck no es obligatorio, pero suma

### Entregables obligatorios

- demo funcional desplegada
- repositorio publico con README claro
- video demo de `2 a 3 minutos`
- `prueba onchain obligatoria`

### Prueba tecnica minima obligatoria

El track exige que el smart contract este desplegado en `BSC` u `opBNB` y que registre al menos `2 transacciones exitosas` durante la hackathon.

Eso cambia por completo la estrategia: sin transacciones onchain reales, este track no califica.

## Criterios de evaluacion

- `UI/UX`
- `Aplicabilidad`
- `Tecnica`
- `Innovacion` en la combinacion IA + Web3

## Que tecnologia necesitas entender desde cero

### Lo minimo

- que es una wallet EVM
- que es gas
- que es una transaccion
- que es un smart contract
- diferencia entre `BSC` y `opBNB`
- como desplegar un contrato con `Remix`, `Hardhat` o similar

### Lo que no necesitas dominar

- tokenomics avanzada
- MEV
- running validators
- protocolos complejos de DeFi

## Como es el stack tecnico

### BSC

BNB Smart Chain es `EVM-compatible`, asi que reutiliza herramientas del mundo Ethereum. Su documentacion enfatiza que los skills y herramientas de Ethereum transfieren bastante bien a BSC.

### opBNB

opBNB es la capa 2 de BNB Chain. La documentacion oficial la presenta como una solucion de alto rendimiento y bajo costo montada sobre OP Stack. Para la hackathon, esto es util si quieres una demo barata y rapida con UX fluida.

## Ruta minima de onboarding

1. Crear o importar una wallet EVM.
2. Configurar `BSC Testnet` y, si vas por opBNB, tambien `opBNB Testnet`.
3. Obtener `tBNB` desde faucet.
4. Si usas `opBNB`, bridgear `tBNB` desde BSC testnet a opBNB.
5. Desplegar un contrato minimo.
6. Ejecutar al menos 2 transacciones reales contra ese contrato.
7. Construir una UI o bot usable.

## Configuracion minima util

### BSC Testnet

- Chain ID: `97`
- Simbolo: `tBNB`
- Explorer: `https://testnet.bscscan.com/`

### opBNB Testnet

- RPC: `https://opbnb-testnet-rpc.bnbchain.org`
- Chain ID: `5611`
- Simbolo: `tBNB`
- Explorer: `http://testnet.opbnbscan.com/`

## MVP calificable recomendado

La manera mas segura de calificar no es hacer una arquitectura sofisticada. Es hacer:

- `1 contrato sencillo`
- `1 flujo de usuario muy claro`
- `2 transacciones reales`
- `1 interfaz o bot con UX muy limpia`

### Ejemplos de contratos suficientemente simples

- registro de ayudas entregadas
- claim de vouchers
- emision de comprobantes/attestations simples
- contrato de escrow minimo

## Ideas sociales que mejor encajan

### 1. Asistente de ayudas y becas

Un bot o mini app que:

- explica si una persona califica para una ayuda
- la guia con lenguaje simple
- registra la asignacion en cadena
- muestra transparencia para la institucion

Por que encaja:

- `consumer AI` claro
- UX demoable
- onchain facil de demostrar

### 2. Cobro para trabajadores informales

Una app o bot que:

- genera links o cobros simples
- ayuda a entender comisiones
- guarda historial verificable
- permite separar ahorro/uso diario

### 3. Donaciones trazables para ONG

Una experiencia para:

- donar
- ver a donde fue el dinero
- mostrar hitos financiados

## Riesgos del track

### Riesgo 1: hacer mucha IA y poca blockchain

Si el jurado no ve dos transacciones y un contrato real, el proyecto queda flojo aunque el bot sea lindo.

### Riesgo 2: hacer demasiada blockchain y poca UX

El track habla de `consumer AI`. Si la experiencia parece consola para devs, pierde fuerza.

### Riesgo 3: construir sobre opBNB sin contemplar el bridge

Si eliges opBNB, debes considerar el paso de mover fondos desde BSC. Eso es una friccion mas en la demo.

## Valoracion honesta para un novato

- Accesibilidad: `3.5/5`
- Tiempo para un MVP serio: `medio`
- Riesgo tecnico: `medio`
- Potencial de demo: `alto`
- Encaje con IA: `muy alto`
- Encaje con impacto social: `alto`

## Cuando elegir este track

Elige BNB Chain si:

- quieres construir un producto tipo bot, mini app o asistente conversacional
- te sientes comodo con JS/web
- puedes cumplir una prueba onchain minima sin volverte loco

Evitalo como primera opcion si:

- no quieres tocar smart contracts reales
- no puedes asegurar las 2 transacciones obligatorias

## Fuentes

- https://dorahacks.io/hackathon/2040/tracks
- https://docs.bnbchain.org/bnb-smart-chain/introduction/
- https://docs.bnbchain.org/bnb-smart-chain/developers/faucet/
- https://docs.bnbchain.org/bnb-opbnb/overview/
- https://docs.bnbchain.org/bnb-opbnb/developers/network-faucet/
- https://docs.bnbchain.org/bnb-opbnb/get-started/wallet-configuration/
- https://docs.bnbchain.org/showcase/mcp/skills/
