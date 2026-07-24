/**
 * Generates a given quantity of RFC 4122 v4 UUIDs.
 * Uses the native crypto.randomUUID() — cryptographically strong,
 * available in all modern browsers, zero dependencies needed.
 */
export function generateUuids(quantity: number): string[] {
  const safeQuantity = clampQuantity(quantity);
  return Array.from({ length: safeQuantity }, () => crypto.randomUUID());
}

/**
 * Keeps the requested quantity within sane bounds.
 * Prevents someone from accidentally requesting 1,000,000 UUIDs
 * and freezing their own tab — this protects the user from themselves,
 * not from any external attacker.
 */
function clampQuantity(quantity: number): number {
  const MIN = 1;
  const MAX = 100;
  if (Number.isNaN(quantity)) return MIN;
  return Math.min(Math.max(Math.trunc(quantity), MIN), MAX);
}