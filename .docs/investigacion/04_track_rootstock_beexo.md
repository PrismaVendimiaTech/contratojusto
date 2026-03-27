# Track Rootstock + Beexo Connect ($3,000 USD combinado)

> Un MISMO proyecto puede participar en AMBOS tracks simultaneamente. Esta es la mayor oportunidad de la hackathon.

## Resumen de Tracks

| Campo | Track Rootstock | Track Beexo Connect |
|-------|----------------|---------------------|
| **Premio** | $2,500 USD | $500 USD |
| **1er lugar** | $1,000 | $100 (Mejor UX) |
| **2do lugar** | $500 | - |
| **3er lugar** | $300 | - |
| **Bono early bird** | 7 premios de $100 (primeros 7 en presentar) | 8 premios de $50 (primeros 8 en integrar SDK) |
| **Pago** | USDRIF / Dollar on Chain | USDRIF / Dollar on Chain |
| **Enfoque** | Mejor uso de DeFi con Bitcoin | Mejor UX integrando SDK JS |

### Jurado
Juani Podesta (Beexo), Matias Santaolaya (VendimiaTech), Manuel Ferrari (MoneyOnChain), Santiago Iwakawa (Beexo)

---

## ESTRATEGIA: Early Bird Bonuses

**CRITICO**: Hay que ser de los PRIMEROS en submitear.
- Rootstock: Los primeros 7 proyectos reciben $100 extra cada uno = $700 total
- Beexo: Los primeros 8 en integrar SDK reciben $50 extra cada uno = $400 total
- **Un proyecto bien hecho y rapido puede ganar $150 solo en bonos early bird**

---

## Que es Rootstock (RSK)

Rootstock es una **sidechain de Bitcoin** que agrega smart contracts a la red mas segura del mundo.

| Caracteristica | Detalle |
|----------------|---------|
| Tipo | Sidechain bidireccional de Bitcoin |
| Consenso | Proof of Work (merge-mining con Bitcoin) |
| Seguridad | 80% del hashrate de Bitcoin |
| TPS | 10-20 transacciones por segundo |
| Confirmacion | 20-30 segundos |
| EVM | 100% compatible (mismo bytecode que Ethereum) |
| Uptime | 100% desde enero 2018 |
| Token nativo | rBTC (pegged 1:1 a Bitcoin) |

### Por que importa ser EVM-compatible
- Usa **Solidity** (mismo lenguaje que Ethereum y BNB Chain)
- Mismas herramientas: MetaMask, Hardhat, Remix, ethers.js
- Si aprendes para RSK, tambien sirve para BNB Chain

---

## Tokens Clave del Ecosistema

### rBTC (Smart Bitcoin)
- Token nativo de Rootstock, **pegged 1:1 a Bitcoin**
- Cada rBTC esta respaldado por BTC real
- Se usa para pagar gas fees y ejecutar smart contracts
- Se obtiene via PowPeg Bridge (BTC -> rBTC)

### DOC (Dollar on Chain)
- **Stablecoin pegged 1:1 a USD**, 100% colateralizado en Bitcoin
- Primer stablecoin respaldado por Bitcoin del mundo
- Protocolo: Money on Chain
- Redeemable: 1 DOC = equivalente de 1 USD en rBTC en cualquier momento
- **Este es uno de los tokens de pago de premios**

### USDRIF (RIF US Dollar)
- Stablecoin colateralizado en crypto, pegged 1:1 a USD
- Completamente descentralizado y non-custodial
- Construido en Rootstock
- **Este es el otro token de pago de premios**

### BPRO (HODL + Earn)
- Token con leverage para bitcoiners
- Recibe 20% de protocol fees
- Precio sube/baja con Bitcoin (leverage)

---

## Protocolos DeFi en Rootstock

### Money on Chain
- Protocolo de stablecoin colateralizado en Bitcoin
- Tokens: DOC, BPRO, MOC
- TEX: exchange descentralizado
- OMoC: oraculos descentralizados

### Tropykus
- Plataforma DeFi de **lending y borrowing** para Bitcoin
- Enfocada en Latinoamerica
- Savings and loans protocol

### Sovryn
- Plataforma descentralizada para **trading y lending de Bitcoin**
- Utiliza rBTC como asset nativo

---

## PowPeg Bridge (Bitcoin <-> Rootstock)

- Bridge bidireccional para mover Bitcoin hacia/desde Rootstock
- BTC -> rBTC (peg-in) | rBTC -> BTC (peg-out)
- Seguridad: 80%+ del hashrate de Bitcoin
- Track record: 0 breaches de seguridad desde 2018

---

## Beexo Connect y SDK JS (xo-connect)

### Que es Beexo
- Billetera multi-chain movil del ecosistema Money on Chain
- Enfocada en neobanking y pagos en LATAM

### SDK JavaScript: xo-connect
- Paquete NPM para integrar wallet Beexo en tu dApp
- Estandar EIP-1193 (como MetaMask pero para Beexo)
- Objetivo: flujo claro, onboarding facil, relevante para mercado latino

### Integracion basica
```bash
npm install xo-connect
```

### Lo que evaluan
- UX del flujo de wallet
- Facilidad de onboarding para usuarios latinos
- Integracion correcta del SDK (EIP-1193)
- Que sea demostrable y funcional

---

## El Desafio por Track

### Track Rootstock
- Desplegar smart contracts EVM-compatibles en RSK
- Se valora MUCHISIMO la integracion de herramientas nativas:
  - rBTC
  - SDK de Tropykus
  - Money on Chain
  - Sovryn

### Track Beexo Connect
- Integrar SDK JS (xo-connect) para wallets
- Lograr flujo claro y onboarding facil
- Relevante para mercado latino

---

## Entregables (Cierre: Viernes 17:00 hs)

Todo se entrega por DoraHacks. Obligatorio:

1. **Repositorio publico (GitHub)**: Codigo original desarrollado en el evento + documentacion clara
2. **Demo funcional**: Accesible via link
3. **Video demo + Pitch**: Max 5 minutos
4. **Deck de slides**: Presentacion
5. **Prueba tecnica**: Al menos 1 contrato desplegado en RSK (Mainnet/Testnet) Y/O SDK Beexo funcional y demostrable

---

## Setup Tecnico Rapido

### Configurar MetaMask para RSK Testnet

| Campo | Valor |
|-------|-------|
| Network Name | RSK Testnet |
| RPC URL | https://public-node.testnet.rsk.co |
| Chain ID | 31 |
| Currency | tRBTC |
| Explorer | https://explorer.testnet.rootstock.io |

### Faucet RSK Testnet
- URL: https://faucet.rootstock.io
- Regala tRBTC gratis para testing

### Deploy rapido con Hardhat
```bash
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# hardhat.config.js
module.exports = {
  solidity: "0.8.20",
  networks: {
    rskTestnet: {
      url: "https://public-node.testnet.rsk.co",
      chainId: 31,
      accounts: [PRIVATE_KEY]
    }
  }
};

npx hardhat run scripts/deploy.js --network rskTestnet
```

---

## Neobanking y Pagos en LATAM - Contexto de Mercado

### Datos clave (2025)
- $1.5 TRILLONES en volumen de transacciones crypto en LATAM (julio 2022 - junio 2025)
- Brasil: 90% de transacciones en stablecoins
- 51% de consumidores latinoamericanos han comprado con moneda digital
- 1 de 3 ha usado stablecoin para compras diarias
- Nubank: 100M+ clientes con stablecoins embebidos

### Drivers
- Inflacion persistente en la region
- Volatilidad de monedas locales (peso argentino)
- Capital controls restrictivos
- Demanda por stablecoins como refugio de valor

### Relevancia para el proyecto
- Un producto que facilite pagos/ahorro en stablecoins via Rootstock/Beexo tiene altisima relevancia en LATAM
- Integracion con Beexo = acceso al mercado latino de neobanking

---

## Recursos Oficiales

| Recurso | URL |
|---------|-----|
| Dev Portal RSK | dev.rootstock.io |
| Faucet RSK | faucet.rootstock.io |
| Explorer RSK | explorer.testnet.rootstock.io |
| Money on Chain | moneyonchain.com |
| Tropykus | tropykus.com |
| Sovryn | sovryn.com |
| Beexo Wallet | app.beexo.com |
| Beexo Links | linktr.ee/BeexoWallet |
| NPM xo-connect | npmjs.com/package/xo-connect |
| RSK CLI | dev.rootstock.io/dev-tools/ |

---

## Mentores

Disponibles:
- Miercoles: 15 a 20hs
- Jueves: 15 a 21hs
- Viernes: 9 a 17hs
