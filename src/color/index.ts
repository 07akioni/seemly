type RGBA = [number, number, number, number]
type RGB = [number, number, number]

const prefix = '^\\s*'
const suffix = '\\s*$'
const num = '\\s*(\\d+)\\s*'
const float = '\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*'
const hex = '([0-9A-Fa-f])'
const dhex = '([0-9A-Fa-f]{2})'
const rgbRegex = new RegExp(`${prefix}rgb\\s*\\(${num},${num},${num}\\)${suffix}`)
const rgbaRegex = new RegExp(`${prefix}rgba\\s*\\(${num},${num},${num},${float}\\)${suffix}`)
const sHexRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${suffix}`)
const hexRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${suffix}`)
const sHexaRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${hex}${suffix}`)
const hexaRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${dhex}${suffix}`)

function parseHex (value: string): number {
  return parseInt(value, 16)
}

// color only support #000[0], #000000[00], rgb(0, 0, 0), rgba(0, 0, 0, 0)
export function rgba (color: string): RGBA {
  try {
    let i
    if (i = hexRegex.exec(color)) {
      return [
        parseHex(i[1]),
        parseHex(i[2]),
        parseHex(i[3]),
        1
      ]
    } else if (i = rgbRegex.exec(color)) {
      return [
        parseInt(i[1]),
        parseInt(i[2]),
        parseInt(i[3]),
        1
      ]
    } else if (i = rgbaRegex.exec(color)) {
      return [
        parseInt(i[1]),
        parseInt(i[2]),
        parseInt(i[3]),
        Number(i[4])
      ]
    } else if (i = sHexRegex.exec(color)) {
      return [
        parseHex(i[1] + i[1]),
        parseHex(i[2] + i[2]),
        parseHex(i[3] + i[3]),
        1
      ]
    } else if (i = hexaRegex.exec(color)) {
      return [
        parseHex(i[1]),
        parseHex(i[2]),
        parseHex(i[3]),
        parseHex(i[4]) / 255
      ]
    } else if (i = sHexaRegex.exec(color)) {
      return [
        parseHex(i[1] + i[1]),
        parseHex(i[2] + i[2]),
        parseHex(i[3] + i[3]),
        parseHex(i[4] + i[4]) / 255
      ]
    }
    throw new Error(`[seemly/rgba]: Invalid color value ${color}.`)
  } catch (e) {
    throw e
  }
}

function compositeChannel (v1: number, a1:number, v2:number, a2:number, a:number) {
  return Math.floor((v1 * a1 * (1 - a2) + v2 * a2) / a)
}

export function composite (base: string | RGB | RGBA, overlay: string | RGB | RGBA): string {
  if (!Array.isArray(base)) base = rgba(base)
  if (!Array.isArray(overlay)) overlay = rgba(overlay)
  const a1 = (base as RGBA)[3]
  const a2 = (overlay as RGBA)[3]
  const alpha = (a1 + a2 - a1 * a2)
  return `rgba(${
    compositeChannel(base[0], a1, overlay[0], a2, alpha)
  }, ${
    compositeChannel(base[1], a1, overlay[1], a2, alpha)
  }, ${
    compositeChannel(base[2], a1, overlay[2], a2, alpha)
  }, ${alpha})`
}

interface ChangeColorOptions {
  alpha?: number
}

export function changeColor (base: string | RGB | RGBA, options: ChangeColorOptions): string {
  const [r, g, b] = Array.isArray(base) ? base : rgba(base)
  if (options.alpha) {
    return `rgba(${r}, ${g}, ${b}, ${options.alpha})`
  }
  return `rgb(${r}, ${g}, ${b})`
}
