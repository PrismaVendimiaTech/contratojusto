# MiContrato - Diseno de Producto

> Derechos laborales digitales para trabajadores informales en Argentina

---

## El Problema

En Argentina, el **46%+ de los asalariados trabaja en negro** (INDEC). Estos trabajadores:
- No tienen **caja de jubilacion** (no acumulan retiro)
- No tienen **indemnizacion** (si los echan, no reciben nada)
- No tienen contrato verificable (dependen de la buena fe del empleador)
- Su dinero se devalua por inflacion (peso argentino pierde valor constantemente)

**Escala**: Millones de trabajadores afectados. Sectores mas impactados: agricultura (Mendoza), construccion, servicio domestico, gastronomia, comercio informal.

---

## La Solucion: MiContrato

Un **smart contract** que funciona como contrato laboral digital:

1. **Empleador y trabajador firman un contrato inteligente** (con wallet, sin papeles)
2. **El empleador deposita mensualmente** en el contrato
3. **El contrato separa automaticamente** en 2 pools:
   - **Pool Jubilacion**: se auto-invierte en DeFi (stablecoins con rendimiento) para proteger contra inflacion
   - **Pool Indemnizacion**: locked, solo se libera si el contrato termina
4. **El trabajador accede a sus fondos** via wallet Beexo (app mobile)
5. **Un agente IA** gestiona las inversiones y envia alertas

### Diferenciador Clave
No dependes de que el gobierno o el empleador "cumplan". El smart contract es **auto-ejecutable e inmutable**. Si el empleador deposita, el dinero va automaticamente al pool correcto. Si el contrato termina, la indemnizacion se libera automaticamente al trabajador.

---

## Arquitectura General

```
EMPLEADOR                          TRABAJADOR
(MetaMask)                         (Beexo Wallet - xo-connect)
    |                                    |
    | deposit()                          | viewBalance()
    v                                    | claimJubilacion()
+---------------------------------------------------+
|           SMART CONTRACT (RSK Testnet)             |
|                                                    |
|  [Pool Jubilacion]    [Pool Indemnizacion]         |
|   - Auto-invest       - Locked hasta termino       |
|   - Vesting 1yr+      - Liberacion automatica      |
|   - Retiro parcial    - x meses de salario         |
|                                                    |
+---------------------------------------------------+
         |                          |
         v                          v
  [DeFi Yield]              [Agente IA - Hedera]
  DOC/USDRIF stablecoins    - Monitorea depositos
  Tropykus lending           - Auto-rebalanceo
                             - Alertas al trabajador
                             - Ejecuta pagos periodicos
```

---

## Proyecto 1: RSK + Beexo (PRIORIDAD 1 - $3,700 potencial)

### Smart Contract (Solidity - RSK Testnet)

**Funciones principales**:

```solidity
// Crear contrato laboral
function crearContrato(
    address trabajador,
    uint256 salarioMensual,
    uint8 porcentajeJubilacion,   // ej: 11% (como aportes reales)
    uint8 porcentajeIndemnizacion  // ej: 8.33% (1 mes por anio)
) external;

// Empleador deposita mensualmente
function depositar(uint256 contratoId) external payable;

// Trabajador reclama jubilacion (despues de vesting)
function reclamarJubilacion(uint256 contratoId) external;

// Trabajador reclama indemnizacion (solo si contrato terminado)
function reclamarIndemnizacion(uint256 contratoId) external;

// Empleador termina contrato (libera indemnizacion)
function terminarContrato(uint256 contratoId) external;

// Ver balance de pools
function verBalance(uint256 contratoId) external view returns (
    uint256 poolJubilacion,
    uint256 poolIndemnizacion,
    uint256 totalAcumulado
);
```

**Integracion DeFi** (nice to have):
- Conectar pool de jubilacion a Tropykus lending para generar yield
- O simplemente mantener en DOC (stablecoin) para proteger contra inflacion del peso

### Frontend (Next.js + ethers.js)

**Pantallas principales**:
1. **Home**: Conectar wallet (MetaMask o Beexo)
2. **Crear Contrato**: Formulario empleador -> define terminos
3. **Mi Contrato** (vista trabajador): Ver pools, balance, historial
4. **Depositar** (vista empleador): Depositar el monto mensual
5. **Reclamar** (vista trabajador): Retirar jubilacion o indemnizacion

### Integracion Beexo (xo-connect)
- `npm install xo-connect`
- Boton "Conectar con Beexo" en el frontend
- El trabajador usa Beexo como wallet principal
- Flujo de onboarding: instalar Beexo -> conectar -> ver contrato

### Entregables track RSK
- Smart contract desplegado en RSK Testnet
- Al menos 1 contrato creado + depositos (multiples transacciones)
- Demo accesible por link
- Video 5 min
- Repo GitHub

### Entregables track Beexo
- SDK xo-connect integrado y funcional
- Flujo de connect wallet demostrable
- UX clara para usuario latino

---

## Proyecto 2: Hedera (PRIORIDAD 2 - $2,500 potencial)

### Agente IA de Pagos: "MiContrato Agent"

**Concepto**: Un agente de IA que actua como "gestor financiero" del contrato laboral.

**Arquitectura**:
```
Trabajador/Empleador
    |
    | Lenguaje natural ("cuanto tengo acumulado?")
    v
+----------------------------------+
|  AGENTE IA (Hedera Agent Kit)    |
|  - LangChain + Python/JS        |
|  - Conectado a Hedera Testnet   |
|  - HTS para tokens de pago      |
+----------------------------------+
    |
    v
  Hedera Network
  - Registro de transacciones
  - Micro-pagos automaticos
  - Audit trail inmutable
```

**Funcionalidades del Agente**:
1. **Consultas**: "Cuanto tengo en mi pool de jubilacion?" -> Responde con balance
2. **Alertas**: "Tu empleador no deposito este mes" -> Notifica al trabajador
3. **Auto-inversion**: Rebalancea pools automaticamente segun condiciones de mercado
4. **Pagos**: Ejecuta transfers en Hedera cuando se cumplen condiciones
5. **Auditoria**: Todo queda registrado en Hedera (audit trail)

**Stack**:
- Hedera Agent Kit (Python SDK o JS)
- LangChain para orquestacion del agente
- Hedera Token Service (HTS) para pagos
- Frontend simple para interactuar con el agente

### Entregables track Hedera
- Agente funcional que ejecuta pagos en Hedera Testnet
- Demo de consultas en lenguaje natural
- Transacciones verificables en explorer
- Video + pitch
- Repo GitHub

### Calificar para el Pool de $1,000
- Tema: Pagos a traves de Agentes IA (exactamente lo que piden)
- Integrado con Hedera: si (HTS + Agent Kit)
- Funcional: si (demo con transacciones reales en testnet)

---

## Proyecto 3: Stellar Ideathon (PRIORIDAD 3 - $500)

### Propuesta: "MiContrato Global"

**Concepto**: Extender MiContrato a trabajadores migrantes usando Stellar.

**Narrativa del deck**:
1. **Problema**: Trabajadores argentinos en el exterior (o extranjeros en Argentina) no tienen proteccion laboral en ninguno de los dos paises
2. **Solucion**: MiContrato Global usa Stellar para pagos transfronterizos
   - Empleador en USA paga en USDC via Stellar (rapido, barato)
   - El contrato separa automaticamente jubilacion e indemnizacion
   - Soroban smart contract gestiona los pools
   - El trabajador accede desde cualquier pais via Freighter wallet
3. **Stack Stellar**: Soroban (smart contracts en Rust), USDC en Stellar, SEPs para integracion con bancos, Freighter wallet
4. **Validacion**: Datos de INDEC sobre informalidad, datos de remesas Argentina, testimonios

**Entregables**:
- Deck visual (Figma/Slides) - la artista lidera
- Video pitch 5 min - persona presencial presenta
- Datos de validacion de mercado

### Quien lo hace
- **Artista**: Diseno del deck completo
- **Persona presencial**: Graba/presenta el pitch en vivo
- Gabriel solo revisa que la parte tecnica sea coherente

---

## Proyecto 4: BNB Chain (PRIORIDAD 4 - Solo si hay tiempo)

### Bot de Telegram: "MiContrato Bot"

**Concepto**: Bot de Telegram con IA donde el trabajador consulta su contrato.

```
Trabajador en Telegram:
  "Cuanto tengo ahorrado?"
  -> Bot responde con balance y proyeccion

  "Mi empleador deposito este mes?"
  -> Bot verifica on-chain y responde

  "Cuanto me tocaria de indemnizacion?"
  -> Bot calcula segun contrato
```

**Stack**: ElizaOS + BSC/opBNB smart contract + Telegram API

**Reutilizacion**: El smart contract es IGUAL al de RSK (EVM-compatible), solo se despliega en BSC.

---

## Division de Trabajo (2 dias)

### DIA 1 (hoy)

| Hora | Gabriel (Backend) | Frontend Dev | Artista | Junior |
|------|-------------------|-------------|---------|--------|
| 0-2h | Smart contract Solidity base | Setup Next.js + ethers.js | Branding MiContrato (logo, colores) | Setup Beexo SDK (xo-connect) |
| 2-4h | Deploy en RSK testnet + transacciones | Pantallas: crear contrato, depositar | Disenar pantallas (Figma) | Integrar xo-connect en frontend |
| 4-6h | Setup Hedera Agent Kit | Pantalla: mi contrato (vista trabajador) | Comenzar deck Stellar Ideathon | Testing + documentacion |
| 6-8h | Agente basico Hedera funcionando | Conectar frontend con smart contract | Continuar deck | README + repo GitHub |

### DIA 2 (manana)

| Hora | Gabriel (Backend) | Frontend Dev | Artista | Junior |
|------|-------------------|-------------|---------|--------|
| 0-2h | Refinar agente Hedera + pagos HTS | Pulir UI ambos proyectos | Terminar deck Stellar | Testing integracion |
| 2-4h | Deploy Hedera en testnet | Responsive + accesibilidad | Assets para videos | Submit BUIDL early bird (RSK+Beexo) |
| 4-6h | Grabar video demo RSK+Beexo | Grabar video demo Hedera | Video Stellar Ideathon | Submit BUIDL Hedera + Stellar |
| 6-8h | Revision final + fixes | Revision final + fixes | Revision final decks | Verificar todos los submits |

---

## Potencial de Premios

| Track | Escenario Optimista | Escenario Conservador |
|-------|--------------------|-----------------------|
| RSK (1er lugar) | $1,000 | $300 (3er lugar) |
| RSK (early bird) | $100 | $100 (si somos de los primeros 7) |
| Beexo (mejor UX) | $100 | $0 |
| Beexo (early bird) | $50 | $50 (si somos de los primeros 8) |
| Hedera (1er lugar) | $300 | $200 (2do lugar) |
| Hedera (pool) | $200-$333 | $100-$200 |
| Stellar Ideathon | $300 (1er lugar) | $200 (2do lugar) |
| **TOTAL** | **$2,050 - $2,183** | **$950 - $1,050** |

> Incluso en el escenario conservador, el retorno es significativo para 2 dias de trabajo.
