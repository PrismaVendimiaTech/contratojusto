/** Validate Stellar address format (starts with G, 56 chars) */
export function isValidStellarAddress(address: string): boolean {
  return /^G[A-Z2-7]{55}$/.test(address);
}

/** Validate percentage split sums to 100 */
export function isValidSplit(savingsPct: number, severancePct: number): boolean {
  return savingsPct > 0 && severancePct > 0 && savingsPct + severancePct === 100;
}

/** Validate deposit amount is positive */
export function isValidAmount(amount: number): boolean {
  return amount > 0 && isFinite(amount);
}
