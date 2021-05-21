import { repeat, indexMap } from '..'

describe('#misc', () => {
  describe('repeat()', () => {
    it('works', () => {
    expect(repeat(1, 5)).toEqual([1, 1, 1, 1, 1])

    })
  })
  describe('indexMap()', () => {
    expect(indexMap(v => v, 5)).toEqual([0, 1, 2, 3, 4])
  })
})
