export function stroopsToDolares(stroops: number): number {
  return stroops / 10_000_000;
}

export function dolaresToStroops(dolares: number): bigint {
  return BigInt(Math.round(dolares * 10_000_000));
}

export function formatDolares(stroops: number): string {
  const amount = stroopsToDolares(stroops);
  return `$${amount.toLocaleString('es-AR', { maximumFractionDigits: 2 })}`;
}

export function truncateAddress(address: string): string {
  if (!address || address.length < 8) return address || '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
