import { repeat, indexMap, sleep } from '..'

describe('#misc', () => {
  describe('repeat()', () => {
    it('works', () => {
      expect(repeat(5, 1)).toEqual([1, 1, 1, 1, 1])
    })
  })
  describe('indexMap()', () => {
    it('works', () => {
      expect(indexMap(5, (v) => v + 1)).toEqual([1, 2, 3, 4, 5])
      expect(indexMap(5)).toEqual([0, 1, 2, 3, 4])
    })
  })
  describe('sleep', () => {
    it('works', (done) => {
      let ok = false
      sleep(100).then(() => (ok = true))
      setTimeout(() => {
        expect(ok).toEqual(false)
      }, 0)
      setTimeout(() => {
        expect(ok).toEqual(true)
        done()
      }, 200)
    })
  })
})
