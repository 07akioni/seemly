import { RGB, HSV, HSL } from '.'

/**
 * @param h 360
 * @param s 1
 * @param l 1
 * @returns [h, s, v] 360, 1, 1
 */
export const hsl2hsv = (
  h: number,
  s: number,
  l: number,
  v = s * Math.min(l, 1 - l) + l
): HSV => [h, v ? 2 - (2 * l) / v : 0, v]

/**
 * @param h 360
 * @param s 1
 * @param v 1
 * @returns [h, s, l] 360, 1, 1
 */
export const hsv2hsl = (
  h: number,
  s: number,
  v: number,
  l = v - (v * s) / 2,
  m = Math.min(l, 1 - l)
): HSL => [h, m ? (v - l) / m : 0, l]

/**
 * @param h 360
 * @param s 1
 * @param v 1
 * @returns [r, g, b] 255, 255, 255
 */
export function hsv2rgb(h: number, s: number, v: number): RGB {
  let f = (n: number, k = (n + h / 60) % 6) =>
    v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)
  return [f(5) * 255, f(3) * 255, f(1) * 255]
}

/**
 *
 * @param r 255
 * @param g 255
 * @param b 255
 * @returns [360, 1, 1]
 */
export function rgb2hsv (r: number, g: number, b: number): HSV {
  r /= 255
  g /= 255
  b /= 255
  let v = Math.max(r, g, b),
    c = v - Math.min(r, g, b)
  let h =
    c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c)
  return [60 * (h < 0 ? h + 6 : h), v && c / v, v]
}
