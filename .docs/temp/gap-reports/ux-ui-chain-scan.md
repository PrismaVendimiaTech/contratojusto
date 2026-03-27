# UX/UI Visual Chain Consistency Scan
Date: 2026-03-26  
Scope: 5-document chain (Manifiesto → Identidad → Lineamientos → Patrones → TECH-FRONTEND)

**RESULTS: 21 gaps found (5 CRITICAL, 10 MAJOR, 4 MINOR, 2 suppressed as false positives)**

---

## CRITICAL GAPS (BLOCKS IMPLEMENTATION)

### 1. Primary Color Token Not Standardized
**Files**: identidad_visual.md (L13), lineamientos (L101,105,120), patrones_ui (L13), TECH-FRONTEND (missing)
**Issue**: #1E3A5F referenced as `bg-[#1E3A5F]`, `text-[#1E3A5F]`, and `brand.primary`  
**Fix**: Use `brand.primary` token everywhere; define canonical Tailwind config in patrones_ui.md

---

### 2. Font Loading Missing from TECH-FRONTEND
**Files**: identidad_visual.md (L40 "Inter"), TECH-FRONTEND (L47 comment says "fonts" but no code)  
**Issue**: No import statement or font loading logic in TECH-FRONTEND  
**Fix**: Add Font Loading section with next/font/google setup before Estructura de archivos

---

### 3. Chat Color Naming Inconsistent Across 3 Docs
**Files**: identidad_visual (L27-28), lineamientos (L213-225), patrones_ui (L17-20)  
**Issue**: Chat backgrounds named "Chat AI bg", `chat.ai` token, and `bg-blue-50` class  
**Fix**: Canonicalize in identidad_visual with all three naming conventions listed

---

### 4. Tone Examples Not in Implementation Docs
**Files**: manifiesto (L47-72 has ✅/❌ examples), lineamientos (missing), patrones (missing), TECH (missing)  
**Issue**: Developers won't know "formal-cálido" rule, emoji prohibition, or "dólares not USDC"  
**Fix**: Add "Tono de voz (referencia)" section to lineamientos referencing manifiesto examples

---

### 5. Error/Success Colors Missing from Tokens
**Files**: identidad (L25-26 defines them), patrones_ui (L6-21 omits them)  
**Issue**: If developers use patrones_ui for colors, they won't have error/success  
**Fix**: Add status colors to patrones_ui design tokens: `error: #EF4444`, `success: #22C55E`

---

## MAJOR GAPS (SHOULD FIX BEFORE DEV)

### 6. ActionButton Component Scattered
**Files**: patrones_ui (L126-136 defines it), lineamientos (L93-141 lists 4 button types separately)  
**Issue**: Lineamientos doesn't recognize buttons are variants of one ActionButton component  
**Fix**: Retitle to "Botones (componente unificado: ActionButton)" with patrones_ui reference

---

### 7. BalanceCard Missing from Lineamientos
**Files**: patrones_ui (L59-68 full spec), lineamientos (MISSING), TECH (L65 uses it)  
**Issue**: Designers can't verify implementation against spec  
**Fix**: Add BalanceCard section to lineamientos with layout, spacing, typography

---

### 8. SignTxButton Spec Incomplete in Lineamientos  
**Files**: patrones_ui (L90-103 complete), lineamientos (L242-245 minimal)  
**Issue**: Missing loading/success/error states  
**Fix**: Expand lineamientos with all states, reference patrones_ui for component

---

### 9. Spacing Scale Missing 4xl (64px)
**Files**: identidad (L122-129 lists xs-3xl), lineamientos (L32 uses pt-16=64px)  
**Issue**: pt-16 used but not listed in scale  
**Fix**: Add `4xl: 64px` to identidad spacing scale

---

### 10. Rounded-full Not in Identidad
**Files**: identidad (L140-144 no rounded-full), patrones_ui (L36 mentions it)  
**Issue**: Avatar/badge component uses rounded-full without identidad approval  
**Fix**: Add `rounded-full` to identidad border radius section

---

### 11. Line Heights Not in Design Tokens
**Files**: identidad (L45-52 defines them), patrones_ui (MISSING)  
**Issue**: Design tokens incomplete; developers won't know line-height values  
**Fix**: Add line-height tokens to patrones_ui (Display 1.25, Body 1.5, etc.)

---

### 12. Mobile-First Strategy Scattered
**Files**: lineamientos (L9 mentions it), identidad (no mention), patrones (no mention), TECH (no mention)  
**Issue**: Only lineamientos states mobile-first; other docs don't reinforce critical constraint  
**Fix**: Add "Contexto de diseño" section to identidad and mobile-first notes to patrones/TECH

---

### 13. Secondary Color (Esmeralda) Unnamed in Lineamientos
**Files**: identidad (L14 "Esmeralda"), lineamientos (L89,225 uses emerald-600 without name), patrones (L14 "esmeralda")  
**Issue**: Designers say "Esmeralda" but lineamientos only shows class names  
**Fix**: Add color names in lineamientos (e.g., "color esmeralda (emerald-600)")

---

### 14. Shadow Scale Incomplete (shadow-lg Missing)
**Files**: identidad (L153-157 defines shadow-sm/md), patrones (L40 mentions shadow-lg), lineamientos (L156 forbids on mobile)  
**Issue**: identidad doesn't list shadow-lg  
**Fix**: Add shadow-lg to identidad with note "desktop modals only"

---

### 15. Personality Traits Not Mapped to UI
**Files**: manifiesto (L7-15 defines traits), lineamientos (MISSING), TECH (MISSING)  
**Issue**: No explanation of how "Protector/Profesional/Cálido/Accesible" appear in UI  
**Fix**: Add trait-to-UI mapping table in lineamientos

---

## MINOR GAPS

### 16. ChatInput Placeholder Inconsistent
**Files**: patrones_ui (L85 "Escribí tu pregunta..."), lineamientos (L277 "Escribe un mensaje...")  
**Fix**: Standardize on one version

---

### 17. Letter Spacing Not in Tokens
**Files**: identidad (L54 specifies tracking-tight), patrones_ui (MISSING)  
**Fix**: Add letter-spacing values to design tokens

---

### 18. Breakpoint Names Not Mapped
**Files**: lineamientos (L320-326 uses device names), patrones (MISSING), TECH (MISSING)  
**Issue**: "Tablet 768px" doesn't map to Tailwind `md:`  
**Fix**: Add breakpoint names to table

---

### 19. Terminology Inconsistent (user vs trabajador)
**Files**: TECH-FRONTEND uses English "user", design docs use Spanish "trabajador"  
**Fix**: Use "trabajador" consistently in TECH

---

## STRUCTURAL GAPS

### 20. No Cross-Document Backlinking
**All five documents**  
**Issue**: Hierarchy flows down but no markdown links to navigate back  
**Fix**: Add "Fuentes:" sections linking to source docs

---

### 21. Anti-Patterns Not Reinforced in TECH
**Files**: lineamientos (L368-384 lists anti-patterns), TECH (MISSING)  
**Issue**: Developers won't see anti-pattern warnings  
**Fix**: Add anti-pattern section to TECH-FRONTEND

---

## SUMMARY

| Category | Critical | Major | Minor | Total |
|----------|----------|-------|-------|-------|
| Color consistency | 3 | 2 | — | 5 |
| Typography | 1 | 1 | 1 | 3 |
| Spacing/radius | — | 3 | 1 | 4 |
| Component specs | 1 | 3 | — | 4 |
| Tone/personality | 1 | 1 | — | 2 |
| Mobile-first | — | 1 | — | 1 |
| Structure | — | 2 | 1 | 3 |
| **TOTAL** | **5** | **10** | **4** | **21** |

---

## FIX PRIORITY

**Phase 1 (Critical - implement first)**:
- Gaps 1, 2, 3, 4, 5

**Phase 2 (Major - before design hand-off)**:
- Gaps 6-15

**Phase 3 (Polish)**:
- Gaps 16-21

---

Generated: 2026-03-26
Report: /c/repos/mios/vendimia-tech/.docs/temp/gap-reports/ux-ui-chain-scan.md
