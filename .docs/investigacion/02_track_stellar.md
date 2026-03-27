# Track Stellar - Soroban Smart Contracts ($2,000 USD)

## Resumen del Track

| Campo | Detalle |
|-------|---------|
| **Ecosistema** | Stellar + Soroban |
| **Premio Total** | $2,000 USD |
| **Ideathon** | $500 USD (1ro: $300, 2do: $200) - SIN codigo |
| **Hackathon** | $1,500 USD (1ro: $700, 2do: $600, 3ro: $200) - CON codigo |
| **Pago** | USDC ERC20 en 48hs habiles |
| **Equipos** | 2-5 integrantes, minimo 1 presencial |
| **Cierre** | Viernes 17:00 hs (sin excepciones) |

### Jurado
- **Preseleccion (Viernes)**: Alberto Chaves (Trustless Work) + Maria Elisa Araya (Buen Dia Builders)
- **Final (Sabado, presencial)**: Ann (Stellar SDF) + Alejandra Vargas (Starmark) + Martin Gutter (BAF)

---

## Que es Stellar

Red blockchain lanzada en 2014 para **pagos transfronterizos rapidos y baratos**.

| Caracteristica | Detalle |
|----------------|---------|
| Consenso | SCP (Stellar Consensus Protocol) - Acuerdo Bizantino Federado |
| Velocidad | < 6 segundos por transaccion |
| Costo | Tarifas minimas |
| Token nativo | Lumen (XLM) |
| Enfoque | Pagos, remesas, tokenizacion de activos |
| Eficiencia | Muy bajo consumo energetico |

---

## Que es Soroban

Plataforma nativa de **smart contracts** de Stellar.

| Caracteristica | Detalle |
|----------------|---------|
| Lenguaje | **Rust** compilado a WebAssembly (WASM) |
| Fondo SDF | $100M Soroban Adoption Fund |
| Mainnet | Live desde 2024 |
| Ventajas | Tarifas bajisimas, seguridad de Rust, integracion nativa con Stellar |

---

## CAPs y SEPs

- **CAP (Core Advancement Proposals)**: Cambios al protocolo central de Stellar (afectan la red)
- **SEP (Stellar Ecosystem Proposals)**: Estandares para apps construidas sobre Stellar (como interactuan las dApps)

**En tu proyecto**: Si integras wallets, pagos o exchanges, probablemente uses SEPs. En el Ideathon, basta con explicar cuales SEPs/CAPs usarias.

---

## Modalidad Ideathon ($500 - SIN CODIGO)

**Ideal para nuestra artista + persona presencial.**

### Entregables
- Deck de la propuesta (Figma/Slides)
- Video pitch explicando problema/solucion (5 min max)
- Validacion de mercado (encuestas, entrevistas, datos)

### Que se evalua
- Solidez de la propuesta
- Uso del stack Stellar (explicar COMO se usarian Soroban, SDKs, wallets)
- Viabilidad del modelo de negocio
- Calidad del pitch

---

## Modalidad Hackathon ($1,500 - CON CODIGO)

### Entregables
- Repo publico (GitHub) documentado
- Demo funcional accesible por link
- Video demo + pitch (5 min max)
- Deck de slides
- Evidencia de validacion del problema

### Stack Tecnico

**Smart Contracts (Soroban)**:
- Lenguaje: Rust
- SDK: `soroban-sdk` (crate de Rust)
- CLI: `stellar` (instalar via Cargo)

**Frontend**:
- JavaScript/TypeScript SDK: `npm install stellar-sdk`
- Wallet: Freighter (extension de navegador, como MetaMask para Stellar)

**Proceso de desarrollo**:
```bash
# 1. Instalar Rust
rustup update

# 2. Instalar Stellar CLI
cargo install --locked stellar-cli

# 3. Crear proyecto
stellar contract init mi-proyecto
cd mi-proyecto

# 4. Configurar testnet
stellar network add --global testnet \
  --rpc-url https://soroban-testnet.stellar.org:443

# 5. Crear identidad y financiar
stellar keys generate alice --network testnet --fund

# 6. Compilar contrato
stellar contract build

# 7. Desplegar en testnet
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/mi_contrato.wasm \
  --source alice \
  --network testnet
```

**Hello World en Soroban (Rust)**:
```rust
#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, Symbol, Vec};

#[contract]
pub struct HelloContract;

#[contractimpl]
impl HelloContract {
    pub fn hello(env: Env, to: Symbol) -> Vec<Symbol> {
        vec![&env, symbol_short!("Hello"), to]
    }
}
```

---

## Lendara Protocol

Protocolo de inversion construido sobre Stellar/Soroban que estandariza flujos de inversion, convirtiendo actividades generadoras de ingresos en **pools de inversion tokenizados**.

| Campo | Detalle |
|-------|---------|
| SDK | `npm install @lendara/sdk` |
| Docs | lendaraprotocol.gitbook.io/lendara |
| Sectores | Real estate, trade financing, agricultura, microfinanzas |
| Licencia | MIT |

---

## Wallets

### Freighter (Oficial Stellar)
- Extension de navegador (Chrome, Brave, Firefox)
- Non-custodial (el usuario controla sus claves)
- Permite firmar transacciones y contratos Soroban
- URL: www.freighter.app

---

## Redes

| Red | Uso | RPC Endpoint |
|-----|-----|-------------|
| **Testnet** | Desarrollo y pruebas | https://soroban-testnet.stellar.org:443 |
| **Futurenet** | Features experimentales | Disponible |
| **Mainnet** | Produccion (requiere RPC de terceros) | Quicknode, Blockdaemon, etc. |

**Faucet Testnet**: Friendbot financia automaticamente nuevas cuentas.

---

## USDC en Stellar

- Stablecoin 1:1 con USD, disponible en Stellar
- Mas de $200M USDC circulando en Stellar
- Transacciones instantaneas y baratas
- Partners: MoneyGram, Coinme, etc.

---

## Recursos Oficiales

| Recurso | URL |
|---------|-----|
| Guia Vendimia Tech | github.com/BuenDia-Builders/stellar-guide-vendimia-tech |
| Lendara Protocol | lendaraprotocol.gitbook.io/lendara |
| Stellar Developers | developers.stellar.org |
| Soroban Docs | soroban.stellar.org |
| Freighter Wallet | freighter.app |
| Soroban Quest | quest.stellar.org/soroban |
| OpenZeppelin Stellar | docs.openzeppelin.com/stellar-contracts |
| Stellar Lab | lab.stellar.org |
| Soroswap (DEX) | soroswap.finance |

---

## Mentores CuyoConnect

Disponibles para ayudar:
- Miercoles: 15 a 20hs
- Jueves: 15 a 21hs
- Viernes: 9 a 17hs

---

## Entrega en DoraHacks (IMPORTANTE)

Cumplir DOS PASOS antes del viernes 17:00 hs:
1. Crear el BUIDL en tu perfil
2. Entrar a la hackathon, click "Submit BUIDL" y elegir Track Stellar

**Sin el paso 2, NO evaluan el proyecto!**
