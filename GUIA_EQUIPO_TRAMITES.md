# Guia de Setup - ContratoJusto (Stellar)

> Gabriel - Setup rápido para hackathon Vendimia Tech.
> Checklist de instalar y configurar Stellar development.

---

## 1. Cuenta DoraHacks

1. Anda a: **https://dorahacks.io**
2. Click en **"Log in"** -> **"Log in with GitHub"** (o email)
3. Anda a: **https://dorahacks.io/hackathon/2040/detail**
4. Click en **"Register as Hacker"**
5. Confirmar registro

---

## 2. Instalar Rust + Soroban

Soroban es el entorno de smart contracts de Stellar. Se escriben en Rust.

```bash
# Instalar Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Agregar wasm32 target (para compilar a WebAssembly)
rustup target add wasm32-unknown-unknown

# Verificar
rustc --version
```

---

## 3. Instalar Stellar CLI

```bash
# Instalar CLI
cargo install stellar-cli --locked

# Verificar
stellar version
```

---

## 4. Configurar Stellar Testnet

```bash
# Agregar testnet como red
stellar network add testnet \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"

# Crear identidad de desarrollo
stellar keys generate mi-wallet --network testnet

# Fondear con Friendbot (gratis - 10,000 XLM)
stellar keys fund mi-wallet --network testnet

# Verificar (deberia mostrar tu address publica)
stellar keys address mi-wallet

# Ver balance
stellar account info --account mi-wallet --network testnet
```

---

## 5. Instalar Freighter Wallet

Freighter es como MetaMask pero para Stellar.

1. Anda a: **https://freighter.app**
2. Click en **"Download"** -> **"Install for Chrome"**
3. Se abre Chrome Web Store -> Click **"Agregar a Chrome"**
4. Click en el icono de Freighter (arriba a la derecha del navegador)
5. Click **"Create New Wallet"** o importa si ya tenes
6. Anota tu seed phrase (12 palabras) - GUARDAR EN LUGAR SEGURO
7. **MUY IMPORTANTE**: En configuracion, cambiar a **TESTNET**
8. Fondear desde Freighter:
   - Click en icono de Freighter -> Click en tu address
   - Deberia haber opcion "Fund with Friendbot" o link a testnet faucet
   - Fondea con 10,000 XLM gratis

**Como saber que funciono**: Ves tu address en Freighter con balance >= 10,000 XLM.

---

## 6. Instalar Node.js + pnpm

Para el frontend.

```bash
# Instalar Node.js 20 (o mas nuevo)
nvm install 20
nvm use 20

# Instalar pnpm
npm install -g pnpm

# Verificar
node --version
pnpm --version
```

---

## 7. Verificar micro-proxy

El backend de IA ya esta deployado. Verificar que responde.

```bash
curl https://proxy.gestionturismo.xyz/health
# Deberia responder OK
```

---

## 8. Clonar stellar-guide (Referencia)

```bash
git clone git@github.com:BuenDia-Builders/stellar-guide-vendimia-tech.git
# Consultar durante desarrollo
```

---

## 9. Checklist Pre-Hackathon

- [ ] Rust instalado: `rustc --version`
- [ ] wasm32 target: `rustup target list | grep wasm32-unknown-unknown`
- [ ] Stellar CLI: `stellar version`
- [ ] Identidad testnet creada: `stellar keys address mi-wallet`
- [ ] Identidad fondeada: `stellar account info --account mi-wallet --network testnet` (XLM > 0)
- [ ] Freighter instalado en Chrome
- [ ] Freighter en TESTNET mode
- [ ] Freighter con balance >= 10,000 XLM
- [ ] Node.js 20+: `node --version`
- [ ] pnpm: `pnpm --version`
- [ ] micro-proxy respondiendo: `curl https://proxy.gestionturismo.xyz/health`
- [ ] stellar-guide clonado

---

## 10. Entregables - 27 Marzo 17:00

- [ ] Repo publico en GitHub
- [ ] README con instrucciones (como instalar + correr)
- [ ] Demo funcional (link o video)
- [ ] Video pitch (3-5 minutos)
- [ ] Subido a DoraHacks

---

## 11. Glosario Rapido

| Termino | Que es |
|---------|--------|
| **Stellar** | Blockchain de pagos rapidos y baratos |
| **Soroban** | Smart contracts de Stellar (se escriben en Rust) |
| **XLM** | Moneda nativa de Stellar (para gas/fees) |
| **USDC** | Dolar digital (stablecoin) en Stellar |
| **Freighter** | Wallet de Chrome para Stellar |
| **Friendbot** | Servicio gratis que regala XLM en testnet (10,000 por vez) |
| **Testnet** | Red de prueba (no dinero real) |
| **Mainnet** | Red real con dinero verdadero (NO usamos) |
| **Smart Contract** | Programa que vive en blockchain y se ejecuta solo |
| **WASM** | WebAssembly - formato binario que ejecuta Soroban |
| **RPC** | Punto de conexion a la red (Stellar, Soroban, etc) |

---

## 12. Links Utiles

- Stellar Docs: https://developers.stellar.org
- Soroban Docs: https://developers.stellar.org/docs/learn/soroban
- Stellar Laboratory: https://laboratory.stellar.org (herramienta web para transacciones)
- Stellar Testnet Explorer: https://stellar.expert/explorer/testnet
- Freighter: https://freighter.app
- DoraHacks Vendimia Tech: https://dorahacks.io/hackathon/2040

---

## 13. Troubleshooting Rapido

**P: Stellar CLI no se instala**
```bash
# Asegurate que Rust esta en PATH
source $HOME/.cargo/env
# Vuelve a intentar
cargo install stellar-cli --locked
```

**P: Freighter no se sincroniza con testnet**
- Recarga la pagina (F5)
- Desinstala y reinstala la extension
- Asegurate de estar en TESTNET en las settings

**P: Friendbot no fondea**
- Espera 5 minutos e intenta de nuevo (rate limit)
- Verifica que uses la address correcta: `stellar keys address mi-wallet`

**P: CLI y Freighter no muestran el mismo balance**
- Espera un bloque (5-10 segundos)
- Recarga Freighter manualmente

---

**Ultima actualizacion**: 26 Marzo 2026
**Para**: Gabriel - Hackathon Vendimia Tech 2025
