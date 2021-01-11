import { getMargin } from './index'

describe('#css', () => {
  describe('#getMargin', () => {
    it('works with `0`', () => {
      expect(getMargin('0', 'left')).toEqual('0')
      expect(getMargin('0', 'right')).toEqual('0')
      expect(getMargin('0', 'bottom')).toEqual('0')
      expect(getMargin('0', 'top')).toEqual('0')
    })
    it('works with `0 1`', () => {
      expect(getMargin(`0 1`, 'left')).toEqual('1')
      expect(getMargin(`0 1`, 'right')).toEqual('1')
      expect(getMargin(`0 1`, 'bottom')).toEqual('0')
      expect(getMargin(`0 1`, 'top')).toEqual('0')
    })
    it('works with `0 1 2`', () => {
      expect(getMargin(`0 1 2`, 'left')).toEqual('1')
      expect(getMargin(`0 1 2`, 'right')).toEqual('1')
      expect(getMargin(`0 1 2`, 'bottom')).toEqual('2')
      expect(getMargin(`0 1 2`, 'top')).toEqual('0')
    })
    it('works with `0 1 2 3`', () => {
      expect(getMargin(`0 1 2 3`, 'left')).toEqual('3')
      expect(getMargin(`0 1 2 3`, 'right')).toEqual('1')
      expect(getMargin(`0 1 2 3`, 'bottom')).toEqual('2')
      expect(getMargin(`0 1 2 3`, 'top')).toEqual('0')
    })
  })
})