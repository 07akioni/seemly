import { getAlpha, toRgbString, getAlphaString } from '../index'

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
