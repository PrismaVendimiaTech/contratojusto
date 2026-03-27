# Investigacion Vendimia Tech

Actualizado: 2026-03-25

## Objetivo

Esta carpeta concentra una investigacion practica para elegir un track de `Vendimia Tech`, entender lo minimo necesario para competir y llegar rapido a una idea con valor social real.

No esta pensada como un curso largo de blockchain. Esta escrita para responder cuatro preguntas:

1. Que pide exactamente cada track.
2. Que hay que aprender desde cero para no perder tiempo.
3. Que tipo de MVP alcanza para calificar.
4. Que ideas sociales tienen mejor relacion entre impacto y viabilidad.

## Orden sugerido de lectura

1. `01_contexto-hackathon-y-metodo.md`
2. `90_matriz-comparativa.md`
3. El track que mas te interese:
   - `10_track-bnb-chain.md`
   - `20_track-stellar.md`
   - `30_track-hedera.md`
   - `40_track-rootstock-y-beexo.md`
4. `95_shortlist-de-ideas-sociales.md`
5. `98_brainstorming-inicial.md`

## Documentos canonicos

Usar como serie principal de esta investigacion:

- `00_*`
- `01_contexto-hackathon-y-metodo.md`
- `10_track-bnb-chain.md`
- `20_track-stellar.md`
- `30_track-hedera.md`
- `40_track-rootstock-y-beexo.md`
- `90_*`
- `95_*`
- `98_*`

En la carpeta tambien quedaron notas exploratorias previas con nombres como `01_track_*`, `02_track_*`, `03_track_*` y `04_track_*`. Se conservan para referencia, pero la serie canonica para decidir y trabajar es la listada arriba.

## Resumen ejecutivo

- El evento permite construir sobre `BNB Chain`, `Stellar`, `Hedera`, `Rootstock` y `Beexo Connect`.
- Para alguien que hoy arranca de cero en blockchain, las entradas mas accesibles no son iguales:
  - `Stellar Ideathon` es la opcion con menor friccion tecnica.
  - `Hedera Ideathon` es la segunda mejor puerta de entrada.
  - `Beexo Connect` es el subtrack mas amigable si ya sabes frontend y quieres enfocarte en UX/pagos.
  - `BNB Chain` es viable si aceptas hacer una integracion EVM simple pero real.
  - `Rootstock DeFi` es potente, pero exige mas criterio de producto y DeFi que los otros.
- Hay inconsistencia entre el deadline general visible en DoraHacks y algunos textos internos de tracks. Para reducir riesgo, esta investigacion usa como `deadline operativo seguro` el mas temprano que aparece en los materiales del evento.

## Recomendacion base

Si el objetivo es `impacto social + demo` y hoy no conoces nada de blockchain:

- Diseñar una idea que pueda competir como `Ideathon` si la parte tecnica no llega.
- Elegir una idea que, si el tiempo alcanza, tambien pueda bajar a un `Hackathon MVP`.
- Priorizar primero:
  - `Stellar`
  - `Hedera`
  - `Beexo Connect`
- Usar `BNB Chain` si quieres una demo mas "consumer AI".
- Dejar `Rootstock puro` para ideas donde Bitcoin/DeFi realmente agregan valor.

## Estado del tooling de investigacion

- Se instalo `parallel-cli` localmente para el flujo de deep research.
- Al momento de esta investigacion, el CLI quedo `sin autenticar`, asi que la investigacion se realizo con:
  - paginas oficiales del evento
  - documentacion oficial de cada ecosistema
  - sitios oficiales de herramientas mencionadas por los tracks

## Convenciones de lectura

- `Accesibilidad`: cuanto cuesta entrar desde cero.
- `MVP calificable`: la forma mas corta de cumplir con el track sin vender humo.
- `Valor real`: si la idea mejora algo importante fuera de una demo artificial.
- `Riesgo`: que puede hacerte perder la hackathon aunque la idea sea buena.
