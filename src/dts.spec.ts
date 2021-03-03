import { beforeNextFrameOnce } from './animation/next-frame-once'
import { beforeNextFrame } from './index'

declare function expectType<T> (arg: T): void

describe('beforeNextFrame', () => {
  const cb = (arg1: number) => {}
  // @ts-expect-error
  beforeNextFrame(cb)
  beforeNextFrame(cb, 1)
  // @ts-expect-error
  beforeNextFrame(cb, '2')
  beforeNextFrame((arg1) => {
    expectType<string>(arg1)
  }, '123')
  beforeNextFrame((arg1) => {
    expectType<number>(arg1)
  }, 123)
  beforeNextFrame((arg1) => {
    expectType<number>(arg1)
  }, 123, '223')
  // @ts-expect-error
  beforeNextFrameOnce(cb)
  // @ts-expect-error
  beforeNextFrameOnce(cb, '123')
  beforeNextFrameOnce((arg1) => {
    expectType<string>(arg1)
  }, '123')
  beforeNextFrameOnce((arg1) => {
    expectType<number>(arg1)
  }, 123)
  beforeNextFrameOnce((arg1) => {
    expectType<number>(arg1)
  }, 123, '223')
})