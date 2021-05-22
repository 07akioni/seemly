export function createId(length: number = 8): string {
  return Math.random()
    .toString(16)
    .slice(2, 2 + length)
}

export function repeat<T>(count: number, v: T): T[] {
  const ret = []
  for (let i = 0; i < count; ++i) {
    ret.push(v)
  }
  return ret
}

function indexMap(count: number): number[]
function indexMap<T>(count: number, createValue: (index: number) => T): T[]
function indexMap(
  count: number,
  createValue?: (index: number) => unknown
): unknown[] {
  const ret = []
  if (!createValue) {
    for (let i = 0; i < count; ++i) {
      ret.push(i)
    }
    return ret
  }
  for (let i = 0; i < count; ++i) {
    ret.push(createValue(i))
  }
  return ret
}

export { indexMap }
