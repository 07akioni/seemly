import { repeat, indexMap } from '..'

describe('#misc', () => {
  describe('repeat()', () => {
    it('works', () => {
    expect(repeat(5, 1)).toEqual([1, 1, 1, 1, 1])

    })
  })
  describe('indexMap()', () => {
    expect(indexMap(5, v => v + 1)).toEqual([1, 2, 3, 4, 5])
    expect(indexMap(5)).toEqual([0, 1, 2, 3, 4])
  })
})
