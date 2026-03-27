# Deck ContratoJusto - Contenido Slide a Slide

Instrucciones: copiar cada bloque en Canva / Google Slides / PowerPoint.
Paleta de marca: Verde oscuro #1a4731 | Blanco #ffffff | Negro #0a0a0a
Fuente sugerida: Inter o Montserrat

---

## SLIDE 1 - COVER

**Titulo (grande):**
ContratoJusto

**Subtitulo:**
El primer contrato laboral digital para el trabajador informal

**Tagline (pequeno, abajo):**
Construido sobre Stellar | Vendimia Tech 2026

**Nota visual:** fondo verde oscuro (#1a4731), texto blanco. Logo si tienen.

---

## SLIDE 2 - EL PROBLEMA

**Titulo:**
Una deuda pendiente con 13 millones de personas

**Columna izquierda (datos):**
- 46% de los trabajadores argentinos son informales
- 0 derechos laborales verificables
- 0 jubilacion
- 0 indemnizacion

**Columna derecha (datos):**
- Inflacion 2024: +200% anual
- Ahorros en pesos: pierden valor cada dia
- Cuenta bancaria: solo 60% de la poblacion tiene acceso

**Frase de impacto (abajo, grande):**
"Si te accidentas manana, nadie te cubre."

**Nota para el presentador:**
Empezar con el numero 13 millones. Pausa dramatica. Preguntar "cuantos de ustedes conocen a alguien en esta situacion?"

---

## SLIDE 3 - EL TRABAJADOR REAL

**Titulo:**
Este no es un problema abstracto

**Persona 1 - Carlos**
Albañil | 35 años | GBA
Ingreso: ~230 USD/mes en efectivo
Dispositivo: Android gama media
Miedo: estafas, complejidad, inflacion
Necesidad: guardar algo para el futuro sin que se lo coma la inflacion

**Persona 2 - Maria**
Empleada domestica | 42 años
Ingreso: ~170 USD/mes
Miedo: no le entran las cuentas
Necesidad: saber que su empleadora va a cumplir

**Frase de cierre:**
Carlos y Maria no necesitan aprender blockchain. Necesitan una herramienta que funcione.

**Nota para el presentador:**
Estas son personas reales con las que hicimos investigacion de usuarios. No son supuestos teoricos.

---

## SLIDE 4 - LA SOLUCION

**Titulo:**
ContratoJusto: un contrato digital que se cumple solo

**Diagrama central (3 pasos):**

```
EMPLEADOR deposita USDC
        |
        v
SOROBAN divide automaticamente
  |                    |
  v                    v
AHORRO (USDC)    INDEMNIZACION (USDC)
del trabajador   del trabajador
```

**Puntos clave:**
- Sin intermediarios
- Sin burocracia
- Sin banco
- Sin posibilidad de incumplimiento

**Frase de cierre:**
El contrato se ejecuta automaticamente. El empleador no puede "olvidarse".

**Nota para el presentador:**
Enfatizar el "se ejecuta solo". Eso es lo que no puede hacer ningun contrato de papel.

---

## SLIDE 5 - POR QUE CHAT CON IA

**Titulo:**
La interfaz mas inclusiva del mundo ya existe: el chat

**Estadistica:**
3.000.000.000 personas usan chat a diario

**Comparacion visual:**

| Blockchain tradicional | ContratoJusto |
|---|---|
| Instalar wallet | Abrir el chat |
| Entender private keys | Escribir en espanol |
| Leer direcciones 0x... | "Cuanto ahorre este mes?" |
| Aprender DeFi | Recibir respuesta clara |

**Cita:**
"Si sabes usar WhatsApp, sabes usar ContratoJusto."

**Como funciona el AI:**
El modelo de lenguaje traduce la conversacion en espanol a transacciones Soroban. El usuario firma. El usuario controla. La IA facilita, no decide.

**Nota para el presentador:**
Esta es nuestra decision de diseño mas importante. No simplificamos el blockchain, hacemos que el usuario nunca lo vea.

---

## SLIDE 6 - DEMO EN VIVO

**Titulo:**
Veamos como funciona

**Instruccion en el slide (grande):**
[DEMO EN VIVO]
https://nuestrascuentitas.com

**Flujo de demo:**
1. Entrar al chat como trabajador
2. Escribir: "cuanto ahorre este mes?"
3. Mostrar respuesta con datos reales on-chain
4. Iniciar un deposito de prueba
5. Firmar con wallet Freighter
6. Ver la transaccion confirmada en Stellar Testnet

**Nota para el presentador:**
Tener todo pre-cargado. Wallet conectada. Navegador abierto. Si algo falla, mostrar el video grabado como backup. Tiempo maximo para demo: 90 segundos.

---

## SLIDE 7 - INTEGRACION STELLAR

**Titulo:**
Por que Stellar es la eleccion correcta

**Tabla comparativa:**

| Criterio | Ethereum/EVM | Stellar/Soroban |
|---|---|---|
| Fee por tx | $2-20 | $0.00001 |
| Tiempo de confirmacion | 12-15 seg | 5 seg |
| Soporte nativo USDC | Si (bridge) | Si (nativo) |
| Complejidad para usuario | Alta | Baja |

**Integraciones en el proyecto:**
- Soroban smart contract (Rust, ~150 lineas, auditeable)
- Stellar Wallets Kit (Freighter, Albedo, xBull)
- USDC en Stellar Testnet (GBUQWP3BOUZX34STELLA5QC35CZUHG4DYUR67MRHR5QJQ5GGDTDSDUUN)
- Stellar Testnet Network: Test SDF Network ; September 2015

**Nota para el presentador:**
Los fees son el argumento economico clave. Un micro-deposito de 10 dolares con fee de 2 dolares (Ethereum) no tiene sentido. Con Stellar, el fee es irrelevante.

---

## SLIDE 8 - ARQUITECTURA

**Titulo:**
Sin backend. Sin SPOF. Sin intermediarios.

**Diagrama:**

```
  TRABAJADOR / EMPLEADOR
          |
          v
   Chat IA (espanol)
   Vercel AI SDK
          |
          v
   Frontend Next.js 15
   nuestrascuentitas.com
          |
          v
   Stellar Wallets Kit
   (Freighter / Albedo)
          |
          v
   Soroban Smart Contract
   Stellar Testnet
          |
          v
   USDC on-chain
   (unica fuente de verdad)
```

**Puntos clave:**
- Sin base de datos central
- Sin servidor que pueda ser hackeado
- Los fondos estan en la blockchain, no en nosotros
- Monorepo: packages/frontend + packages/contract

**Nota para el presentador:**
"Si nuestra empresa desaparece manana, los fondos del trabajador siguen ahi."

---

## SLIDE 9 - IMPACTO Y TRACCION

**Titulo:**
El mercado existe. El problema es real. El MVP funciona.

**Metricas del problema:**
- 13M trabajadores informales en Argentina
- 46% de la fuerza laboral sin derechos
- $2.400 USD promedio perdidos por trabajador/año en inflacion

**Estado del proyecto:**
- MVP funcional en Stellar Testnet
- Flujo completo operacional: deposito → split → consulta → retiro
- Chat IA en espanol funcionando
- 41+ documentos de arquitectura y UX

**Roadmap:**
1. Mainnet Stellar (proximo sprint)
2. Bot Telegram (canal preferido en sectores informales)
3. Reputacion on-chain del empleador (incentivo de comportamiento)
4. Expansion: Peru, Bolivia, Colombia

**Nota para el presentador:**
No exagerar con los numeros de traccion si no tenemos usuarios reales todavia. Enfocarse en el potencial de mercado y la solidez tecnica del MVP.

---

## SLIDE 10 - CALL TO ACTION

**Titulo:**
Probalo ahora

**Links grandes:**

Demo: https://nuestrascuentitas.com
Codigo: https://github.com/PrismaVendimiaTech/contratojusto

**Equipo:**
[NOMBRE 1] - [ROL]
[NOMBRE 2] - [ROL]
[NOMBRE 3] - [ROL]

**Frase de cierre:**
"Cada deposito es un acto de justicia laboral verificable en la blockchain."

**Nota para el presentador:**
Terminar con la frase de cierre en voz alta. Pausa. Gracias. Preguntas?

---

## Notas generales de diseño

- Fondo principal: verde oscuro #1a4731
- Texto principal: blanco #ffffff
- Acentos: verde medio #2d7a4f o dorado #c9a84c (si encaja con el logo)
- Evitar emojis en slides formales
- Mantener max 6 lineas de texto por slide
- Los datos numericos van grandes (font size 48+)
- Diagrama del slide 8: puede hacerse con formas simples en cualquier herramienta
