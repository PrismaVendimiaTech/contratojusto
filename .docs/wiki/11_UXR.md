# 11 - Investigación UX: ContratoJusto

## Metodología
Investigación guerrilla para hackathon. Datos públicos + analogías + supuestos explícitos.

## Contexto del problema

### Argentina: Crisis económica permanente
- 46%+ trabajadores informales (INDEC, 2024)
- Inflación 200%+ anual (BCRA)
- Desempleo sectorial: construcción (32%), servicio doméstico (22%), comercio (18%)
- Sin jubilación, indemnización ni derechos verificables
- Pérdida de poder adquisitivo: 15%+ mensual por inflación
- Dolarización de facto: la población busca activos en USD para preservar valor

### Tecnología disponible
- Smartphones Android gama baja-media: dominan el segmento (85%+)
- Penetración internet: 95%+ en GBA
- Apps financieras: WhatsApp, Mercado Pago, Facebook son el estándar de confianza
- Blockchain: desconocido, requiere educación mínima pero clara

## Personas primarias

### Carlos - El albañil (primario)
**Demografía**
- Edad: 35 años
- Localización: GBA (Gran Buenos Aires)
- Ocupación: Albañil (autoconstrucción, contratistas)
- Educación: Primaria completa
- Teléfono: Samsung Galaxy A14 (Android 13)

**Económico**
- Ingreso mensual: ~$200.000 ARS ($230 USD aprox)
- Forma de cobro: Semanal o quincenal en efectivo
- Ahorro actual: Billetera de casa o MP, pierde 15%+ por inflación mensual
- Objetivo: "Guardar algo en dólares para mi familia"

**Digital & Apps**
- Experiencia: Básica pero funcional
- Apps activas: WhatsApp, Mercado Pago, YouTube, Facebook
- Confianza origen: Un compañero le mostró Mercado Pago → lo usa
- Benchmark UX: WhatsApp - simplicidad y velocidad

**Miedos principales**
1. "Me van a estafar" → Desconfianza en apps nuevas sin referencia
2. "No lo voy a entender" → Complejidad tecnológica lo asusta
3. "La inflación se come todo" → Impotencia económica, dinero se desmorona

**Modelo mental de confianza**
- No confía en instituciones (bancos, gobierno)
- Confía en personas: familia, compañeros de obra, patrones conocidos
- Una recomendación de un colega = validación suficiente
- Ver que "funciona" y que recibe plata = confianza cementada

**Aspiración sin decirla**
- "Tener algo seguro para mi familia"
- "Que mi dinero no pierda valor"
- "Que alguien me cuide el ahorro"

### María - La empleada doméstica (secundaria)
**Demografía**
- Edad: 42 años
- Localización: GBA
- Ocupación: Empleada doméstica (por hora)
- Educación: Secundaria incompleta
- Teléfono: Motorola Moto G (Android 12)

**Económico**
- Ingreso mensual: ~$150.000 ARS ($170 USD aprox)
- Forma de cobro: Semanal en efectivo
- Ahorro actual: Fía en el almacén, paga servicios con MP
- Objetivo: "Seguridad económica para mis hijos"

**Digital & Apps**
- Experiencia: Menos que Carlos, apenas MP
- Apps activas: WhatsApp, Facebook, MP básico (solo pagos)
- Confianza origen: Le mostró su vecina
- Aversión: No experimenta con apps nuevas sin garantía

**Miedos principales**
1. Perder acceso a su plata
2. No entender dónde está su dinero
3. Que le cierren la cuenta sin razón

**Momento crítico**
- El pago al final del día/semana es sagrado
- Si no recibe dinero, no come
- La certidumbre de que "la plata llega" es existencial

## Insights clave de la investigación

### 1. La confianza se construye por referencia, no marketing
- Carlos adoptó Mercado Pago porque un colega le mostró
- María usa lo que su vecina usa
- El marketing digital = ruido
- Una demo en persona > cualquier publicidad

### 2. "Dólares" es la palabra mágica
- En Argentina, mencionar "dólares" genera deseo inmediato
- USD = protección contra inflación
- USDC digital = lo mismo pero portable
- El copy debe repetir esta palabra

### 3. Simplicidad como benchmark
- WhatsApp es el estándar de usabilidad
- El trabajador NO quiere aprender tecnología
- Si tiene que pensar "¿cómo funciona?", falla
- 3 clics = máximo tolerado

### 4. El momento del cobro es emocional
- Es el touchpoint más crítico
- Si la UX es confusa, pierde confianza para siempre
- El balance debe ser legible en 1 segundo
- Debe parecer seguro, no arriesgado

### 5. El empleador informal es el cuello de botella
- El trabajador lo siguen si el patrón lo respalda
- El patrón solo lo usa si le ahorra problemas
- Debe ser más fácil que Excel o transferencia manual

## Supuestos explícitos (requieren validación)

| Supuesto | Nivel de riesgo | Nota |
|----------|---|---|
| El trabajador tiene smartphone con internet | BAJO | 95%+ penetración en Argentina |
| El trabajador tiene una wallet compatible instalable | MEDIO | Requiere guía, pero Android permite APK |
| El empleador está dispuesto a usar una app | ALTO | Supuesto fuerte, comportamiento desconocido |
| USDC es comprensible como "dólares digitales" | MEDIO | Analogía funciona, pero necesita educación |
| El trabajador confía en Stellar/blockchain | ALTO | Completamente desconocido, requiere prueba |
| El trabajador puede firmar transacciones | MEDIO | Puede intimidar, pero una wallet guiada lo simplifica |
| El modelo 70/30 es justo y atractivo | MEDIO | Requiere validación con empleadores reales |

## Gaps de investigación críticos

### Desconocidos sobre el trabajador
- ¿Realmente confiaría en "dólares digitales"?
- ¿Entiende qué es blockchain o necesita saberlo?
- ¿Usaría una app si el patrón no la usa?
- ¿Cuál es el monto mínimo que lo motiva a adoptar?

### Desconocidos sobre el empleador
- ¿Usaría una app voluntariamente sin regulación?
- ¿Le importa el "80% de ahorro laboral" o solo pagar menos?
- ¿Qué lo asusta más: inflación, regulación o fraude?
- ¿Compraría USDC específicamente o pediría efectivo?

### Desconocidos sobre el producto
- ¿Es la wallet lo suficientemente navegable para no-techies?
- ¿La firma digital generaría rechazo?
- ¿El tiempo de transacción es aceptable?
- ¿Habría abandono si el chat AI falla?

## Recomendaciones para validación

1. **Entrevista presencial con 3-5 Carloses reales**
   - Mostrar prototipo funcional con wallet compatible
   - Preguntar específicamente sobre "dólares digitales"
   - Medir comprensión de "ahorro" vs "indemnización"

2. **Entrevista con 2-3 empleadores informales**
   - ¿Qué lo haría adoptar? (ahorro burocrático, evitar conflictos, acceso a crédito)
   - ¿Qué lo detiene? (falta de confianza en sistema, complejidad, regulación)

3. **Test de usabilidad con wallet compatible**
   - ¿Puede Carlos firmar una transacción sin ayuda?
   - ¿Entiende qué está pasando su dinero?
   - ¿Confía en el resultado post-firma?

4. **Test de terminología**
   - ¿"Dólares digitales" o "criptomoneda"?
   - ¿"Ahorro protegido" o "dinero seguro"?
   - ¿"Contrato" o "acuerdo"?

## Notas de diseño derivadas de la investigación

- **Visuales**: Usar emojis seguros (🛡️ escudo, 💰 dinero, ✅ confirmación). Evitar: símbolos blockchain, terminología cripto.
- **Lenguaje**: "Tus dólares" > "tu saldo". "Protegido" > "almacenado". "Confirmar" > "firmar".
- **Color**: Verde esmeralda para ahorro positivo (=vida, esperanza). Gris para indemnización (=neutral, seguridad).
- **Tipografía**: Sans serif clara (Inter). Tamaños grandes para números (20px+). Weights simples (Regular, Bold).
- **Flujo**: Chat primero (conversación natural). Dashboard después (información, control).
