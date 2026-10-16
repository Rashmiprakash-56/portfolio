/**
 * Shared motion tokens — spec §8.2
 * One custom cubic-bezier, one duration scale.
 */
export const ease = [0.22, 1, 0.36, 1] as const;

export const duration = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.6,
} as const;
