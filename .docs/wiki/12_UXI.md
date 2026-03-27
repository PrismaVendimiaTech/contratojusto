# 12 - Intención UX: ContratoJusto

## Propósito
Definir la sensación emocional diseñada para cada caso de uso crítico. La intención UX guía todas las decisiones de interacción, copy, color, timing y microinteracciones.

## Sensación global
**Calmo-seguro**: En todo momento el usuario debe sentir que:
- Sus fondos están protegidos y bajo su control
- El sistema es predecible y no sorprenderá negativamente
- No hay riesgo oculto ni complejidad invisible
- Puede confiar incluso si no entiende la tecnología

---

## Intenciones por caso de uso crítico

### CASO 1: Carlos ve su balance por primera vez

**Contexto**
Carlos abre la app después de recibir su primer depósito. Necesita saber: ¿Está mi dinero aquí? ¿Alguien lo puede tocar?

**Pensamiento del usuario**
> "Ah, ahí están mis dólares. Nadie los tocó. Es real."

**Sensación objetivo**
- Alivio: confirmación de que la plata existe
- Protección: certeza de que está segura
- Orgullo silencioso: "Estoy ahorrando"

**Indicadores UX concretos**
| Elemento | Decisión | Por qué |
|----------|----------|--------|
| Números | Grandes y claros (24px+) | Legibilidad instantánea |
| Color de monto positivo | Verde esmeralda (#10B981) | Vida, crecimiento, esperanza |
| Fuente números | Inter Bold, monoespace | Dinero = precisión |
| Fondo card | Blanco limpio, sombra suave | Vulnerabilidad visual baja |
| Animaciones | Ninguna | Sin distracciones, nitidez mental |
| Símbolo moneda | USD o $ | No $ ARS, enfatizar dólares |
| Ícono seguridad | 🛡️ pequeño, arriba | Recordatorio subliminal: protección |
| Desglose | Ahorro + Indemnización por separado | Transparencia total |

**Frase clave (copy)**
```
"Tu ahorro está protegido: 70 dólares."
```
- Estructura: [ACCIÓN] [GARANTÍA] [NÚMERO]
- Tono: Calido profesional, afirmativo
- Palabra clave: "protegido" (no "guardado", no "almacenado")

**Microinteracciones**
- El balance se carga suave (fade-in 200ms) no instantáneo
- Si hay actualización desde el servidor, el número cambia sin flash rojo/verde
- Tooltip al pasar sobre "Indemnización": "Se libera si termina el contrato"

---

### CASO 2: Carlos reclama su ahorro

**Contexto**
Carlos necesita su dinero para una emergencia. Va a pedirlo al AI. Si sale mal, pierde confianza en el sistema para siempre.

**Pensamiento del usuario**
> "Yo decidí sacar mi plata y llegó a mi wallet. Nadie me bloqueó."

**Sensación objetivo**
- Control: "Soy yo quien decide cuándo sacar"
- Certeza: "La transacción va a funcionar"
- Alivio profundo: "El dinero llegó cuando lo necesité"

**Indicadores UX concretos**
| Elemento | Decisión | Por qué |
|----------|----------|--------|
| Confirmación visual | "Listo. 70 dólares transferidos." | Cierre emocional inmediato |
| Animación de éxito | Check verde suave (400ms) | Confirmación visual clara, no euforia |
| Monto destacado | Mismo color verde esmeralda | Refuerzo: "es dinero tuyo" |
| Tiempo de espera | Mostrar "Procesando..." durante TX | Transparencia sobre el esperar |
| Verificación | Link a explorador de Stellar (oculto pero disponible) | Para paranoicos, no obligatorio |
| Siguiente paso | "Revisa tu wallet" | Guía suave al siguiente paso |
| Cancelación imposible | Post-firma no se puede cancelar | Claridad sobre irreversibilidad |

**Frase clave (copy)**
```
"Listo. 70 dólares fueron transferidos a tu wallet."
```
- Estructura: [COMPLETITUD] [CANTIDAD] [DESTINO]
- Tono: Celebratorio pero sereno
- Palabra clave: "transferidos" (acción completada, pasado)

**Microinteracciones**
- Después de la firma, mensaje loading: "Tu transacción está siendo registrada..." (mientras Stellar confirma)
- Post-confirmación: El monto en el chat se tilda/marca como "enviado"
- Opcionalmente: Un pequeño sonido suave (ding) si volumen está activado

**Timing crítico**
- Firma a resultado: máximo 15 segundos en Testnet
- Si tarda más de 5 segundos: mostrar "Casi listo..." para evitar que piense que se colgó

---

### CASO 3: Carlos habla con el AI por primera vez

**Contexto**
Carlos abre la app, ve un chatbot. Miedo instintivo: "¿Voy a poder usarlo? ¿Me va a entender?"

**Pensamiento del usuario**
> "Es como hablar con alguien que sabe de esto, pero no me complica."

**Sensación objetivo**
- Confianza: "Hay alguien aquí que me ayuda"
- Familiaridad: "Es como WhatsApp, pero mejor"
- Seguridad: "No voy a romper nada si respondo mal"

**Indicadores UX concretos**
| Elemento | Decisión | Por qué |
|----------|----------|--------|
| Burbuja inicial | Calidez + nombre | "Te conozco" |
| Tiempo respuesta | <500ms balance (cached), <2s primera respuesta AI, <3s respuesta con tools. Si >3s: mostrar 'El asistente esta procesando...' | Cobertura completa de latency |
| Lenguaje | Muy simple, frases cortas | Carlos no está acostumbrado |
| Emojis | Limitados (🤖 🛡️ 💰 ✅) | Emoción sin confusión |
| Preguntas sugeridas | "¿Cuánto tengo?" "Quiero sacar" | Opciones en lugar de input vacío |
| Errores | Nunca decir "comando no reconocido" | Decir "No entendí. ¿Querés...?" |
| Corrección | Si malentiende, ofrecer alternativas | No rechazar, redirigir |
| Ícono AI | 🤖 amigable, no intimidante | Robótica cálida, no corporativa |

**Frase clave (copy - primer mensaje)**
```
"Bienvenido. Soy tu asesor de ContratoJusto. Preguntame lo que necesites."
```
- Estructura: [BIENVENIDA] [IDENTIFICACIÓN] [INVITACIÓN]
- Tono: Cálido, profesional, invitador
- NO dice: "Soy un asistente de IA", "Comandos disponibles", "Escribe /help"

**Preguntas sugeridas (ejemplos)**
```
"¿Cuánto tengo ahorrado?"
"Quiero sacar dinero"
"¿Qué es la indemnización?"
"Mi patrón cuándo deposita?"
```
- Una línea cada una
- Lenguaje conversacional (no "Obtener saldo")
- Cliqueables = no necesita escribir

**Microinteracciones**
- Las burbujas del AI entran desde la izquierda suavemente (no de golpe)
- Mientras escribe la respuesta: mostrar "..." animados (bouncing dots)
- Cuando termina la respuesta, dots desaparecen suavemente
- Si hay card de balance, aparece con fade-in debajo del texto

---

### CASO 4: Empleador deposita USDC

**Contexto**
El patrón acaba de comprar USDC y lo va a depositar por primera vez. Necesita certeza de que fue correcto.

**Pensamiento del usuario (patrón)**
> "Hice bien. El dinero se dividió correctamente. Está registrado."

**Sensación objetivo**
- Cumplimiento: "Cumplo mis obligaciones"
- Responsabilidad: "Estoy registrando esto de verdad"
- Claridad: "Sé exactamente dónde va cada peso"

**Indicadores UX concretos**
| Elemento | Decisión | Por qué |
|----------|----------|--------|
| Resumen post-depósito | Desglose claro 70/30 | Transparencia total |
| Confirmación | "Depósito registrado: 100 USDC" | Cierre, no pregunta |
| Historial | Actualización inmediata en timeline | Prueba de que ocurrió |
| Monto trabajador | Destacado en verde | Responsabilidad completada |
| Monto fondo indemn. | Gris neutral | Separado visualmente |
| Transacción TX | Hash (oculto pero disponible) | Para que verifique si desea |
| Próximo paso | Sugerencia: "Próximo depósito: en 7 días" | Rutina establecida |

**Frase clave (copy)**
```
"Depósito registrado. 70 dólares a ahorro, 30 a indemnización."
```
- Estructura: [ESTADO] [CANTIDAD A] [CANTIDAD B]
- Tono: Administrativo, formal
- Palabra clave: "registrado" (acción oficial, transparencia)

**Desglose visual (en dashboard)**
```
Depósito: $100 USDC
├─ Ahorro (70%) ......... $70 ✅
└─ Indemnización (30%) .. $30 ✅
```
- Estructura de árbol clara
- Checkmarks verdes = completitud
- Moneda consistente

**Microinteracciones**
- Los montos se "rellenan" visualmente (animación de contador de 0 a 70)
- Al completarse, pequeño sonido de éxito (opcional, puede ser deshabilitado)
- El historial se actualiza con fade-in del nuevo depósito en la parte superior

---

### CASO 5: Empleador termina contrato

**Contexto**
El patrón decide cerrar el contrato. Debe entender que la indemnización se libera INMEDIATAMENTE al trabajador.

**Pensamiento del usuario (patrón)**
> "Terminé esto correctamente. El trabajador recibió lo que le corresponde."

**Pensamiento del usuario (Carlos - notificación)**
> "Mi contrato terminó. ¿Y ahora? ¿Mi indemnización?" → Confirmación: "Recibiste 30 dólares"

**Sensación objetivo para patrón**
- Seriedad: "Esto es oficial"
- Justicia: "Cumplí mi obligación"
- Cierre: "Se terminó limpiamente"

**Sensación objetivo para trabajador**
- Claridad: "Entiendo qué pasó"
- Sorpresa positiva: "Recibí dinero que no esperaba"
- Justicia: "Me trataron bien"

**Indicadores UX concretos (Dashboard patrón)**
| Elemento | Decisión | Por qué |
|----------|----------|--------|
| Botón "Terminar" | Rojo claro (#EF4444) | Acción destructiva, no ignorable |
| Confirmación modal | "¿Terminar contrato? Esto libera la indemnización" | Awareness total |
| Segunda confirmación | Post-firma wallet | Double-check, irreversibilidad |
| Resultado | "Contrato terminado. Indemnización liberada." | Claridad sobre lo que pasó |
| Estado contrato | Badge "Terminado" en rojo | Imposible ignorar que está inactivo |
| Botón deshabilitado | No se puede terminar 2 veces | Seguridad contra errores |

**Indicadores UX concretos (Chat trabajador)**
| Elemento | Decisión | Por qué |
|----------|----------|--------|
| Notificación | "Tu contrato fue terminado." | Informativo, no alarmante |
| Contexto | "Recibiste 30 dólares de indemnización" | Buena noticia destacada |
| Verificación | "Revisa tu wallet para confirmar" | Empoderamiento, no pasividad |
| Card transacción | Muestra indemnización recibida | Prueba visible |

**Frase clave (copy - patrón)**
```
"¿Terminar contrato? Esto libera inmediatamente la indemnización al trabajador."
```
- Estructura: [PREGUNTA] [CONSECUENCIA]
- Tono: Serio, no ambiguo
- Palabra clave: "inmediatamente" (no hay demora, es seguro)

**Frase clave (copy - trabajador)**
```
"Tu contrato fue terminado. Recibiste 30 dólares de indemnización en tu wallet."
```
- Estructura: [EVENTO] [RESULTADO]
- Tono: Neutral informativo, pero con buena noticia
- Palabra clave: "recibiste" (pasado, dinero en tu poder)

**Flujo completo de terminación**

```
Patrón:
1. Click "Terminar contrato" (botón rojo)
   ↓
2. Modal de confirmación + explicación de indemnización
   ↓
3. Click "Confirmar"
   ↓
4. La wallet abre para firma
   ↓
5. Post-firma: "Contrato terminado. Indemnización liberada."
   ↓
6. Dashboard: estado "Terminado" (rojo, inactivo)

Carlos (simultáneamente):
1. Notificación push: "Tu contrato fue terminado"
   ↓
2. Abre app / chat
   ↓
3. AI: "Tu contrato fue terminado. Recibiste 30 dólares."
   ↓
4. Card: muestra transacción de indemnización
   ↓
5. Carlos revisa su wallet: dinero confirmado
```

---

## Matriz de intenciones por variable UX

| Caso de Uso | Emoción Clave | Color Primario | Fuente | Animación | Copy Tono |
|---|---|---|---|---|---|
| Ver balance | Alivio | Verde esmeralda | Bold | Fade-in lenta | Afirmativo |
| Reclamar dinero | Control | Verde esmeralda | Bold | Check suave | Celebratorio |
| Hablar con AI | Confianza | Azul || Sin animación | Cálido |
| Depositar | Responsabilidad | Azul | Regular | Contador | Administrativo |
| Terminar | Seriedad | Rojo | Bold | Ninguna | Serio |

---

## Principios aplicados

1. **Claridad sobre confort**: Mejor un mensaje largo pero claro que corto y ambiguo
2. **Números primero**: El balance es lo más importante, todo lo demás es contexto
3. **Confirmación física**: El resultado debe ser visible en la wallet, no solo en app
4. **Lenguaje conversacional**: Nunca jargón técnico, nunca jerga blockchain
5. **Protección emocional**: Asumir que Carlos está nervioso, tranquilizarlo constantemente
6. **Irreversibilidad explícita**: Si algo no se puede deshacer, decirlo claramente
7. **Célula visual segura**: Verde = vida/esperanza, Rojo = cuidado/seriedad, Gris = neutral
