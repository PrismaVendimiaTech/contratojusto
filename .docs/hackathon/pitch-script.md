# ContratoJusto - Guión de Pitch (5 minutos)
## Presentación en Vivo - Vendimia Tech 2026

---

## 0:00 - 0:30 GANCHO (Hook)

**[Mirar al público]**

"En Argentina, 1 de cada 2 trabajadores no tiene jubilación, no tiene indemnización, no tiene derechos laborales. Son limpiadoras, albañiles, vendedoras en la calle. Ganan en efectivo. No tienen protección.

Y mientras tanto, los ahorros en pesos se evaporan. 200% de inflación anual significa que los 1000 pesos que guardaste hace un año ahora valen 330.

¿Cómo le doy derechos laborales a alguien sin banco, sin sindicato, sin papeleo? La respuesta está en la blockchain."

---

## 0:30 - 1:30 PROBLEMA + CONTEXTO

**[Hablar con pasión, no como corporativo]**

"Miren, en Argentina hay 11 millones de trabajadores informales. Trabajadores de verdad. Gente que rompe el lomo todos los días. Pero cuando algo sale mal—se enferman, el empleador desaparece, se echa una mano—se quedan sin nada. Sin colchón. Sin red de contención.

Los bancos no los quieren. ANSES les dice 'necesitás monotributo'. Los sindicatos no los ven. Y los empleadores, muchos de buena fe, quieren hacer lo correcto pero no saben cómo: no hay forma legal simple de poner de lado dinero para indemnización sin trámites burocráticos de 6 meses.

Entonces, ¿qué pasa? El trabajador se queda sin ahorro. El empleador se queda sin herramienta. Ambos pierden.

Y los pesos, bueno... desaparecen."

---

## 1:30 - 2:30 SOLUCIÓN: CONTRATOJUSTO

**[Sacar el teléfono/laptop, mostrar la pantalla]**

"Les presento ContratoJusto. Es un contrato laboral digital que vive en la blockchain de Stellar.

¿Qué significa eso en la realidad?

Un empleador abre una página, crea un contrato con su trabajador. Dice: 'Te voy a depositar 100 dólares'. El contrato automáticamente separa ese dinero: 70 dólares van a ahorro—dinero que el trabajador puede usar cuando quiera. 30 dólares van a indemnización—dinero que está protegido hasta que termine el contrato.

El trabajador abre un chat. Escribe en español normal:

'¿Cuánto ahorré?'

El sistema le contesta:

'Tienes 70 dólares de ahorro'.

'Quiero mi dinero.'

El sistema le dice: 'Dale, firma aquí'. El trabajador firma con su wallet. Listo. Los dólares llegan a su bolsillo.

¿Lo mejor? Que es tan simple que hasta mi abuela lo entiende. Y tan seguro que nadie puede robar, porque el contrato está en la blockchain. Es inmutable."

---

## 2:30 - 3:30 CÓMO FUNCIONA TÉCNICAMENTE

**[Un poco más técnico, pero todavía accesible]**

"Ahora, detrás de escenas, ¿qué está pasando?

Yo escribí un smart contract en Rust que se ejecuta en Soroban—eso es la máquina virtual de la blockchain de Stellar. Es un código que nadie puede cambiar, nadie puede hackear, nadie puede sobornar.

Cuando un empleador deposita dinero, el contrato automáticamente calcula el split. 70% aquí, 30% allá. Sin intermediarios. Sin bancos. Sin AFIP mirando qué pasó.

El trabajador tiene una interfaz con un chat basado en IA. Ese chat lee la blockchain en tiempo real. Si el trabajador pregunta '¿Mi jefe depositó este mes?', el chat mira el historial de transacciones on-chain y le dice sí o no.

Cuando el trabajador quiere sacar dinero, el chat prepara una transacción. El trabajador la firma con su wallet—la misma wallet que usa para cualquier cosa en Stellar. La blockchain ejecuta esa firma. Los dólares se transfieren.

Todo sucede en segundos. Los costos de transacción son litarales: fracción de centavo.

Y los fondos están en USDC—dólares digitales. Protegidos de la inflación argentina."

---

## 3:30 - 4:30 DEMO EN VIVO

**[Mostrar la app]**

"Vamos a verlo en vivo.

**[Navegar a https://contratojusto.nuestrascuentitas.com]**

Aquí está la página de inicio. El empleador puede hacer click acá para crear un contrato. Ingresa la dirección de la wallet del trabajador, el salario de referencia, el porcentaje de ahorro.

**[Hacer click en 'Crear Contrato']**

Esto genera un número de contrato único. Es la identidad del trabajador con este empleador.

Ahora, un empleador deposita dinero. Digamos 100 USDC. El contrato recibe eso y automáticamente lo parte.

**[Mostrar pantalla de depósito/balance]**

Eso es el balance del trabajador. 70 disponibles. 30 protegidos como indemnización.

Ahora, el trabajador abre el chat.

**[Abrir chat]**

Escribe: '¿Cuánto tengo?'

**[El chat responde con el balance actualizado]**

Pregunta: '¿Cuándo puede mi empleador depositar de nuevo?'

**[Chat responde]**

El trabajador dice: 'Quiero retirar mi ahorro.'

**[Chat prepara la transacción, muestra la wallet prompt]**

El trabajador firma con su wallet, y listo. Los dólares están en su poder."

---

## 4:30 - 5:00 ROADMAP + CALL TO ACTION

**[Volver a mirar al público, tono apasionado]**

"Esto es un MVP. Funciona. Está en Stellar testnet. Pero el roadmap es mucho más grande.

Queremos:

- **Mainnet en Stellar**: esto va a producción con auditoria de seguridad.
- **Reputación en cadena**: los empleadores que depositan puntualmente van a tener un badge que dice 'Este empleador es confiable'. Eso atraer trabajadores buenos.
- **Bot de Telegram**: porque no todos tienen acceso a una página web. Algunos trabajadores van a querer interactuar desde su teléfono, desde un chat.
- **Conversión automática**: USDC a pesos argentinos, si el trabajador lo necesita, sin que tenga que entrar a un exchange.

Pero lo que yo creo que es realmente especial es esto: por primera vez, un trabajador informal en Argentina puede tener derechos laborales que están escritos en código, no en papel. Derechos que no se pueden ignorar. Derechos que se ejecutan solos.

ContratoJusto no es una plataforma. Es un movimiento.

Si creen que los trabajadores informales merecen protección, si creen que la tecnología puede ser una herramienta de justicia social, bueno...

Ustedes ya saben donde encontrar el código:

**github.com/PrismaVendimiaTech/contratojusto**

Gracias."

**[Pausa, sonrisa]**

---

## NOTAS DE DELIVERY

- **Tono**: Auténtico, apasionado, no corporativo. Gabriel es un developer solo en un hackathon, no un CEO vendiendo un producto.
- **Pausa dramática**: Usa silencios después de preguntas ("¿Cómo le doy derechos laborales...?"). Déjalas resonar.
- **Gestos**: Muévete en el escenario. Muestra la pantalla con confianza. Mira a los ojos cuando mencionas a los trabajadores informales.
- **Pacing**: La primera mitad (problema) es lenta, deliberada, emocional. La segunda mitad (solución + demo) es más rápida, energética.
- **Cierre**: El GitHub URL es la llamada a la acción. Di la URL en voz alta dos veces.
