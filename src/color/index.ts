import colors  from './colors'

export type RGBA = [number, number, number, number]
export type RGB = [number, number, number]
export type HSLA = [number, number, number, number]
export type HSVA = [number, number, number, number]
export type HSL = [number, number, number]
export type HSV = [number, number, number]

const prefix = '^\\s*'
const suffix = '\\s*$'
const num = '\\s*(\\d+)\\s*'
const percent = '\\s*(\\d+)%\\s*'
const float = '\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*'
const hex = '([0-9A-Fa-f])'
const dhex = '([0-9A-Fa-f]{2})'
const hslRegex = new RegExp(`${prefix}hsl\\s*\\(${num},${percent},${percent}\\)${suffix}`)
const hsvRegex = new RegExp(`${prefix}hsv\\s*\\(${num},${percent},${percent}\\)${suffix}`)
const hslaRegex = new RegExp(`${prefix}hsla\\s*\\(${num},${percent},${percent},${float}\\)${suffix}`)
const hsvaRegex =  new RegExp(`${prefix}hsva\\s*\\(${num},${percent},${percent},${float}\\)${suffix}`)
const rgbRegex = new RegExp(`${prefix}rgb\\s*\\(${num},${num},${num}\\)${suffix}`)
const rgbaRegex = new RegExp(`${prefix}rgba\\s*\\(${num},${num},${num},${float}\\)${suffix}`)
const sHexRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${suffix}`)
const hexRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${suffix}`)
const sHexaRegex = new RegExp(`${prefix}#${hex}${hex}${hex}${hex}${suffix}`)
const hexaRegex = new RegExp(`${prefix}#${dhex}${dhex}${dhex}${dhex}${suffix}`)

function parseHex (value: string): number {
  return parseInt(value, 16)
}

/**
 * Convert color string to hsla array
 * @param color format like hsl(180, 100%, 100%), hsla(180, 100%, 100%, 1)
 * @returns 
 */
export function hsla (color: string): HSLA {
  try {
    let i
    if (i = hslaRegex.exec(color)) {
      return [
        parseInt(i[1]),
        parseInt(i[2]),
        parseInt(i[3]),
        Number(i[4]),
      ]
    } else if (i = hslRegex.exec(color)) {
      return [
        parseInt(i[1]),
        parseInt(i[2]),
        parseInt(i[3]),
        1
      ]
    }
    throw new Error(`[seemly/hsla]: Invalid color value ${color}.`)
  } catch (e) {
    throw e
  }
}

/**
 * Convert color string to hsva array
 * @param color format like hsv(180, 100%, 100%), hsva(180, 100%, 100%, 1)
 * @returns 
 */
 export function hsva (color: string): HSLA {
  try {
    let i
    if (i = hsvaRegex.exec(color)) {
      return [
        parseInt(i[1]),
        parseInt(i[2]),
        parseInt(i[3]),
        Number(i[4]),
      ]
    } else if (i = hsvRegex.exec(color)) {
      return [
        parseInt(i[1]),
        parseInt(i[2]),
        parseInt(i[3]),
        1
      ]
    }
    throw new Error(`[seemly/hsva]: Invalid color value ${color}.`)
  } catch (e) {
    throw e
  }
}


/**
 * Convert color string to rgba array.
 * @param color format like #000[0], #000000[00], rgb(0, 0, 0), rgba(0, 0, 0, 0) and basic color keywords https://www.w3.org/TR/css-color-3/#html4 and transparent
 * @returns 
 */
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
    } else if (color in colors) {
      return rgba(colors[color as keyof typeof colors])
    }
    throw new Error(`[seemly/rgba]: Invalid color value ${color}.`)
  } catch (e) {
    throw e
  }
}

function normalizeChannel (channelValue: number): number {
  if (channelValue > 255) return 255
  if (channelValue < 0) return 0
  return Math.floor(channelValue)
}

function normalizeAlpha (alphaValue: number): number {
  return alphaValue > 1 ? 1 : (alphaValue < 0 ? 0 : alphaValue)
}

function stringifyRgb (r: number, g: number, b: number): string {
  return `rgb(${
    normalizeChannel(r)
  }, ${
    normalizeChannel(g)
  }, ${
    normalizeChannel(b)
  })`
}

function stringifyRgba (r: number, g: number, b: number, a: number): string {
  return `rgba(${
    normalizeChannel(r)
  }, ${
    normalizeChannel(g)
  }, ${
    normalizeChannel(b)
  }, ${
    normalizeAlpha(a)
  })`
}

function compositeChannel (v1: number, a1:number, v2:number, a2:number, a:number) {
  return Math.floor((v1 * a1 * (1 - a2) + v2 * a2) / a)
}

export function composite (background: string | RGB | RGBA, overlay: string | RGB | RGBA): string {
  if (!Array.isArray(background)) background = rgba(background)
  if (!Array.isArray(overlay)) overlay = rgba(overlay)
  const a1 = (background as RGBA)[3]
  const a2 = (overlay as RGBA)[3]
  const alpha = (a1 + a2 - a1 * a2)
  return  stringifyRgba(
    compositeChannel(background[0], a1, overlay[0], a2, alpha),
    compositeChannel(background[1], a1, overlay[1], a2, alpha),
    compositeChannel(background[2], a1, overlay[2], a2, alpha),
    alpha
  )
}

export interface ChangeColorOptions {
  alpha?: number
}

export function changeColor (base: string | RGB | RGBA, options: ChangeColorOptions): string {
  const [r, g, b, a = 1] = Array.isArray(base) ? base : rgba(base)
  if (options.alpha) {
    return stringifyRgba(r, g, b, options.alpha)
  }
  return stringifyRgba(r, g, b, a)
}

export interface ScaleColorOptions {
  lightness?: number,
  alpha?: number
}

export function scaleColor (base: string | RGB | RGBA, options: ScaleColorOptions): string {
  const [r, g, b, a = 1] = Array.isArray(base) ? base : rgba(base)
  const {
    lightness = 1,
    alpha = 1
  } = options
  return stringifyRgba(r * lightness, g * lightness, b * lightness, a * alpha)
}

export function getAlpha (base: string | RGB | RGBA): number {
  const alpha = (Array.isArray(base) ? base : rgba(base))[3] ?? 1
  return alpha
}

export function getAlphaString (base: string | RGB | RGBA): string {
  return `${getAlpha(base)}`
}

export function toRgbString (base: string | RGB | RGBA): string {
  const [r, g, b] = Array.isArray(base) ? base : rgba(base)
  return stringifyRgb(r, g, b)
}

export function toRgbaString (base: RGBA | RGB): string {
  const [r, g, b] = base
  if (3 in base) {
    return `rgba(${r}, ${g}, ${b}, ${base[3]})`
  }
  return `rgba(${r}, ${g}, ${b}, 1)`
}

export function toHsvString (base: HSVA | HSV): string {
  return `hsv(${base[0]}, ${base[1]}%, ${base[2]}%)`
}

export function toHsvaString (base: HSVA | HSV): string {
  const [h, s, v] = base
  if (3 in base) {
    return `hsva(${h}, ${s}%, ${v}%, ${base[3]})`
  }
  return `hsva(${h}, ${s}%, ${v}%, 1)`
}

export function toHslString (base: HSVA | HSV): string {
  return `hsl(${base[0]}, ${base[1]}%, ${base[2]}%)`
}

export function toHslaString (base: HSLA | HSL): string {
  const [h, s, l] = base
  if (3 in base) {
    return `hsla(${h}, ${s}%, ${l}%, ${base[3]})`
  }
  return `hsla(${h}, ${s}%, ${l}%, 1)`
}

export { hsl2hsv, hsv2hsl, hsv2rgb, rgb2hsv, rgb2hsl, hsl2rgb } from './convert'