# Formulario DoraHacks - Copy listo para pegar

Formulario: https://docs.google.com/forms/d/e/1FAIpQLSdRUG-kZ0GoDqqYtpV66mq8rQsq8adKq0aHJND6B3wojFRHCQ/viewform

---

## Campo 1: Project Name *

```
ContratoJusto
```

---

## Campo 2: Logo

Subir imagen del logo. Si no tienen logo, dejar vacio.

---

## Campo 3: Team (Fullname + Email) *

Reemplazar con los datos reales de cada integrante:

```
Gabriel Paz - fgpaz@teslita.com
```

---

## Campo 4: Vision *

```
ContratoJusto es la primera plataforma de contratos laborales digitales sobre Stellar para los 13 millones de trabajadores informales de Argentina. Cada pago del empleador se divide automaticamente en ahorro en USDC y fondo de indemnizacion via smart contract Soroban, protegiendo al trabajador de la inflacion sin requerir ningun conocimiento de blockchain. La interfaz es un chat conversacional en espanol: si sabes usar WhatsApp, sabes usar ContratoJusto.
```

---

## Campo 5: GitHub Link *

```
https://github.com/PrismaVendimiaTech/contratojusto
```

---

## Campo 6: Demo video

Si graban video, pegar URL aqui. Sino dejar vacio.

```
[URL del video cuando este disponible]
```

Sugerencia de contenido del video (5 minutos max):
1. Mostrar el problema con datos (30 seg)
2. Demo en vivo del chat: depositar, consultar saldo, ver split (3 min)
3. Mostrar transaccion en Stellar Explorer (30 seg)
4. Cerrar con impacto y roadmap (1 min)

---

## Campo 7: Details *

```
PROBLEMA

Argentina tiene mas de 13 millones de trabajadores informales: el 46% de la fuerza laboral. Sin contrato formal, no tienen jubilacion, indemnizacion ni derechos verificables. El problema se agrava con una inflacion que supero el 200% anual en 2024: los ahorros en pesos se evaporan mes a mes. Un albañil que cobra en efectivo hoy no tiene mecanismo simple para acumular proteccion laboral.

SOLUCION

ContratoJusto crea un contrato laboral digital sobre la red Stellar. Cuando el empleador hace un deposito en USDC, el smart contract Soroban lo divide automaticamente: un porcentaje va al fondo de ahorro del trabajador y otro al fondo de indemnizacion. No hay intermediarios, no hay burocracia, no hay banco. Los fondos son del trabajador desde el momento del deposito.

POR QUE CHAT CON IA

La interfaz es un chat conversacional en espanol. Esta es una decision deliberada: tres mil millones de personas usan chat a diario. No se necesita saber que es una blockchain, una wallet o una criptomoneda. El trabajador escribe "cuanto ahorre este mes?" y recibe una respuesta clara. El modelo de lenguaje resuelve de fondo la complejidad de consultar el contrato on-chain, preparar transacciones y guiar al usuario. La blockchain es infraestructura invisible, no producto.

INTEGRACION STELLAR

- Smart contract en Soroban (Rust), deployado en Stellar Testnet
- Stellar Wallets Kit para conexion multi-wallet (Freighter, Albedo, xBull)
- Token USDC en Stellar Testnet como unidad de cuenta estable
- Transacciones con fees de $0.00001, viables para micro-depositos
- Frontend stateless: la blockchain es la unica fuente de verdad

STACK TECNICO

- Contrato: Rust + soroban-sdk
- Frontend: Next.js 15 + React 19 + Tailwind CSS + Framer Motion
- AI: Vercel AI SDK + proxy LLM compatible con OpenAI
- Monorepo: pnpm workspaces (packages/contract, packages/frontend)

DEMO FUNCIONAL

MVP funcionando en Stellar Testnet. URL: https://contratojusto.nuestrascuentitas.com

IMPACTO

46 millones de trabajadores en Argentina. Primer contrato laboral DeFi verificable para la economia informal latinoamericana. Roadmap: mainnet, bot Telegram, reputacion on-chain del empleador.
```

---

## Campo 8: Track *

Seleccionar: **Stellar Track**

---

## Checklist antes de enviar

- [ ] Project Name: completado
- [ ] Team: nombres y emails reales completados
- [ ] Vision: pegado
- [ ] GitHub Link: pegado (verificar que el repo es publico)
- [ ] Details: pegado
- [ ] Track: Stellar Track seleccionado
- [ ] Paso 2 en DoraHacks completado: "Submit BUIDL" en el track correcto
