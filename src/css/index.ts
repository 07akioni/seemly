export function depx (value: string | number): number {
  if (typeof value === 'string') {
    if (value.endsWith('px')) {
      return Number(value.slice(0, value.length - 2))
    }
    return Number(value)
  }
  return value
}

export function pxfy (value: string | number): string {
  if (typeof value === 'number') return `${value}px`
  if (value.endsWith('px')) return value
  return `${value}px`
}