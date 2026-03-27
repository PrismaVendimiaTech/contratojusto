# Estrategia Competitiva - Maximizar Premios

## Analisis del Campo de Juego

- **15 hackers registrados** en total (muy pocos)
- **5 tracks** disponibles = proyectos diluidos entre tracks
- **Equipo de 4 personas** con habilidades complementarias
- **IA como multiplicador** de productividad
- **2 dias** para ejecutar

---

## Analisis FODA por Track

### Track Rootstock ($2,500) + Beexo ($500)
| | |
|-|-|
| **Fortalezas** | EVM-compatible (Solidity), doble track con 1 proyecto, bonos early bird, tools maduras |
| **Oportunidades** | Pocos competidores, bonos por ser rapido, mercado LATAM de neobanking en explosion |
| **Debilidades** | RSK es mas lento (20-30s), ecosistema DeFi mas nichado |
| **Amenazas** | Otros equipos con experiencia en RSK pueden tener ventaja tecnica |
| **VEREDICTO** | **PRIORIDAD 1** - Mayor potencial de premio ($3,700) y bonos early bird |

### Track Hedera ($2,000 + pool $1,000)
| | |
|-|-|
| **Fortalezas** | Pool garantizado, Hedera Agent Kit listo para usar, rendimiento excepcional |
| **Oportunidades** | Tema "pagos via agentes IA" es innovador y pocos lo dominan |
| **Debilidades** | Ecosistema menos conocido, curva de aprendizaje en Agent Kit |
| **Amenazas** | Si muchos califican, el pool se diluye |
| **VEREDICTO** | **PRIORIDAD 2** - Pool garantizado = dinero seguro |

### Track Stellar ($2,000)
| | |
|-|-|
| **Fortalezas** | Ideathon sin codigo ($500), Soroban bien documentado |
| **Oportunidades** | Ideathon es perfecto para la artista |
| **Debilidades** | Requiere presencial, Soroban usa Rust (curva alta), Hackathon mas complejo |
| **Amenazas** | Jurado de SDF puede tener estandares altos |
| **VEREDICTO** | **PRIORIDAD 3** - Solo Ideathon (sin codigo, la artista lidera) |

### Track BNB Chain ($1,500)
| | |
|-|-|
| **Fortalezas** | 100% online, IA + Web3 es nuestro fuerte, EVM-compatible |
| **Oportunidades** | Si ya hacemos RSK en Solidity, reutilizamos codigo |
| **Debilidades** | Requiere deploy on-chain obligatorio con 2+ txns, equipo de jurado de BNB |
| **Amenazas** | Track mas tecnico, puede consumir tiempo |
| **VEREDICTO** | **PRIORIDAD 4** - Solo si sobra tiempo, reutilizar contrato de RSK |

---

## Plan de Asignacion de Equipo

### Gabriel (Arquitecto/Backend)
- Dia 1: Smart contract Solidity para RSK + deploy en testnet
- Dia 1: Integrar Hedera Agent Kit (Python/JS)
- Dia 2: Refinar ambos proyectos + grabar video demos

### Frontend Dev
- Dia 1: UI del proyecto RSK+Beexo (Next.js + ethers.js + xo-connect)
- Dia 2: UI del proyecto Hedera + pulir ambas UIs

### Artista
- Dia 1-2: Disenar UIs de ambos proyectos + crear deck Stellar Ideathon
- Dia 2: Preparar assets para videos demo

### Dev Junior
- Dia 1: Integrar SDK Beexo (xo-connect) en el proyecto RSK
- Dia 1: Testing y documentacion
- Dia 2: Ayudar con deployment, README, video

---

## Estrategia de Early Bird

### Rootstock (7 premios de $100)
- **Objetivo**: Estar entre los primeros 7 en presentar
- **Accion**: Deployar contrato minimo RAPIDO, luego iterar
- **Tip**: No necesita ser perfecto para el bono, solo presentado

### Beexo (8 premios de $50)
- **Objetivo**: Estar entre los primeros 8 en integrar SDK
- **Accion**: Integrar xo-connect basico RAPIDO
- **Tip**: Un flujo de connect wallet + 1 operacion basta para el bono

### Timeline de ejecucion
```
ASAP      -> Registrarse como Hacker en DoraHacks
Hora 0    -> Deploy contrato minimo en RSK testnet
Hora 1    -> Integrar xo-connect basicamente
Hora 2    -> Submit BUIDL a ambos tracks (capturar early bird)
Hora 2-48 -> Iterar y mejorar el proyecto
```

---

## Estrategia Multi-Track: 1 Proyecto, 2 Tracks (RSK + Beexo)

### Concepto
Crear UN proyecto DeFi que:
1. Use smart contracts en RSK (track Rootstock)
2. Integre wallet Beexo via xo-connect (track Beexo)
3. Tenga UI/UX excelente (criterio de ambos tracks)
4. Resuelva un problema real de LATAM (criterio de ambos)

### Ejemplo de integracion dual
```
Frontend (Next.js)
  -> MetaMask para RSK testnet (track RSK)
  -> Beexo Connect (xo-connect) para wallet (track Beexo)
  -> Smart contract en RSK que interactua con DeFi
  -> UI bonita y flujo de onboarding latino
```

---

## Estrategia Hedera: Pool Garantizado

### Requisitos para calificar al pool de $1,000
- Proyecto tecnico funcional
- Integrado con Hedera
- Tema: Pagos a traves de Agentes de IA
- Cumplir todos los requisitos de entrega

### Calculo estimado
- Si 5 proyectos califican: $200 cada uno
- Si 3 proyectos califican: $333 cada uno
- Si 10 proyectos califican: $100 cada uno
- **En cualquier caso, es dinero "gratis" por participar bien**

---

## Ideas Preliminares de Alto Impacto Social

### Para RSK + Beexo: "VinoPay" - Pagos DeFi para Vendimia
- Plataforma de pagos para la cadena vitivinicola de Mendoza
- Productor recibe pago inmediato en stablecoin (DOC) al entregar uva
- Comprador paga con rBTC y el smart contract convierte automaticamente
- Wallet Beexo para onboarding facil de productores
- **Impacto**: Inclusion financiera para productores rurales

### Para Hedera: "AgroAgent" - Agente IA de Pagos Agricolas
- Agente IA que automatiza pagos de la cadena agricola
- Monitorea entregas via IoT/datos
- Ejecuta pagos automaticos cuando se confirma entrega
- Micro-transacciones instantaneas ($0.0001/tx en Hedera)
- **Impacto**: Transparencia y velocidad en pagos agricolas

### Para Stellar Ideathon: "RemesaDirecta"
- Propuesta de plataforma de remesas usando Stellar + USDC
- Trabajadores en el exterior envian dinero a familias en Argentina
- Sin intermediarios bancarios, fees minimas
- **Impacto**: Ahorro en fees de remesas para familias argentinas

> Estas son ideas preliminares. Se refinaran con el brainstorming estructurado.

---

## Checklist Pre-Submit

### Para CADA proyecto:
- [ ] Repo GitHub publico con README claro
- [ ] Demo funcional accesible por link
- [ ] Video demo (2-5 min)
- [ ] Deck de slides
- [ ] BUIDL creado en DoraHacks
- [ ] Submit BUIDL al track correspondiente
- [ ] Transacciones verificables en explorer

### Especifico por track:
- [ ] RSK: Contrato desplegado en RSK testnet/mainnet
- [ ] Beexo: SDK xo-connect integrado y demostrable
- [ ] Hedera: Integracion con Hedera + pagos via agente IA
- [ ] Stellar Ideathon: Deck + video pitch + validacion de mercado
