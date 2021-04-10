import { getAlpha, toRgbString, getAlphaString, hsla, hsva } from '../index'

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
    expect(hsla('hsla(180, 50%, 60%, 0.5)')).toEqual([
      180,
      50,
      60,
      0.5
    ])
  })
  it('hsla', () => {
    expect(hsla('hsl(180, 50%, 60%)')).toEqual([
      180,
      50,
      60,
      1
    ])
  })
})

describe('# hsva', () => {
  it('hsv', () => {
    expect(hsva('hsv(180, 50%, 60%)')).toEqual([
      180,
      50,
      60,
      1
    ])
  })
  it('hsva', () => {
    expect(hsva('hsva(180, 50%, 60%, 0.5)')).toEqual([
      180,
      50,
      60,
      0.5
    ])
  })
})