export function createId (length: number = 8): string {
  return Math.random().toString(16).slice(2, 2 + length)
}
