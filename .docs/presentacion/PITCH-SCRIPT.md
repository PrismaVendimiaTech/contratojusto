# Guion de Pitch - ContratoJusto
## Vendimia Tech 2026 | Stellar Track | 5 minutos

---

## Estructura de tiempo

| Bloque | Tiempo | Duracion |
|---|---|---|
| El Problema | 00:00 - 00:45 | 45 seg |
| La Solucion | 00:45 - 01:30 | 45 seg |
| Por que Chat con IA | 01:30 - 02:15 | 45 seg |
| Demo en vivo | 02:15 - 03:30 | 75 seg |
| Integracion Stellar | 03:30 - 04:15 | 45 seg |
| Impacto y cierre | 04:15 - 05:00 | 45 seg |

---

## BLOQUE 1: EL PROBLEMA (00:00 - 00:45)

**[Slide 2 en pantalla]**

Trece millones de personas.

Ese es el numero de trabajadores informales en Argentina. El 46% de la fuerza laboral. Albaniles, empleadas domesticas, repartidores, cuidadores. Gente que trabaja todos los dias y que al final del mes no tiene jubilacion, no tiene indemnizacion, no tiene ningun respaldo verificable.

Y ademas de eso, la inflacion se comio el 200% del valor del peso el año pasado. Si Carlos, que es albañil y cobra en efectivo, quiere guardar algo para el futuro, ese dinero vale la mitad en seis meses.

No es un problema de educacion financiera. Es un problema de infraestructura.

**[Pausa breve]**

---

## BLOQUE 2: LA SOLUCION (00:45 - 01:30)

**[Slide 4 en pantalla]**

ContratoJusto es un contrato laboral digital construido sobre Stellar.

El empleador deposita USDC. En ese momento, un smart contract Soroban divide automaticamente el deposito: un porcentaje va al fondo de ahorro del trabajador, otro va al fondo de indemnizacion. Todo en la blockchain. Inmutable. Sin intermediarios. Sin posibilidad de incumplimiento.

Si la empresa desaparece manana, los fondos del trabajador siguen ahi.

El empleador no puede "olvidarse". El contrato se ejecuta solo.

Y los fondos estan en dolares. No en pesos que se evaporan.

---

## BLOQUE 3: POR QUE CHAT CON IA (01:30 - 02:15)

**[Slide 5 en pantalla]**

Ahora, el detalle de diseño mas importante que tomamos.

Tres mil millones de personas usan chat a diario. No hace falta saber que es una blockchain. No hace falta entender que es una private key. No hace falta haber escuchado la palabra "DeFi" en su vida.

Si Carlos sabe usar WhatsApp, sabe usar ContratoJusto.

El chat en espanol traduce sus preguntas en lenguaje natural a transacciones Soroban. El modelo de lenguaje resuelve la complejidad de fondo. El usuario solo firma con su wallet cuando quiere hacer una transaccion.

La blockchain es infraestructura. El producto es la conversacion.

---

## BLOQUE 4: DEMO EN VIVO (02:15 - 03:30)

**[Slide 6 en pantalla - abrir https://nuestrascuentitas.com]**

Vamos a verlo en accion.

**[Abrir el chat, escribir:]**
"Hola, cuanto ahorre este mes?"

**[Mostrar respuesta del sistema]**
Ven? El sistema consulta el contrato on-chain en tiempo real y responde en lenguaje natural. Ningun menú tecnico. Ningun ABI. Ningun explorer de blockchain.

**[Iniciar deposito de prueba]**
Ahora vamos a simular un deposito. El empleador envia 50 dolares.

**[Mostrar la firma con wallet]**
El sistema prepara la transaccion y la wallet pide confirmacion al usuario. El usuario controla. La IA facilita, no ejecuta por su cuenta.

**[Mostrar confirmacion]**
Transaccion confirmada. El split se ejecuto. El trabajador ya tiene sus fondos separados en ahorro e indemnizacion.

Todo esto en Stellar Testnet, con fees de cero coma cero cero cero cero uno dolares.

---

## BLOQUE 5: INTEGRACION STELLAR (03:30 - 04:15)

**[Slide 7 en pantalla]**

Por que Stellar.

Primero, los fees. Un micro-deposito de diez dolares con fee de dos dolares en Ethereum no tiene sentido economico para un trabajador informal. En Stellar, el fee es practicamente cero.

Segundo, velocidad. Cinco segundos de confirmacion.

Tercero, USDC nativo. No hay bridges. No hay riesgo de liquidez en el proceso de conversion.

Tecnicamente: usamos Soroban para el smart contract, escrito en Rust, menos de 150 lineas, completamente auditeable. Stellar Wallets Kit para la conexion multi-wallet. Y la red de Stellar Testnet para el MVP.

---

## BLOQUE 6: IMPACTO Y CIERRE (04:15 - 05:00)

**[Slide 9 y 10 en pantalla]**

El MVP esta funcionando. El flujo completo: deposito, split, consulta, retiro. En Stellar Testnet. Hoy.

El mercado son 13 millones de personas en Argentina. Y eso es solo el inicio. Peru, Bolivia, Colombia tienen el mismo problema.

Roadmap inmediato: mainnet, bot de Telegram para sectores donde WhatsApp no alcanza, y reputacion on-chain del empleador para que los buenos comportamientos queden registrados para siempre.

**[Pausa]**

ContratoJusto. Porque cada deposito deberia ser un acto de justicia laboral verificable.

Gracias.

---

## Q&A - Preguntas frecuentes anticipadas

### "Por que no una app bancaria tradicional?"
Los bancos excluyen al trabajador informal. Sin CBU, sin cuenta, sin producto. Ademas, la inflacion en pesos sigue siendo el enemigo. USDC en Stellar resuelve los dos problemas a la vez.

### "Como onboarda a alguien sin experiencia en cripto?"
La wallet Freighter se instala como extension de Chrome en 2 minutos. El empleador la necesita, el trabajador puede interactuar solo con el chat. Para el trabajador, la experiencia es identica a un chat de texto.

### "El contrato es legal en Argentina?"
El MVP prioriza la proteccion practica sobre la legalidad formal. Un acuerdo on-chain verificable y publico tiene mas peso practico que un contrato de papel que nadie cumple. La regulacion de contratos digitales avanza globalmente.

### "Que pasa si el empleador pierde acceso a su wallet?"
Los fondos del trabajador ya estan en el contrato. El empleador no puede retirarlos. El trabajador puede reclamarlos con su propia wallet independientemente.

### "Por que USDC y no otra stablecoin?"
USDC es el estandar mas auditado, con mayor liquidez, y tiene soporte nativo en Stellar. Es la opcion con menor riesgo para fondos laborales.

---

## Tips de entrega

- Hablar despacio en el bloque del problema. La emocion viene de la claridad, no de la velocidad.
- Cuando dices "13 millones", sostener el numero con una pausa.
- En la demo, si algo falla: "Mientras carga, lo que estan viendo es..." y seguir con el guion.
- El Q&A va a incluir preguntas sobre regulacion y sobre la wallet. Tener esas respuestas memorizadas.
- Tiempo ideal de practica: dos ensayos completos antes del pitch.
