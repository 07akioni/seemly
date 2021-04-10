import {
  getAlpha,
  toRgbString,
  getAlphaString,
  hsla,
  hsva,
  hsv2hsl,
  hsv2rgb,
  rgb2hsv,
  hsl2hsv,
  rgb2hsl,
  hsl2rgb
} from '../index'

function round(arr: number[]) {
  return arr.map((v) => Math.round(v))
}

describe('# convert', () => {
  // https://convertingcolors.com/rgb-color-167_64_174.html?search=rgb(167,%2064,%20174)
  // Hex	A740AE
  // RGB	167, 64, 174
  // HSL	296, 46%, 47%
  // HSV	296, 63%, 68%
  expect(round(hsv2hsl(296, 63, 68))).toEqual([296, 46, 47])
  expect(round(hsl2hsv(296, 46, 47))).toEqual([296, 63, 69])
  expect(round(rgb2hsv(167, 64, 174))).toEqual([296, 63, 68])
  expect(round(hsv2rgb(296, 63, 68))).toEqual([166, 64, 173])
  expect(round(hsl2rgb(296, 46, 47))).toEqual([168, 65, 175])
  expect(round(rgb2hsl(167, 64, 174))).toEqual([296, 46, 47])
})

describe('# getAlpha', () => {
  it('rgb', () => {
    expect(getAlpha('rgb(1, 1, 1)')).toEqual(1)
  })
  it('rgba', () => {
    expect(getAlpha('rgba(1, 1, 1, 0.5)')).toEqual(0.5)
  })
})

describe('# getAlphaString', () => {
  it('rgb', () => {
    expect(getAlphaString('rgb(1, 1, 1)')).toEqual('1')
  })
  it('rgba', () => {
    expect(getAlphaString('rgba(1, 1, 1, 0.5)')).toEqual('0.5')
  })
})

describe('# toRgbString', () => {
  it('rgb', () => {
    expect(toRgbString('rgb(1, 1, 1)')).toEqual('rgb(1, 1, 1)')
  })
  it('rgba', () => {
    expect(toRgbString('rgba(1, 1, 1, 0.5)')).toEqual('rgb(1, 1, 1)')
    expect(toRgbString('red')).toEqual('rgb(255, 0, 0)')
  })
})

describe('# hsla', () => {
  it('hsa', () => {
    expect(hsla('hsla(180, 50%, 60%, 0.5)')).toEqual([180, 50, 60, 0.5])
  })
  it('hsla', () => {
    expect(hsla('hsl(180, 50%, 60%)')).toEqual([180, 50, 60, 1])
  })
})

describe('# hsva', () => {
  it('hsv', () => {
    expect(hsva('hsv(180, 50%, 60%)')).toEqual([180, 50, 60, 1])
  })
  it('hsva', () => {
    expect(hsva('hsva(180, 50%, 60%, 0.5)')).toEqual([180, 50, 60, 0.5])
  })
})
