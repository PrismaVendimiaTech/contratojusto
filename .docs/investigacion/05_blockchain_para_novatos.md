# Blockchain para Novatos - Guia Conceptual

> Esta guia explica los conceptos fundamentales de blockchain para alguien sin experiencia previa.

---

## 1. Que es Blockchain

Una **blockchain** es una base de datos distribuida (compartida entre muchas computadoras) donde la informacion se guarda en "bloques" encadenados. Cada bloque contiene transacciones y un hash (huella digital) del bloque anterior, haciendo practicamente imposible modificar datos pasados.

**Analogia**: Imagina un libro contable que esta copiado en miles de computadoras. Para cambiar un registro, tendrias que cambiar todas las copias simultaneamente - algo practicamente imposible.

**Caracteristicas clave**:
- **Inmutable**: una vez escrito, no se puede borrar
- **Descentralizado**: no hay un servidor central, todos tienen copia
- **Transparente**: cualquiera puede ver las transacciones
- **Sin intermediarios**: no necesitas banco ni gobierno para validar

---

## 2. Que es un Smart Contract

Un **smart contract** es un programa que vive dentro de la blockchain y se ejecuta automaticamente cuando se cumplen ciertas condiciones.

**Analogia**: Es como una maquina expendedora - metes una moneda (condicion), y te da el producto (accion). No necesitas a nadie para que funcione.

**Ejemplo practico**:
```
SI alguien envia 10 tokens
ENTONCES transferir la propiedad del NFT al comprador
```

**Lenguaje mas comun**: Solidity (usado en Ethereum, BNB Chain, Rootstock)

---

## 3. Que es una Wallet (Billetera)

Una **wallet** es tu identidad en blockchain. NO guarda dinero dentro (el dinero esta en la blockchain). Guarda tus **claves** para firmar transacciones.

**Componentes**:
- **Direccion publica**: como tu numero de cuenta bancaria. La compartes para recibir fondos (ej: `0x71C7656EC7ab88b098defB751B7401B5f6d8976F`)
- **Clave privada**: como tu PIN del banco. NUNCA la compartas
- **Seed phrase**: 12-24 palabras que recuperan tu wallet si la pierdes

**Wallets populares**:
- **MetaMask**: Extension de navegador, funciona con Rootstock, BNB Chain y Hedera (EVM)
- **Freighter**: Wallet oficial de Stellar/Soroban

---

## 4. Testnet vs Mainnet

| | Testnet | Mainnet |
|--|---------|---------|
| **Dinero** | Tokens falsos (gratis) | Dinero real |
| **Para que** | Desarrollo y pruebas | Produccion |
| **Riesgo** | Cero | Real |
| **Costo** | Gratis (faucets) | Gas fees reales |

**Para la hackathon**: Trabajamos en **testnet**. Podemos desplegar contratos, hacer transacciones y probar todo sin gastar un centavo.

**Faucet**: Un sitio web que te regala tokens de testnet gratis para que puedas probar.

---

## 5. Que es Gas y Fees

**Gas** es el costo computacional de ejecutar operaciones en la blockchain. Cada operacion (transferir tokens, ejecutar un contrato) consume "gas".

**Analogia**: Gas es como la nafta de un auto. Si queres ir mas lejos (operacion compleja), necesitas mas nafta (gas). El precio de la nafta (gas price) varia segun la demanda.

**Costos tipicos**:
| Red | Costo por transaccion |
|-----|----------------------|
| Hedera | ~$0.0001 (casi gratis) |
| opBNB | ~$0.005 |
| BSC | ~$0.10 |
| Rootstock | Variable, bajo |
| Ethereum | $1-50+ (caro) |

**En testnet**: El gas lo pagas con tokens falsos del faucet. Costo real = $0.

---

## 6. Que es EVM y Por Que Importa

**EVM** = Ethereum Virtual Machine. Es el "motor" que ejecuta smart contracts en Ethereum.

**Por que importa**: Muchas blockchains son "EVM-compatibles", lo que significa que:
- Usan el **mismo lenguaje** (Solidity)
- Las **mismas herramientas** (MetaMask, Hardhat, Remix)
- El **mismo codigo** funciona en todas ellas

**Redes EVM-compatibles de la hackathon**:
- BNB Chain (BSC y opBNB)
- Rootstock (RSK)
- Hedera (parcialmente EVM-compatible)

**Ventaja**: Aprendes Solidity una vez y puedes desplegar en 3 tracks diferentes.

---

## 7. Que es un Token

Un **token** es un activo digital creado en una blockchain.

**Tipos principales**:
- **Fungible (ERC-20/BEP-20)**: Tokens intercambiables (como monedas). 1 USDC = 1 USDC siempre.
- **No Fungible (ERC-721/NFT)**: Tokens unicos (como obras de arte digitales). Cada uno es diferente.

**Stablecoins** (monedas estables):
- Tokens cuyo valor esta "pegado" a una moneda real (ej: 1 USDC = 1 USD)
- Ejemplos: USDC, USDT, DOC (Dollar on Chain), USDRIF
- Se usan para evitar la volatilidad de las criptomonedas

---

## 8. Que es DeFi

**DeFi** = Finanzas Descentralizadas. Son servicios financieros (prestamos, intercambios, ahorro) que funcionan con smart contracts en vez de bancos.

**Servicios DeFi**:
- **DEX (Exchange Descentralizado)**: Intercambiar tokens sin intermediarios (ej: Soroswap en Stellar)
- **Lending**: Prestar y pedir prestado cripto (ej: Tropykus en Rootstock)
- **Staking**: "Estacionar" tus tokens para ganar intereses
- **Yield Farming**: Combinar estrategias para maximizar rendimientos

**En la hackathon**: El track de Rootstock pide "Mejor uso de DeFi con Bitcoin".

---

## 9. Que es Web3

**Web3** es la internet descentralizada donde los usuarios son duenos de sus datos y activos.

| | Web2 | Web3 |
|--|------|------|
| **Datos** | Los tiene la empresa (Google, Meta) | Los tiene el usuario |
| **Identidad** | Email + password | Wallet (clave publica/privada) |
| **Pagos** | Visa, PayPal, banco | Cripto directo entre personas |
| **Apps** | Centralizadas (servidores de la empresa) | dApps (smart contracts en blockchain) |
| **Confianza** | Confias en la empresa | Confias en el codigo (verificable) |

**dApp** = Aplicacion Descentralizada. Una app normal (frontend en React, por ejemplo) pero que en vez de hablar con un backend tradicional, interactua con smart contracts en blockchain.

---

## 10. Conceptos Especificos de Esta Hackathon

### Agentes de IA + Blockchain
- **Agentes autonomos**: Programas de IA que toman decisiones y ejecutan acciones en blockchain SIN intervencion humana
- **Economia Agentica**: Agentes de IA que compran, venden y pagan entre si de forma autonoma
- **Ejemplo**: Un bot de Telegram con IA que analiza precios y ejecuta trades en blockchain automaticamente

### Sidechain
- Una blockchain separada que corre en paralelo a otra principal
- **Rootstock** es una sidechain de Bitcoin: hereda su seguridad pero agrega smart contracts

### Bridge (Puente)
- Mecanismo para mover tokens de una blockchain a otra
- **PowPeg**: Bridge de Bitcoin a Rootstock (BTC → rBTC)

### Hashgraph
- Tecnologia de Hedera. NO es blockchain tradicional sino un grafo dirigido
- Mas rapido (10,000 TPS) y eficiente que blockchain clasico
