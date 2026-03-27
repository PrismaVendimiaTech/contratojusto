# ContratoJusto

> Derechos laborales digitales para trabajadores informales en Argentina, sobre Stellar blockchain.

## El problema

En Argentina, el 46% de los trabajadores son informales. No tienen jubilacion, indemnizacion ni derechos laborales verificables. Con una inflacion superior al 200% anual, sus ahorros en pesos se evaporan.

## La solucion

**ContratoJusto** es un contrato laboral digital sobre Stellar que:

- **Acumula ahorro en dolares (USDC)**: protegido de la inflacion argentina
- **Separa automaticamente**: cada deposito se divide en ahorro + indemnizacion
- **Es auto-ejecutable**: cuando el empleador termina el contrato, la indemnizacion se libera automaticamente al trabajador
- **Tiene un asesor IA**: el trabajador habla en castellano simple con un chat que consulta la blockchain por el

## Demo en vivo

https://contratojusto.nuestrascuentitas.com

### Flujo

1. Empleador crea contrato (70% ahorro, 30% indemnizacion)
2. Empleador deposita 100 dolares -> 70 a ahorro + 30 a indemnizacion
3. Trabajador abre el chat: "cuanto tengo?" -> "Tenes 70 dolares de ahorro"
4. Trabajador: "quiero mi ahorro" -> IA prepara la transaccion -> firma -> listo
5. Empleador termina contrato -> indemnizacion se libera automaticamente

## Stack

| Componente | Tecnologia |
|---|---|
| Smart Contract | Rust / Soroban (Stellar) |
| Frontend | Next.js 15 + Tailwind CSS + framer-motion |
| Wallet | Stellar Wallets Kit (Freighter, Albedo, xBull) |
| AI Chat | Vercel AI SDK + micro-proxy (LLM gateway) |
| Token | USDC en Stellar Testnet |

## Correr localmente

```bash
git clone https://github.com/PrismaVendimiaTech/contratojusto.git
cd vendimia-tech
pnpm install
cp .env.example .env.local
pnpm dev
# Abrir http://localhost:3000
```

> La API key de IA incluida es temporal y expira el 30/03/2026.
> Para uso posterior, configurar tu propia key en `.env.local`.

### Prerequisitos

- Node.js 20+
- pnpm

### Compilar el smart contract (opcional)

```bash
# Requiere Rust + stellar-cli
cd packages/contract
cargo test
stellar contract build
```

## Estructura del proyecto

```
vendimia-tech/
  packages/
    contract/       -- Smart contract Soroban (Rust)
    frontend/       -- Next.js web app
      app/          -- Pages (home, trabajador, empleador)
      components/   -- 22 UI components
      lib/          -- Contract, wallet, AI tools
      providers/    -- WalletProvider, ContractProvider
  .docs/
    wiki/           -- 41+ documentos spec-driven
    plans/          -- Implementation plans
```

## Hackathon

- **Evento**: Vendimia Tech 2026 (Mendoza, Argentina)
- **Track**: Stellar - Impacto Social
- **Equipo**: Gabriel Paz (solo)
- **Submission**: [DoraHacks](https://dorahacks.io/hackathon/2040/tracks#stellar-track)

## Roadmap

- [ ] Deploy en Stellar mainnet con auditoria
- [ ] Integracion con Trustless Work (escrow estandar)
- [ ] Telegram bot como canal secundario
- [ ] Reputacion de empleador on-chain
- [ ] Conversion automatica USDC/ARS via anchors

## Licencia

MIT
