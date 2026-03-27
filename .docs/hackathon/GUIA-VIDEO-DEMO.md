# Guia para grabar el video demo - ContratoJusto

## Pre-requisitos

- Chrome con extension Freighter instalada
- Freighter configurado en **Testnet** (Settings > Network > Test Net)
- Cuenta fondeada con XLM testnet (si es nueva, se fondea automaticamente)
- Grabador de pantalla (Loom, OBS, o el grabador de Windows: Win+G)

## Datos importantes

- **URL**: https://contratojusto.nuestrascuentitas.com
- **Worker address para pegar en el formulario**:
  ```
  GC7EL5SXAQKMFTPLVCVLFLGDEQ2ITF4GTABLM2OKMVAOEI4Q3WCE2ODD
  ```

---

## PASO A PASO PARA EL VIDEO (5 minutos)

### ESCENA 1: Home Page (0:00 - 0:15)

1. Abrir https://contratojusto.nuestrascuentitas.com
2. Esperar a que cargue (se ve la animacion de entrada)
3. Mostrar: titulo ContratoJusto, cards Empleador/Trabajador, boton Conectar Wallet
4. **Click en "Conectar Wallet"**
5. Aparece el modal de wallets -> **Click en "Freighter"**
6. Freighter abre popup -> **Click "Conectar"** en Freighter
7. Esperar a que diga "Conectada con Freighter: GXXX...XXXX" con punto verde

### ESCENA 2: Empleador - Crear contrato (0:15 - 1:30)

1. **Click en "Soy Empleador"**
2. Se ve el formulario "Crear contrato"
3. En "Direccion del trabajador", **pegar**:
   ```
   GC7EL5SXAQKMFTPLVCVLFLGDEQ2ITF4GTABLM2OKMVAOEI4Q3WCE2ODD
   ```
4. Dejar % Ahorro en **70** y % Indemnizacion en **30** (vienen asi por defecto)
5. **Click "Crear contrato"**
6. Freighter abre popup para firmar -> **Click "Approve"** en Freighter
7. Esperar confirmacion (puede tardar 5-10 segundos)
8. Cuando confirma, se muestra el estado del contrato + formulario de deposito

### ESCENA 3: Empleador - Depositar (1:30 - 2:30)

1. En el formulario de deposito, escribir **100** en el monto
2. **Click "Depositar"**
3. Freighter abre popup -> **Click "Approve"**
4. Esperar confirmacion
5. Se actualiza el estado: Ahorro $70 | Indemnizacion $30 | Total $100
6. (Opcional) Hacer un segundo deposito de **200** para mostrar que acumula
7. Mostrar como el balance crece: Ahorro $210 | Indemnizacion $90 | Total $300

### ESCENA 4: Cambio a Trabajador (2:30 - 2:45)

1. **Click en "ContratoJusto" en el header** (vuelve al home)
2. **Click en "Soy Trabajador"**
3. Se ve el chat con el mensaje de bienvenida del asesor

### ESCENA 5: Worker - Chat con IA (2:45 - 4:30)

1. **Click en el chip "Cuanto tengo?"** (o escribirlo en el input)
2. Esperar respuesta (5-10 segundos)
3. La IA muestra: "Tu ahorro esta protegido" + balance card con $210/$90/$300
4. **Escribir**: "como esta mi contrato?"
5. Esperar respuesta - la IA consulta el contrato on-chain
6. Muestra estado activo, 70% ahorro, 30% indemnizacion
7. **Escribir**: "quiero sacar mi ahorro"
8. La IA dice que hay ahorro disponible y prepara el retiro
9. (Opcional) Si aparece boton de firmar, **Click para firmar** en Freighter

### ESCENA 6: Cierre (4:30 - 5:00)

1. Volver al home (click en "ContratoJusto" en el header)
2. Mostrar la pantalla principal unos segundos
3. Fin del video

---

## TIPS PARA LA GRABACION

- **Resolucion**: 1920x1080 o 1280x720
- **Hablar mientras graban**: explicar brevemente que hace cada paso
- **No apurarse**: esperar que las animaciones terminen antes de hacer click
- **Si algo falla**: recargar la pagina (F5) y reintentar. El primer mensaje de chat siempre funciona.
- **Si el segundo mensaje de chat no responde**: recargar pagina y preguntar de nuevo
- **No mencionar**: USDC, Soroban, blockchain, XDR, token (la app esta disenada para NO usar jerga tecnica)

## GUION SUGERIDO (lo que dice la persona que presenta)

> "Esta es ContratoJusto. Un contrato laboral digital para proteger a los trabajadores informales de Argentina."
>
> "Voy a conectar mi wallet... listo. Ahora como empleador, creo un contrato para mi trabajador. Pongo su direccion, 70% va a ahorro y 30% a indemnizacion."
>
> "Deposito 100 dolares. El smart contract divide automaticamente: 70 van al ahorro del trabajador, 30 a su indemnizacion. Todo en la blockchain."
>
> "Ahora soy el trabajador. Le pregunto a mi asesor: cuanto tengo? Y me muestra mi balance real: 70 dolares de ahorro, 30 de indemnizacion."
>
> "El trabajador nunca necesita saber que es una blockchain. Solo habla con su asesor en castellano."
