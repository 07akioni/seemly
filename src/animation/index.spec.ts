import { beforeNextFrame, beforeNextFrameOnce } from '../index'

declare const global: any

global.requestAnimationFrame = (f: Function) => {
  window.setTimeout(f, 0)
  return 1
}

describe('# beforeNextFrame',() => {
  it('works with params', (done) => {
    const result: number[] = []
    const cb = jest.fn((arg: number) => {
      result.push(arg)
    }) 
    beforeNextFrame(cb, 1)
    beforeNextFrame(cb, 2)
    setTimeout(() => {
      expect(cb).toHaveBeenCalledTimes(2)
      expect(result).toEqual([1, 2])
      done()
    }, 100)
  })
})

describe('# beforeNextFrameOnce',() => {
  it('works with params', (done) => {
    const result: number[] = []
    const cb = jest.fn((arg: number) => {
      result.push(arg)
    }) 
    beforeNextFrameOnce(cb, 1)
    beforeNextFrameOnce(cb, 2)
    setTimeout(() => {
      expect(cb).toHaveBeenCalledTimes(1)
      expect(result).toEqual([2])
      done()
    }, 100)
  })
})