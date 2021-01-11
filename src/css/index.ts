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

type Position = 'top' | 'right' | 'bottom' | 'left'

function getMargin (value: string, position: Position) {
  const parts = value.trim().split(/\s+/g)
  switch (parts.length) {
    case 1:
      return parts[0]
    case 2:
      if (position === 'left' || position == 'right') return parts[1]
      return parts[0]
    case 3:
      if (position === 'top') return parts[0]
      if (position === 'bottom') return parts[2] 
      return parts[1]
    case 4:
      if (position === 'top') return parts[0]
      if (position === 'right') return parts[1]
      if (position === 'bottom') return parts[2]
      if (position === 'left') return parts[3]
    default:
      throw new Error('[seemly/getMargin]:' + value + ' is not a valid value.')
  }
}

export { getMargin, getMargin as getPadding }