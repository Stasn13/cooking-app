export function scheduleFrame(callback: () => void) {
  if (typeof globalThis.requestAnimationFrame === "function") {
    return globalThis.requestAnimationFrame(callback);
  }

  return globalThis.setTimeout(callback, 16);
}

export function cancelFrame(frameId: number) {
  if (typeof globalThis.cancelAnimationFrame === "function") {
    globalThis.cancelAnimationFrame(frameId);
    return;
  }

  globalThis.clearTimeout(frameId);
}
