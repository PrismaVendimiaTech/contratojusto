# Gap Report: Data Model 3-Way Consistency Analysis

**Report ID**: DATA-3WAY-20260326  
**Scan Date**: 2026-03-26  
**Overall Assessment**: 95% Consistent with 5 actionable gaps

## Executive Summary

This deep scan analyzed consistency between:
- packages/contract/src/lib.rs (Implementation)
- .docs/wiki/05_modelo_datos.md (Logical Model)
- .docs/wiki/08_modelo_fisico_datos.md (Physical Model)
- .docs/wiki/09_contratos_tecnicos.md (Technical Contracts)
- .docs/wiki/04_RF.md (Functional Requirements)

**Key Finding**: One critical business rule (claim_savings is_terminated check) is enforced in code but not documented in specifications.

## CRITICAL FINDING 1: claim_savings() is_terminated Check Undocumented

**Severity**: CRITICAL
**Location**: packages/contract/src/lib.rs lines 113-114

Code enforces:
```rust
let is_terminated: bool = env.storage().instance().get(&DataKey::IsTerminated).unwrap();
assert!(!is_terminated, "contract is terminated");
```

NOT DOCUMENTED IN:
- 05_modelo_datos.md (logical model)
- 08_modelo_fisico_datos.md (physical model)
- 09_contratos_tecnicos.md CT-01 claim_savings section
- 04_RF.md RF-03-01 preconditions

**Impact**: Frontend developers reading CT-01 will miss this validation. Tests won't cover terminated contract case.

**Fix**: 
1. 09_contratos CT-01 (lines 39-44): Add "!is_terminated" to validation list
2. 04_RF.md RF-03-01 (line 68): Add "Contrato activo (!is_terminated)" to preconditions
3. 08_modelo_fisico (line 72): Add constraint row for claim_savings
4. 05_modelo_datos (line 30): Add invariant about claim_savings

## CRITICAL FINDING 2: Missing Sync Triggers in 05_modelo_datos.md

**Severity**: MEDIUM
**Location**: 05_modelo_datos.md

Issue: No sync triggers section while 08 and 09 have them.

08_modelo_fisico has (lines 89-94)
09_contratos_tecnicos has (lines 234-242)
05_modelo_datos has NONE

**Fix**: Add sync triggers section to 05 after Notas section

## CRITICAL FINDING 3: 08_modelo Constraints Table Incomplete

**Severity**: MEDIUM
**Location**: 08_modelo_fisico_datos.md lines 66-73

Missing: !is_terminated constraint for claim_savings

**Fix**: Add row to constraints table after line 72

## CRITICAL FINDING 4: 09_contratos CT-01 claim_savings Incomplete

**Severity**: CRITICAL
**Location**: 09_contratos_tecnicos.md lines 39-44

Current: Lists "to == worker, savings > 0"
Missing: "!is_terminated"

## CRITICAL FINDING 5: 04_RF RF-03-01 Missing Precondition

**Severity**: CRITICAL
**Location**: 04_RF.md lines 63-73

Current preconditions: "savings_balance > 0"
Missing: "!is_terminated"

## PASSING VALIDATIONS (100% Match)

✓ ContractInfo struct: 10 fields match in all sources
✓ DataKey enum: 10 variants match perfectly
✓ get_balance() return: (savings, severance, total, count) - correct order and types
✓ USDC decimals: 7 decimals documented consistently in 05, 08, 09
✓ savings_pct + severance_pct == 100: documented in all sources
✓ amount > 0 check: enforced and documented
✓ is_terminated prevents deposit(): enforced and documented
✓ is_terminated is irreversible: enforced and documented
✓ No phantom fields detected
✓ State diagram matches code
✓ Cross-references are valid

## Invariant Match Rate: 9/10 (90%)

All invariants documented except claim_savings is_terminated check.

## Remediation Priority

| Finding | Files to Fix | Effort | Priority |
|---------|--------------|--------|----------|
| claim_savings gap | 09, 04, 08, 05 | 30 min | P0 - NOW |
| Missing sync triggers | 05 | 10 min | P1 - This week |
| Incomplete constraints | 08 | 5 min | P1 - This week |

## Metrics

- Total fields checked: 10 (✓ all match)
- Total invariants checked: 10 (✗ 1 undocumented)
- Consistency score: 95%
- Critical findings: 1
- High-priority gaps: 2
- Medium-priority gaps: 2
- Files requiring updates: 4

## Conclusion

The three data models are 95% consistent with fields, types, and 90% of invariants perfectly synchronized. One critical business rule (claim_savings is_terminated prevention) is enforced in code but not documented in specifications. This gap creates integration risk for frontend developers.

**Recommendation**: Fix all five findings before next sprint. The claim_savings gap should be fixed immediately as it directly affects frontend implementation.

