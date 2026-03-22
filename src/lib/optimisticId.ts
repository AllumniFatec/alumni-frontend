let n = 0;

export function createOptimisticId(prefix: string) {
  return `${prefix}-${
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${++n}-${Math.random().toString(36).slice(2, 9)}`
  }`;
}
