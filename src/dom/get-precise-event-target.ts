export function getPreciseEventTarget(event: Event): EventTarget | null {
  return event.composedPath()[0] || null
}
