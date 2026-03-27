# Track Rootstock y Beexo Connect

Actualizado: 2026-03-25

## Resumen corto

Esta seccion junta dos cosas distintas porque el propio evento las presenta juntas y permite competir con el mismo proyecto en simultaneo:

- `Rootstock`: mejor uso de DeFi con Bitcoin
- `Beexo Connect`: mejor UX integrando su SDK JS

La lectura correcta es:

- `Rootstock` es la parte financiera/Bitcoin/DeFi
- `Beexo` es la parte de experiencia de usuario y pagos LATAM

Para alguien que empieza de cero, `Beexo` es mucho mas accesible que `Rootstock puro`.

## Que pide exactamente el track

### Rootstock

- pool `2500 USD`
- premios:
  - 1 puesto `1000 USD`
  - 2 puesto `500 USD`
  - 3 puesto `300 USD`
- bonus:
  - `7 premios de 100 USD` a los primeros 7 proyectos en presentar

### Beexo Connect

- pool `500 USD`
- premio principal de UX `100 USD`
- bonus:
  - `8 premios de 50 USD` a los primeros 8 en integrar el SDK

### Entregables y prueba tecnica

- repo publico
- demo funcional por link
- video demo + pitch
- deck
- prueba tecnica:
  - al menos un contrato desplegado en `RSK mainnet/testnet`
  - y/o `SDK de Beexo` funcional y demostrable

### Detalle estrategico importante

El sitio dice explicitamente que `un mismo proyecto puede participar en ambos tracks en simultaneo`.

Eso significa que una buena jugada es:

- construir un caso de uso de pagos/ahorro/cobro
- usar `Beexo` para la UX
- sumar un componente `Rootstock` sencillo si aporta una capa de dinero programable o ahorro mas robusta

## Que es Rootstock para efectos de la hackathon

`Rootstock` es una sidechain/layer de Bitcoin con `EVM compatibility`. La documentacion oficial la vende como entorno para llevar smart contracts y DeFi al ecosistema Bitcoin sin salir de herramientas parecidas a Ethereum.

Lo importante para la hackathon no es entender toda la teoria, sino esto:

- pagas gas en `RBTC`
- puedes desplegar contratos con herramientas EVM
- hay testnet
- el jurado valora integracion con herramientas nativas como:
  - `Money on Chain`
  - `Tropykus`
  - `Sovryn`

## Que es Beexo Connect para efectos de la hackathon

`Beexo` es una wallet argentina de autocustodia con una propuesta fuerte de:

- pagos QR
- conversion crypto-peso
- cuentas con y sin KYC
- experiencia local LATAM

La parte `Beexo Connect` expone un provider `EIP-1193` llamado `xo-connect`, pensado para conectar dApps con wallets Beexo. La documentacion publica muestra:

- `npm install xo-connect`
- `new XOConnectProvider()`
- compatibilidad con `ethers.js`
- soporte multi-chain
- metodos como:
  - `eth_requestAccounts`
  - `personal_sign`
  - `eth_sendTransaction`
  - `wallet_switchEthereumChain`

Esto lo vuelve muy apto para un subtrack donde el diferencial sea experiencia de usuario.

## Ruta minima de onboarding

### Rootstock

1. Configurar MetaMask para `Rootstock Testnet`.
2. Obtener `tRBTC` desde faucet.
3. Desplegar un contrato simple.
4. Mostrar interaccion basica con explorer.

### Beexo

1. Leer docs de `XO Connect`.
2. Instalar `xo-connect`.
3. Conectar wallet.
4. Ejecutar un flujo pequeño:
   - conectar
   - firmar
   - cambiar cadena
   - enviar o simular accion con UX limpia

## Configuracion util de Rootstock Testnet

- RPC: `https://public-node.testnet.rsk.co`
- Chain ID: `31`
- Simbolo: `tRBTC`
- Explorer: `https://explorer.testnet.rootstock.io/`
- Faucet: `https://faucet.rootstock.io/`

## Casos donde Rootstock si agrega valor

### 1. Ahorro y resguardo

Si el problema es proteger valor o construir algo alrededor de Bitcoin y dolares digitales.

### 2. Credito o colateral

Si el caso pide una relacion clara con:

- credito
- lending
- stablecoins descentralizadas
- ahorro con colateral fuerte

### 3. DeFi con sentido social

Por ejemplo:

- fondo rotatorio comunitario
- ahorro de emergencia
- caja de herramientas financieras para cooperativas

## Casos donde Beexo agrega valor

### 1. Onboarding local argentino

Si quieres una experiencia de usuario que hable el idioma del problema local:

- pagos QR
- conversion crypto-peso
- UX sin friccion

### 2. Demo fuerte de producto

Beexo permite que la historia del usuario se vea mas real para LATAM que una wallet generica internacional.

### 3. Track de UX puro

Si sabes hacer frontend y quieres destacar en claridad, onboarding y facilidad de uso, este subtrack es especialmente atractivo.

## MVP calificable recomendado

### Opcion mas sensata para novato

Hacer foco en `Beexo Connect` y dejar `Rootstock` como componente opcional o minimo.

Ejemplo:

- frontend claro
- integracion con `xo-connect`
- flujo de cobro/pago/confirmacion
- un backend o contrato minimo si suma

### Opcion dual-track

Construir un producto como:

- billetera de ayudas o becas
- cobro simple para trabajadores
- ahorro guiado para emergencias

y demostrar:

- `Beexo` para UX y conectividad wallet
- `Rootstock` para una capa de ahorro, voucher o contrato simple

## Riesgos del track

### Riesgo 1: intentar hacer DeFi compleja desde cero

Integrar `Money on Chain`, `Tropykus` o `Sovryn` a fondo puede ser mucho si todavia no entiendes RBTC, wallets, colateral y UX DeFi.

### Riesgo 2: forzar Bitcoin donde no hace falta

Si tu producto no mejora por estar sobre Bitcoin/Rootstock, el pitch se vuelve artificial.

### Riesgo 3: confiar solo en "tenemos wallet"

Para ganar `Beexo`, la UX debe ser el diferencial, no solo la conexion del provider.

## Valoracion honesta para un novato

### Rootstock

- Accesibilidad: `2.5/5`
- Encaje con impacto social: `medio-alto`
- Riesgo: `alto` si el caso no es realmente financiero

### Beexo Connect

- Accesibilidad: `4/5`
- Encaje con impacto social en LATAM: `alto`
- Encaje con UX: `muy alto`
- Riesgo: `medio-bajo`

## Cuando elegir este track

Elige `Rootstock + Beexo` si:

- tu idea toca dinero real, ahorro o pagos
- quieres una UX local fuerte
- puedes defender por que `Bitcoin/Rootstock` agrega confianza o resguardo

Si solo quieres hacer una buena app social sin capa financiera fuerte, probablemente `Stellar` o `Hedera` sean opciones mas limpias.

## Fuentes

- https://dorahacks.io/hackathon/2040/tracks
- https://dev.rootstock.io/
- https://dev.rootstock.io/dev-tools/wallets/metamask/
- https://faucet.rootstock.io/
- https://docs.moneyonchain.com/main-rbtc-contract/money-on-chain-platform
- https://www.beexo.com/
- https://xo-connect.xolabs.io/
