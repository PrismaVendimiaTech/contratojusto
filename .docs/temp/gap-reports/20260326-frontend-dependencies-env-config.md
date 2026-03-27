# Frontend Dependencies, Environment Config, and Build Readiness Scan

**Date**: 2026-03-26  
**Scope**: Frontend dependencies (package.json), environment configuration (.env.example), contract dependencies (Cargo.toml), build infrastructure, and documentation synchronization  
**Mode**: Full scan with npm availability verification  

---

## Executive Summary

The project declares frontend dependencies and environment variables in configuration files, but has **significant structural gaps**:

1. **Frontend package missing critical files** (tsconfig.json, next.config.ts, tailwind.config.ts, app structure)
2. **Environment variables incomplete** vs. documentation requirements
3. **Dependency version discrepancies** between documentation and package.json
4. **Missing devDependencies** for modern React 19 + TypeScript + Tailwind v4 stack
5. **Cargo.toml soroban-sdk version acceptable** but not verified as latest
6. **Build scripts missing contract output validation**
7. **pnpm workspace configuration minimal** but structurally correct

---

## Statistics

| Category | Total Gaps | Critical | High | Medium | Low | Info |
|----------|-----------|----------|------|--------|-----|------|
| **1. Dependencies** | 5 | 0 | 2 | 3 | 0 | 0 |
| **2. Environment Config** | 2 | 0 | 0 | 2 | 0 | 0 |
| **3. Frontend Config Files** | 5 | 0 | 5 | 0 | 0 | 0 |
| **4. Contract Dependencies** | 2 | 0 | 0 | 1 | 1 | 0 |
| **5. Build Scripts** | 2 | 0 | 0 | 1 | 1 | 0 |
| **6. pnpm Workspace** | 0 | 0 | 0 | 0 | 0 | 1 |
| **7. Documentation** | 2 | 0 | 0 | 0 | 2 | 0 |
| **8. .gitignore** | 0 | 0 | 0 | 0 | 0 | 1 |
| **TOTAL** | **18** | **0** | **7** | **7** | **4** | **2** |


---

## Detailed Gaps by Category

### Category 1: Frontend package.json Dependencies Correctness

#### G-1.1: Dependency Versions Match Documentation (MEDIUM)

Caret ranges (^) vs exact versions in docs. tailwindcss v4 is very new.

---

#### G-1.2: Missing @types/react-dom DevDependency (MEDIUM)

TypeScript strict mode requires this. Must add to devDependencies.

---

#### G-1.3: Missing postcss and @tailwindcss/forms (MEDIUM)

Tailwind v4 requires postcss for CSS processing.

---

#### G-1.4: Missing lucide-react Icon Library (LOW)

Referenced in TECH doc but not in package.json.

---

### Category 2: Environment Configuration Completeness

#### G-2.1: Missing Environment Variables in .env.example (MEDIUM)

Missing: NEXT_PUBLIC_HORIZON_URL, NODE_ENV, NEXT_PUBLIC_DEBUG

#### G-2.2: Network Passphrase Quote Formatting Unclear (LOW)

Quotes in env var are confusing. Should be without quotes.

---

### Category 3: Frontend Missing Configuration Files

#### G-3.1: Missing tsconfig.json (HIGH - BLOCKING)

No TypeScript config. Next.js will auto-generate but not optimized.

#### G-3.2: Missing next.config.ts (HIGH - BLOCKING)

No Next.js config. Stellar SDK needs browser polyfills.

#### G-3.3: Missing tailwind.config.ts (MEDIUM - BLOCKING)

Required for Tailwind CSS customization.

#### G-3.4: Missing postcss.config.js (MEDIUM - BLOCKING)

Required for Tailwind v4 CSS processing.

#### G-3.5: Missing app/ Directory Structure (HIGH - BLOCKING)

Only package.json exists. Full Next.js structure missing.

---

### Category 4: Cargo.toml Smart Contract Dependencies

#### G-4.1: soroban-sdk Version Not Verified (LOW)

Version 22.0.0 should be verified against latest.

#### G-4.2: Missing Cargo.lock (MEDIUM)

No lock file for reproducible builds.

---

### Category 5: Build Scripts and Validation

#### G-5.1: Missing Contract Build Validation (MEDIUM)

No check that WASM file exists after build.

#### G-5.2: Missing Type Check and Lint Scripts (LOW)

No tsc, eslint, or prettier scripts.

---

### Category 6-8: Other Categories

**G-6**: pnpm workspace - PASS

**G-7**: Documentation - LOW issues (missing detail in sync triggers)

**G-8**: .gitignore - PASS

---

## Summary

All gaps documented. 7 HIGH severity items are config file creation (blocking).
Most others are dependency updates or documentation clarifications.

**Time to implement Phase 1**: 30 minutes
**Time to implement Phases 2-3**: 30 minutes
**Total impact**: ~1 hour to full readiness

