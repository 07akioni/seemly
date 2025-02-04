import {
  getAlpha,
  getAlphaString,
  hsla,
  hsva,
  hsv2hsl,
  hsv2rgb,
  rgb2hsv,
  hsl2hsv,
  rgb2hsl,
  hsl2rgb,
  toRgbString,
  toRgbaString,
  toHslString,
  toHslaString,
  toHsvString,
  toHsvaString,
  toHexString,
  toHexaString,
  rgba,
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
  expect(round(rgba('hsv(296, 63%, 68%)'))).toEqual([166, 64, 173, 1])
  expect(round(rgba('hsl(296, 46%, 47%)'))).toEqual([168, 65, 175, 1])
  expect(round(rgba('hsva(296, 63%, 68%, 0.5)'))).toEqual([166, 64, 173, 1])
  expect(round(rgba('hsla(296, 46%, 47%, 0.5)'))).toEqual([168, 65, 175, 1])
  expect(rgba('hsva(296, 63%, 68%, 0.5)')[3]).toEqual(0.5)
  expect(rgba('hsla(296, 46%, 47%, 0.5)')[3]).toEqual(0.5)
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

describe('# conversion', () => {
  const input = [30, 40, 50] as const
  const toFixed = (arr: readonly number[]) => arr.map(v => v.toFixed(2))
  const output = toFixed(input)
  it('rgb', () => {
    expect(toFixed(hsl2rgb(...rgb2hsl(...input)))).toEqual(output)
    expect(toFixed(hsv2rgb(...rgb2hsv(...input)))).toEqual(output)
  })
  it('hsl', () => {
    expect(toFixed(rgb2hsl(...hsl2rgb(...input)))).toEqual(output)
    expect(toFixed(hsv2hsl(...hsl2hsv(...input)))).toEqual(output)
  })
  it('hsv', () => {
    expect(toFixed(rgb2hsv(...hsv2rgb(...input)))).toEqual(output)
    expect(toFixed(hsl2hsv(...hsv2hsl(...input)))).toEqual(output)
  })
})

describe('# toXxxString', () => {
  it('works', () => {
    expect(toHslString([180, 100, 100])).toEqual('hsl(180, 100%, 100%)')
    expect(toHslString([180, 100, 100, 0.2])).toEqual('hsl(180, 100%, 100%)')
    expect(toHslaString([180, 100, 100])).toEqual('hsla(180, 100%, 100%, 1)')
    expect(toHslaString([180, 100, 100, 0.2])).toEqual(
      'hsla(180, 100%, 100%, 0.2)'
    )
    expect(toHsvString([180, 100, 100])).toEqual('hsv(180, 100%, 100%)')
    expect(toHsvString([180, 100, 100, 0.2])).toEqual('hsv(180, 100%, 100%)')
    expect(toHsvaString([180, 100, 100])).toEqual('hsva(180, 100%, 100%, 1)')
    expect(toHsvaString([180, 100, 100, 0.2])).toEqual(
      'hsva(180, 100%, 100%, 0.2)'
    )
    expect(toRgbString([180, 100, 100])).toEqual('rgb(180, 100, 100)')
    expect(toRgbString([180, 100, 100, 0.2])).toEqual('rgb(180, 100, 100)')
    expect(toRgbaString([180, 100, 100])).toEqual('rgba(180, 100, 100, 1)')
    expect(toRgbaString([180, 100, 100, 0.2])).toEqual(
      'rgba(180, 100, 100, 0.2)'
    )
    expect(toHexaString([255, 255, 255, 1])).toEqual('#FFFFFFFF')
    expect(toHexaString([255, 255, 255])).toEqual('#FFFFFFFF')
    expect(toHexString([255, 255, 255, 1])).toEqual('#FFFFFF')
    expect(toHexString([255, 255, 255])).toEqual('#FFFFFF')
    expect(toHexaString([0, 255, 255, 1])).toEqual('#00FFFFFF')
    expect(toHexaString([0, 255, 255])).toEqual('#00FFFFFF')
    expect(toHexString([0, 255, 255, 1])).toEqual('#00FFFF')
    expect(toHexString([0, 255, 255])).toEqual('#00FFFF')
    expect(toHexaString('#ABC')).toEqual('#AABBCCFF')
    expect(toHexaString('#ABCD')).toEqual('#AABBCCDD')
    expect(toHexaString('#AABBCC')).toEqual('#AABBCCFF')
    expect(toHexaString('#AABBCCDD')).toEqual('#AABBCCDD')
    expect(toHexString('#ABC')).toEqual('#AABBCC')
    expect(toHexString('#ABCD')).toEqual('#AABBCC')
    expect(toHexString('#AABBCC')).toEqual('#AABBCC')
    expect(toHexString('#AABBCCDD')).toEqual('#AABBCC')
  })
})
