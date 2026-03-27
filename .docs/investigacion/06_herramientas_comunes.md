# Herramientas Comunes para la Hackathon

## 1. MetaMask - Tu Wallet Universal

MetaMask es la wallet mas usada en Web3. Funciona con RSK, BNB Chain y Hedera (todas EVM-compatibles).

### Instalacion
1. Ir a https://metamask.io
2. Instalar extension para Chrome/Brave/Firefox
3. Crear nueva wallet (guardar seed phrase en lugar seguro)
4. NUNCA compartir la seed phrase ni la clave privada

### Agregar redes personalizadas

**RSK Testnet**:
- Network: RSK Testnet | RPC: `https://public-node.testnet.rsk.co` | Chain ID: 31 | Symbol: tRBTC | Explorer: `https://explorer.testnet.rootstock.io`

**BSC Testnet**:
- Network: BNB Testnet | RPC: `https://bsc-testnet-dataseed.bnbchain.org` | Chain ID: 97 | Symbol: tBNB | Explorer: `https://testnet.bscscan.com`

**opBNB Testnet**:
- Network: opBNB Testnet | RPC: `https://testnet-rpc.opbnb.io` | Chain ID: 5611 | Symbol: tBNB | Explorer: `https://testnet-scan.opbnb.io`

---

## 2. Faucets - Tokens Gratis de Testnet

| Red | URL | Cantidad | Frecuencia |
|-----|-----|----------|------------|
| RSK Testnet | faucet.rootstock.io | tRBTC gratis | Variable |
| BSC Testnet | bnbchain.org/en/testnet-faucet | 0.1 tBNB | 1 por 24h |
| opBNB Testnet | l2faucet.com/opbnb | tBNB | Requiere WebAuthn |
| Hedera Testnet | portal.hedera.com/faucet | 100 HBAR | Cada 24h |
| Stellar Testnet | Friendbot automatico | XLM | Ilimitado |

---

## 3. Remix IDE - Smart Contracts Sin Instalacion

**URL**: https://remix.ethereum.org

### Para que sirve
- Escribir, compilar y desplegar smart contracts desde el browser
- No necesitas instalar nada
- Perfecto para prototipos rapidos en hackathon

### Workflow basico
1. Abrir Remix en el browser
2. Crear archivo `.sol` en la carpeta contracts/
3. Escribir contrato en Solidity
4. Compilar (tab "Solidity Compiler")
5. Conectar MetaMask (tab "Deploy & Run" -> Environment -> Injected Provider)
6. Asegurar que MetaMask esta en la red correcta (RSK Testnet, BSC Testnet, etc.)
7. Deploy
8. Interactuar con las funciones del contrato

### Tip: Importar OpenZeppelin
En Remix puedes importar directamente:
```solidity
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```
Remix descarga automaticamente las dependencias.

---

## 4. Hardhat - Desarrollo Profesional

### Cuando usar Hardhat vs Remix
- **Remix**: Prototipos rapidos, contratos simples, 1 archivo
- **Hardhat**: Proyectos con multiples contratos, testing automatizado, deployment scripts

### Setup basico
```bash
mkdir mi-proyecto && cd mi-proyecto
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
# Elegir "Create a JavaScript project"
```

### Estructura del proyecto
```
mi-proyecto/
  contracts/     -> Archivos .sol (smart contracts)
  scripts/       -> Scripts de deployment
  test/          -> Tests automatizados
  hardhat.config.js -> Configuracion de redes
```

### Configuracion multi-red (hackathon)
```javascript
// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    rskTestnet: {
      url: "https://public-node.testnet.rsk.co",
      chainId: 31,
      accounts: [process.env.PRIVATE_KEY]
    },
    bscTestnet: {
      url: "https://bsc-testnet-dataseed.bnbchain.org",
      chainId: 97,
      accounts: [process.env.PRIVATE_KEY]
    },
    opbnbTestnet: {
      url: "https://testnet-rpc.opbnb.io",
      chainId: 5611,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

### Deploy y verificar
```bash
# Deploy en RSK
npx hardhat run scripts/deploy.js --network rskTestnet

# Deploy en BSC (mismo contrato!)
npx hardhat run scripts/deploy.js --network bscTestnet
```

---

## 5. Solidity - Smart Contract Basico

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MiToken is ERC20, Ownable {
    constructor() ERC20("MiToken", "MTK") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

Este contrato:
1. Crea un token ERC-20 llamado "MiToken"
2. Mintea 1,000,000 tokens al deployer
3. Permite al owner mintear mas tokens
4. Funciona en RSK, BSC, opBNB (todas EVM-compatibles)

---

## 6. Frontend Web3 - ethers.js

### Instalacion
```bash
npm install ethers
```

### Conexion basica a wallet
```javascript
import { ethers } from 'ethers';

// Conectar a MetaMask
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const address = await signer.getAddress();
console.log("Wallet conectada:", address);

// Interactuar con smart contract
const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  signer
);

// Llamar funcion del contrato
const tx = await contract.mint(address, ethers.parseEther("100"));
await tx.wait();
console.log("Transaccion exitosa:", tx.hash);
```

---

## 7. GitHub - Estructura del Repo para Hackathon

```
mi-proyecto/
  README.md          -> CRITICO: explica como correr el proyecto
  contracts/         -> Smart contracts (Solidity)
  frontend/          -> App web (React/Next.js)
  scripts/           -> Scripts de deployment
  test/              -> Tests
  .env.example       -> Variables de entorno (sin valores reales)
  package.json       -> Dependencias
```

### README.md minimo
```markdown
# Nombre del Proyecto

## Descripcion
[Que hace tu proyecto en 2-3 oraciones]

## Tech Stack
- Smart Contracts: Solidity en Rootstock Testnet
- Frontend: Next.js + ethers.js
- Wallet: MetaMask + Beexo Connect (xo-connect)

## Como correrlo
1. `npm install`
2. Configurar `.env` con las variables
3. `npm run dev`

## Smart Contracts Desplegados
- Contrato principal: [direccion en explorer]
- Red: RSK Testnet (Chain ID: 31)

## Video Demo
[Link al video de 3-5 minutos]

## Equipo
- [Nombre 1] - Rol
- [Nombre 2] - Rol
```

---

## 8. DoraHacks - Submit BUIDL (2 PASOS)

### Paso 1: Crear BUIDL
1. Ir a dorahacks.io
2. Login / Crear cuenta
3. Ir a tu perfil
4. Crear nuevo BUIDL con nombre, descripcion, links, video

### Paso 2: Submit a Hackathon
1. Ir a https://dorahacks.io/hackathon/2040
2. Click "Submit BUIDL"
3. Elegir el Track correspondiente
4. Confirmar

**IMPORTANTE**: Sin el paso 2, el proyecto NO es evaluado.

---

## 9. Video Demo - Tips

### Formato recomendado
- Duracion: 2-5 minutos (depende del track)
- Mostrar: problema -> solucion -> demo funcional -> impacto
- Grabar pantalla con OBS, Loom o herramienta similar
- Audio claro (microfono decente)
- Subtitulos si es posible

### Estructura sugerida
1. **(30s)** Presentar el problema que resuelven
2. **(30s)** Explicar la solucion y por que blockchain
3. **(2-3min)** Demo en vivo del producto funcionando
4. **(30s)** Mostrar transacciones on-chain en el explorer
5. **(30s)** Equipo y vision futura

---

## 10. Herramientas de IA para Hackathon

| Herramienta | Uso |
|-------------|-----|
| **Claude Code** | Generar smart contracts, frontend, scripts de deploy |
| **Cursor/Windsurf** | IDE con IA integrada |
| **ElizaOS** | Framework para agentes IA autonomos |
| **Hedera Agent Kit** | Agentes IA con pagos en blockchain |
| **BNB MCP Skills** | IA + BNB Chain |
