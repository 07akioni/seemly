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

export type Position = 'top' | 'right' | 'bottom' | 'left'
export interface Margin {
  top: string
  right: string
  bottom: string
  left: string
}

function getMargin (value: string): Margin
function getMargin (value: string, position: Position): string
function getMargin (value: string, position?: Position) {
  const parts = value.trim().split(/\s+/g)
  const margin: Margin = {
    top: parts[0]
  } as any
  switch (parts.length) {
    case 1:
      margin.right = parts[0]
      margin.bottom = parts[0]
      margin.left = parts[0]
      break
    case 2:
      margin.right = parts[1]
      margin.left = parts[1]
      margin.bottom = parts[0]
      break
    case 3:
      margin.right = parts[1]
      margin.bottom = parts[2]
      margin.left = parts[1]
      break
    case 4:
      margin.right = parts[1]
      margin.bottom = parts[2]
      margin.left = parts[3]
      break
    default:
      throw new Error('[seemly/getMargin]:' + value + ' is not a valid value.')
  }
  if (position === undefined) return margin
  return margin[position]
}

export { getMargin, getMargin as getPadding }