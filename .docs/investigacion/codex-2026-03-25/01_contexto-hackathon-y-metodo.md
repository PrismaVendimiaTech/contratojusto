# Contexto de la Hackathon y Metodo

Actualizado: 2026-03-25

## Que es Vendimia Tech

Segun la pagina oficial de DoraHacks, `Vendimia Tech` se presenta como una hackathon inmersiva de 3 dias donde IA y blockchain son los protagonistas y donde se espera convertir ideas en prototipos funcionales. No esta planteada como una hackathon puramente academica: mezcla construccion, pitch, networking y grants por ecosistema.

## Datos operativos confirmados

- Evento: `Vendimia Tech`
- Plataforma: `DoraHacks`
- Lugar mostrado por el sitio: `Universidad Champagnat, Belgrano 721, Godoy Cruz, Mendoza`
- Estado del evento al `2026-03-25`: `submission abierta`
- Tags visibles: `web3`, `stellar`, `bnb chain`, `hedera`
- Ecosistemas listados: `stellar`, `bnb chain`, `hedera`, `rootstock`, `web3`
- Requisitos generales visibles:
  - link a repositorio `GitHub/GitLab/Bitbucket`
  - `video demo`

## Fechas y discrepancias

Hay una inconsistencia importante entre distintos textos del evento:

- El encabezado del sitio muestra:
  - `Submission: 2026-03-24 10:00`
  - `Deadline: 2026-03-27 19:07`
- Algunos tracks dicen cosas como:
  - `Viernes 17:00 hs`
  - actividades finales el `Sabado 28`

### Decision operativa recomendada

Tomar como `fecha interna de cierre segura` el `2026-03-27 17:00` hora local, y usar el resto del tiempo como buffer para submission, video, deck y carga en DoraHacks.

## Tracks y pozos

- `BNB Chain`: pool `1500 USD`
- `Stellar`: `Ideathon 500 USD` + `Hackathon 1500 USD`
- `Hedera`: `Ideathon 500 USD` + `Hackathon 1500 USD`
- `Rootstock`: `2500 USD`
- `Beexo Connect`: `500 USD`

## Lectura estrategica del evento

### 1. No todos los tracks piden lo mismo

El error mas comun seria tratar todos los tracks como si fueran "hacer un smart contract y listo". No es asi:

- `BNB Chain` pide una app de consumo con AI + Web3 y una prueba onchain obligatoria.
- `Stellar` premia tanto idea validada como app funcional.
- `Hedera` separa negocio/marketing de pagos con agentes de IA.
- `Rootstock` pide mejor uso de DeFi con Bitcoin.
- `Beexo` premia mejor UX integrando un provider JS.

### 2. El sitio empuja ideas de vino y supply chain, pero no obliga

La pestaña de ideas sugiere temas como:

- trazabilidad de vinos
- sommelier con IA
- marketplace de terroirs
- sensores para maduracion
- tokenizacion de barricas

Esas ideas ayudan a leer el tono del evento, pero no limitan el producto. Nada en los tracks obliga a quedarse en vitivinicultura. Se puede construir algo util para la sociedad si:

- resuelve un problema concreto
- explica por que esa blockchain aporta algo
- entrega una demo creible

### 3. Para novatos, la estrategia correcta no es "aprender todo"

Con el tiempo disponible, la mejor estrategia es:

1. entender el criterio de evaluacion del track
2. elegir una idea con alto valor social y MVP corto
3. usar la blockchain solo donde agrega:
   - pagos
   - trazabilidad
   - attestations
   - automatizacion verificable
   - interoperabilidad wallet

## Metodo usado para esta investigacion

### Fuentes primarias

- Pagina oficial del evento en DoraHacks
- Paginas oficiales de tracks del evento
- Pagina oficial de ideas del evento
- Documentacion oficial de:
  - `BNB Chain`
  - `Stellar`
  - `Hedera`
  - `Rootstock`
  - `Beexo / XO Connect`

### Tooling

- `parallel-cli` instalado localmente
- estado del CLI al cierre de este documento: `not authenticated`
- por eso la investigacion se hizo con navegacion y busqueda directa sobre fuentes primarias

## Criterios usados para rankear tracks

- `Accesibilidad para novato`
- `Cantidad de blockchain real que exige el jurado`
- `Facilidad de demo`
- `Encaje con impacto social`
- `Encaje con AI`
- `Probabilidad de entregar algo serio antes del cierre`

## Hallazgo principal

La mejor jugada no es casarse con el ecosistema mas complejo. La mejor jugada es elegir una idea social clara y luego buscar el track cuya infraestructura la haga mas facil de mostrar y defender.

En esta hackathon, eso favorece mucho a:

- `Stellar` para pagos y rails
- `Hedera` para pagos agenticos y herramientas enterprise
- `Beexo Connect` para UX de cobro/pago local en LATAM

## Fuentes

- https://dorahacks.io/hackathon/2040/detail
- https://dorahacks.io/hackathon/2040/tracks
- https://dorahacks.io/hackathon/2040/ideaism
