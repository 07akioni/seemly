import {
  depx,
  getMargin,
  getGap,
  pxfy,
  parseResponsiveProp,
  parseResponsivePropValue
} from './index'

getMargin('0')

describe('#css', () => {
  describe('#depx & pxfy', () => {
    expect(depx(1)).toEqual(1)
    expect(depx('1')).toEqual(1)
    expect(depx('1px')).toEqual(1)
    expect(pxfy(1)).toEqual('1px')
    expect(pxfy('1')).toEqual('1px')
    expect(pxfy('1px')).toEqual('1px')
    expect(pxfy(undefined)).toEqual(undefined)
    expect(pxfy(null)).toEqual(undefined)
  })
  describe('#getMargin', () => {
    it('works with `0`', () => {
      expect(getMargin('0')).toEqual({
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      })
      expect(getMargin('0', 'left')).toEqual('0')
      expect(getMargin('0', 'right')).toEqual('0')
      expect(getMargin('0', 'bottom')).toEqual('0')
      expect(getMargin('0', 'top')).toEqual('0')
    })
    it('works with `0 1`', () => {
      expect(getMargin('0 1')).toEqual({
        top: '0',
        right: '1',
        bottom: '0',
        left: '1'
      })
      expect(getMargin(`0 1`, 'left')).toEqual('1')
      expect(getMargin(`0 1`, 'right')).toEqual('1')
      expect(getMargin(`0 1`, 'bottom')).toEqual('0')
      expect(getMargin(`0 1`, 'top')).toEqual('0')
    })
    it('works with `0 1 2`', () => {
      expect(getMargin('0 1 2')).toEqual({
        top: '0',
        right: '1',
        bottom: '2',
        left: '1'
      })
      expect(getMargin(`0 1 2`, 'left')).toEqual('1')
      expect(getMargin(`0 1 2`, 'right')).toEqual('1')
      expect(getMargin(`0 1 2`, 'bottom')).toEqual('2')
      expect(getMargin(`0 1 2`, 'top')).toEqual('0')
    })
    it('works with `0 1 2 3`', () => {
      expect(getMargin('0 1 2 3')).toEqual({
        top: '0',
        right: '1',
        bottom: '2',
        left: '3'
      })
      expect(getMargin(`0 1 2 3`, 'left')).toEqual('3')
      expect(getMargin(`0 1 2 3`, 'right')).toEqual('1')
      expect(getMargin(`0 1 2 3`, 'bottom')).toEqual('2')
      expect(getMargin(`0 1 2 3`, 'top')).toEqual('0')
    })
  })
  describe('#getGap', () => {
    expect(getGap('5px 10px', 'row')).toEqual('5px')
    expect(getGap('5px 10px', 'col')).toEqual('10px')
    expect(getGap('5px 10px')).toEqual({ row: '5px', col: '10px' })
    expect(getGap('5px')).toEqual({ row: '5px', col: '5px' })
  })
  describe('#parseResponsiveProp', () => {
    expect(parseResponsiveProp('')).toEqual({})
    expect(parseResponsiveProp('123')).toEqual({
      '': '123'
    })
    expect(parseResponsiveProp('123 m:223')).toEqual({
      '': '123',
      m: '223'
    })
    expect(parseResponsiveProp('123 m:223 l:323')).toEqual({
      '': '123',
      m: '223',
      l: '323'
    })
    expect(parseResponsiveProp('123 m:2-23 l:3-23')).toEqual({
      '': '123',
      m: '2-23',
      l: '3-23'
    })
    expect(parseResponsiveProp('  123  m:2-23  l:3-23  ')).toEqual({
      '': '123',
      m: '2-23',
      l: '3-23'
    })
  })
  describe('#parseResponsivePropValue (by key)', () => {
    expect(
      parseResponsivePropValue('  123  m:2-23  l:3-23  ', undefined)
    ).toEqual('123')
    expect(parseResponsivePropValue('  123  m:2-23  l:3-23  ', 'm')).toEqual(
      '2-23'
    )
    expect(parseResponsivePropValue('  123  m:2-23  l:3-23  ', 'l')).toEqual(
      '3-23'
    )
    expect(parseResponsivePropValue('  123  m:2-23  l:3-23  ', 'x')).toEqual(
      '123'
    )
    expect(parseResponsivePropValue('m:2-23  l:3-23  ', 'x')).toEqual(undefined)
  })
  describe('#parseResponsivePropValue (by width)', () => {
    expect(parseResponsivePropValue('4  768:5  1280:6', undefined)).toEqual('4')
    expect(parseResponsivePropValue('4  768:5  1280:6', '')).toEqual('4')
    expect(parseResponsivePropValue('4  768:5  1280:6', 778)).toEqual('5')
    expect(parseResponsivePropValue('4  768:5  1280:6', 1290)).toEqual('6')
    expect(parseResponsivePropValue('4  768:5  1280:6', 600)).toEqual('4')
  })
  describe('#parseResponsivePropValue (nullish)', () => {
    expect(parseResponsivePropValue(undefined, undefined)).toEqual(undefined)
    expect(parseResponsivePropValue(undefined, '')).toEqual(undefined)
    expect(parseResponsivePropValue(undefined, '')).toEqual(undefined)
    expect(parseResponsivePropValue(null, undefined)).toEqual(undefined)
    expect(parseResponsivePropValue(null, '')).toEqual(undefined)
    expect(parseResponsivePropValue(null, '')).toEqual(undefined)
  })
})
