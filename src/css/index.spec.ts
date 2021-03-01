import { depx, getMargin, pxfy, parseClass } from './index'

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
  describe('#parseClass', () => {
    expect(parseClass('')).toEqual({})
    expect(parseClass('123')).toEqual({
      '': '123'
    })
    expect(parseClass('123 m:223')).toEqual({
      '': '123',
      m: '223'
    })
    expect(parseClass('123 m:223 l:323')).toEqual({
      '': '123',
      m: '223',
      l: '323'
    })
    expect(parseClass('123 m:2-23 l:3-23')).toEqual({
      '': '123',
      m: '2-23',
      l: '3-23'
    })
    expect(parseClass('  123  m:2-23  l:3-23  ')).toEqual({
      '': '123',
      m: '2-23',
      l: '3-23'
    })
  })
})