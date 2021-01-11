let onceCbs: Function[] = []

function flushOnceCallbacks (): void {
  onceCbs.forEach(cb => cb())
  onceCbs = []
}

export function beforeNextFrameOnce (cb: Function): void {
  if (onceCbs.includes(cb)) return
  onceCbs.push(cb) === 1 && requestAnimationFrame(flushOnceCallbacks)
}