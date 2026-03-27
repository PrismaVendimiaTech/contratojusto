# Track Hedera - Economia Agentica ($2,000 USD + Pool $1,000)

## Resumen del Track

| Campo | Detalle |
|-------|---------|
| **Nombre** | Ecosistema Hedera & Economia Agentica |
| **Premio Total** | $2,000 USD + Pool Extra $1,000 |
| **Ideathon** | $500 USD (1ro: $250, 2do: $150, 3ro: $100) |
| **Hackathon** | $1,500 USD (1ro: $300, 2do: $200, Pool Extra: $1,000 repartido) |
| **Jurado** | Henry Tong + Martin Gutter |
| **Feedback** | El jurado da feedback detallado la semana posterior al evento |

### Prize Pool Extra ($1,000) - DINERO CASI GARANTIZADO
El pool de $1,000 se reparte **equitativamente entre TODOS los proyectos que cumplan los requisitos obligatorios**. Si hay 5 proyectos que califican, cada uno recibe $200. Si hay 10, cada uno recibe $100. Con solo 15 hackers registrados en toda la hackathon, es MUY probable recibir una parte significativa.

---

## Que es Hedera Hashgraph

**NO es blockchain tradicional** sino un grafo dirigido aciclico (DAG) que usa el algoritmo "gossip about gossip" + votacion asincronica.

| Caracteristica | Detalle |
|----------------|---------|
| TPS | 10,000 transacciones por segundo |
| Confirmacion | 3-5 segundos con finalidad |
| Costo por tx | ~$0.0001 (practicamente gratis) |
| Energia | Huella de carbono negativa |
| Token nativo | HBAR |
| Gobernanza | Governing Council de 39 organizaciones (Google, LG, Boeing) |
| Smart Contracts | EVM-compatible (Solidity) |
| Uptime | 100% desde 2018 |

---

## Economia Agentica - El Concepto Clave

**Que es**: Un paradigma donde agentes de IA autonomos no solo razonan y responden, sino que **compran, se suscriben y pagan de forma autonoma** usando blockchain.

**Por que Hedera**: Provee la capa de confianza (trust layer) con:
- Finalidad en tiempo real
- Verificabilidad de bajo costo ($0.0001/tx)
- Datos a prueba de manipulacion
- 10,000 TPS para miles de micro-transacciones simultaneas

### Protocolo x402
- Construido sobre HTTP 402 "Payment Required"
- Flujo: Cliente solicita recurso -> recibe 402 con costo -> paga -> accede
- Permite micro-pagos machine-to-machine
- Soporta HBAR o cualquier otro crypto asset

### Casos de Uso Reales
- Bots de auditoria autonoma en gobierno/finanzas/salud
- Monitoreo ESG y carbono en tiempo real
- Provenance de cadena de suministro via agentes
- Treasury management impulsado por IA

---

## Modalidad Ideathon ($500)

### El Desafio
Crear una **startup en 48hs** o **resolver un problema real de la region** usando los Studios de Hedera.

### Criterios de Evaluacion
- Foco en **negocios y marketing**
- Validacion de la idea
- Viabilidad del modelo comercial
- Buen pitch justificando **por que usar Hedera**

### Premios
- 1ro: $250 | 2do: $150 | 3ro: $100

---

## Modalidad Hackathon ($1,500 + Pool $1,000)

### El Desafio
Construir soluciones de **Pagos a traves de Agentes de IA**. Proyecto tecnico funcional e integrado.

### Premios
- 1ro: $300 | 2do: $200
- **Pool Extra: $1,000** repartido entre TODOS los que califiquen

---

## Hedera Agent Kit - Herramienta Principal

Framework open-source para construir apps de IA que interactuan con Hedera.

### Capacidades
- Crear agentes conversacionales que entienden lenguaje natural
- Ejecutar transacciones de Hedera programaticamente
- Pagos crypto programaticos (HBAR, tokens HTS)
- Treasury management autonomo
- Monitoreeo de balances y distribuciones de tokens

### SDKs Disponibles
- **JavaScript**: github.com/hashgraph/hedera-agent-kit-js
- **Python**: hedera-agent-kit-py (usa LangChain, Vercel AI SDK, o MCP)

### Arquitectura
- Sistema basado en **plugins** para maxima flexibilidad
- Soporte para LangChain, Vercel AI SDK, y MCP

---

## Toolkits de Hedera

### Asset Tokenization Studio
- Toolkit open-source para tokenizar valores y equidades
- Cumple ERC-1400 (US SEC) y ERC-3643
- Incluye KYC on-chain, whitelisting y compliance

### Stablecoin Studio
- SDK open-source para emitir stablecoins en Hedera
- Caso real: Shinhan Bank + Standard Bank (mercado de remesas de $702B)

### Hedera AI Studio
- Task automation con IA
- Creacion de tokens impulsada por IA
- Comunicacion inter-agente transparente
- Observable en tiempo real

### ProveAI
- Motor criptografico para audit trails de acciones de agentes
- Registro tamper-proof en ledger de Hedera

---

## Hedera Token Service (HTS)

Sistema nativo de tokens a nivel de protocolo:
- Hereda rendimiento de HBAR: 10,000+ TPS
- Costo: $0.0001 por transaccion
- Confirmacion: 3-5 segundos
- Energia: 0.00017 kWh por transaccion

---

## Developer Playground

Entorno interactivo de coding en el browser (sin setup local).

| Campo | Detalle |
|-------|---------|
| URL | portal.hedera.com/playground |
| Lenguajes | Java, JavaScript, Rust |
| Features | Escribir, ejecutar, descargar codigo |
| Faucet | Integrado (tokens de testnet gratis) |
| Redes | Testnet y Previewnet |

---

## Testnet y Faucet

- **Faucet anonimo**: 100 HBAR testnet cada 24 horas
- **Portal users**: 1,000 testnet HBAR diarios
- **URL**: portal.hedera.com/faucet
- Auto-crea cuenta cuando ingresas direccion de wallet EVM

---

## Arquitectura para "Pagos via Agentes IA"

```
Agente IA (Python/JS + LangChain)
  -> Evalua necesidad de pago
  -> Inicia transaccion via x402 o HTS
  -> Hedera procesa (3-5 seg, $0.0001)
  -> ProveAI registra audit trail
  -> Resultado verificable on-chain
```

### Flujo Tecnico Detallado
1. Agente autonomo evalua necesidad de pago
2. Inicia transaccion mediante x402 protocol o SDK directo
3. Capacidad nativa de Hedera para micro-transacciones
4. Transacciones confirmadas en 3-5 segundos
5. Costos predecibles (~$0.0001)
6. Throughput masivo (10,000+ TPS)

---

## Agenda en el Evento

### Keynotes
- "Blockchain en el Mundo Real" (Martin Gutter)
- "Economia Agentica" (Henry Tong)

### Workshops
- Beneficios de Hashgraph
- Toolkits de Hedera (Stablecoins, RWA, AI, Sustainability)
- Uso del Dev Playground y Agent Kit

### Universidades
- Hedera University Program (becas, bounties, oportunidades Web3)

---

## Recursos Oficiales

| Recurso | URL |
|---------|-----|
| Portal | portal.hedera.com |
| Playground | portal.hedera.com/playground |
| Faucet | portal.hedera.com/faucet |
| Docs | docs.hedera.com |
| Agent Kit JS | github.com/hashgraph/hedera-agent-kit-js |
| GitHub | github.com/hedera-dev |
| AI Studio | hedera.com/ai-studio |
| Asset Tokenization | hedera.com/asset-tokenization-studio |
