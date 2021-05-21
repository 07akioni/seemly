export function createId(length: number = 8): string {
  return Math.random()
    .toString(16)
    .slice(2, 2 + length)
}

export function repeat<T>(v: T, count: number): T[] {
  const ret = []
  for (let i = 0; i < count; ++i) {
    ret.push(v)
  }
  return ret
}

export function indexMap<T>(
  createValue: (index: number) => T,
  count: number
): T[] {
  const ret = []
  for (let i = 0; i < count; ++i) {
    ret.push(createValue(i))
  }
  return ret
}
