# Track BNB Chain - Next-Gen Consumer AI ($1,500 USD)

## Resumen del Track

| Campo | Detalle |
|-------|---------|
| **Nombre** | Next-Gen Consumer AI en BNB Chain |
| **Premio** | $1,500 USD (1ro: $800, 2do: $400, 3ro: $300) |
| **Modalidad** | Hibrida: presencial en Mendoza o 100% online |
| **Requisito obligatorio** | Smart contract desplegado en BSC u opBNB con 2+ transacciones exitosas |
| **Jurado** | Gwen Martin (DevRel), Lucas Liao (TechOps), Stefano Cintioli (LatAm Lead) |

---

## Que es BNB Chain

BNB Chain es un ecosistema blockchain creado por Binance con 3 redes:

### BNB Smart Chain (BSC) - Layer 1
- Blockchain de alto rendimiento para DeFi
- **EVM-compatible** (usa Solidity, mismas herramientas que Ethereum)
- ~168 TPS, fees ~$0.10
- Network ID: 56 (mainnet), 97 (testnet)

### opBNB - Layer 2 (Optimistic Rollup)
- Escalabilidad sobre BSC usando OP Stack (Optimism)
- **4,000-5,000 TPS**, fees < $0.005
- 100% EVM-compatible, usa BNB como gas
- Ideal para apps de alta frecuencia (gaming, micro-transacciones)

### BNB Greenfield
- Almacenamiento descentralizado de archivos y datos

---

## Que Busca el Track

Apps de **consumo masivo** que combinen **IA + Web3**:
- Agentes autonomos on-chain
- Bots interactivos de Telegram
- Plataformas gamificadas
- Aplicaciones consumer-facing (no solo para crypto-natives)

---

## Criterios de Evaluacion

| Criterio | Descripcion |
|----------|-------------|
| **UI/UX** | Intuitivo y facil de usar para usuarios normales |
| **Aplicabilidad** | Resuelve un problema real con potencial de adopcion masiva |
| **Tecnica** | Calidad del codigo e integracion con red BNB |
| **Innovacion** | Originalidad al combinar IA + Web3 |

---

## Entregables Obligatorios

1. **Demo funcional**: Utilizable y desplegada (Testnet o Mainnet)
2. **Repositorio publico (GitHub)**: Con README.md claro sobre como correrlo
3. **Video Demo**: 2-3 minutos mostrando el flujo del producto
4. **Prueba Onchain (OBLIGATORIA)**: Smart contract desplegado en BSC u opBNB con minimo 2 transacciones exitosas

> El Pitch Deck NO es obligatorio pero suma.

---

## Stack Tecnico Recomendado

### Smart Contracts
- **Lenguaje**: Solidity
- **Framework**: Hardhat (profesional) o Remix IDE (rapido, en browser)
- **Librerias**: OpenZeppelin Contracts (ERC20, ERC721, etc.)

### Frontend
- **Framework**: Next.js o React
- **Web3**: ethers.js o Web3.js + Wagmi
- **Wallet**: MetaMask

### Agentes IA
- **ElizaOS**: Framework TypeScript para agentes autonomos con plugin nativo de BNB Chain
  - Soporta OpenAI, Claude, Llama
  - Integraciones: Telegram, Discord, Twitter/X
  - 90+ plugins disponibles
  - GitHub: github.com/elizaOS/eliza
  - Docs: docs.elizaos.ai

- **BNB MCP Skills**: Funciones IA ejecutables en BNB Chain
  ```bash
  npx @bnb-chain/mcp@latest
  npx skills add bnb-chain/bnbchain-skills
  ```

### Patrones de Arquitectura

**Pattern 1: Agente IA en Telegram + Smart Contract**
```
Telegram Bot (ElizaOS)
  -> Recibe comando del usuario
  -> LLM interpreta intencion
  -> Ejecuta accion on-chain (via ethers.js)
  -> Smart Contract en BSC/opBNB
  -> Responde al usuario en Telegram
```

**Pattern 2: Gamification + AI**
```
Frontend (React)
  -> Usuario interactua en juego
  -> IA toma decisiones in-game
  -> Smart Contract registra achievements/rewards
  -> Usuarios canjean por tokens/NFTs
```

---

## Configuracion de Redes

### BSC Testnet (MetaMask)
| Campo | Valor |
|-------|-------|
| Network Name | BNB Smart Chain Testnet |
| RPC URL | https://bsc-testnet-dataseed.bnbchain.org |
| Chain ID | 97 |
| Currency | tBNB |
| Explorer | https://testnet.bscscan.com |

### opBNB Testnet (MetaMask)
| Campo | Valor |
|-------|-------|
| RPC URL | https://testnet-rpc.opbnb.io |
| Chain ID | 5611 |
| Currency | tBNB |
| Explorer | https://testnet-scan.opbnb.io |

---

## Faucets (Tokens Gratis de Testnet)

- **BSC Testnet**: https://www.bnbchain.org/en/testnet-faucet
  - 0.1 tBNB por claim, 1 claim cada 24 horas
  - Tambien: tBTC, tETH, tUSDC, tUSDT

- **opBNB Testnet**: https://www.l2faucet.com/opbnb
  - Requiere device attestation (WebAuthn)

---

## Deploy Rapido (Remix IDE)

1. Ir a https://remix.ethereum.org
2. Crear archivo `.sol` con tu contrato
3. Compilar con Solidity 0.8.x
4. Conectar MetaMask a BSC Testnet
5. Deploy & Run -> Inject Provider -> MetaMask
6. Deploy el contrato
7. Ejecutar al menos 2 funciones (mint, transfer, etc.) = 2+ transacciones
8. Verificar en https://testnet.bscscan.com

### Ejemplo minimo de Smart Contract (BEP20)
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MiToken is ERC20 {
    constructor() ERC20("MiToken", "MTK") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

---

## Agenda BNB Chain en el Evento

- **Jueves 26 (Manana)**: Workshop Tecnico "BNB Chain Quickstart: IA y Web3"
- **Sabado 28 (Main Stage)**: Keynote "Intro a BNB Chain"

---

## Recursos Oficiales

| Recurso | URL |
|---------|-----|
| Docs BNB Chain | docs.bnbchain.org |
| opBNB Docs | docs.bnbchain.org/opbnb-docs/ |
| Faucet BSC | testnet.bnbchain.org/faucet-smart |
| Explorer BSC | testnet.bscscan.com |
| MCP Skills | docs.bnbchain.org/showcase/mcp/skills |
| ElizaOS | docs.elizaos.ai |
| GitHub BNB | github.com/bnb-chain |

---

## Proyectos de Referencia en BNB + IA

- **MyShell**: Plataforma descentralizada para crear/compartir/monetizar AI apps (200K+ agentes, 5M+ usuarios)
- **Sentism AI**: Multi-agent platform para DeFi + Gaming
- **WORLD3 Protocol**: AI agents autonomos on-chain con drag-and-drop
- **ChainGPT**: AI chatbot para Web3 (Telegram, Discord, Web)
- **0xAstra**: DeFi cross-chain + AI agents + gamification
