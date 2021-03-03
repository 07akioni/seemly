let cbs: Function[] = []
let params: Array<any[]> = []

function flushCallbacks (): void {
  cbs.forEach((cb, i) => cb(...params[i]))
  cbs = []
  params = []
}
function beforeNextFrame (cb: () => void): void
function beforeNextFrame<T1> (cb: (arg1: T1) => void, arg1: T1): void
function beforeNextFrame<T1, T2> (
  cb: (arg1: T1, arg2: T2) => void,
  arg1: T1,
  arg2: T2
): void
function beforeNextFrame<T1, T2, T3> (
  cb: (arg1: T1, arg2: T2, arg3: T3) => void,
  arg1: T1,
  arg2: T2,
  arg3: T3
): void
function beforeNextFrame<T1, T2, T3, T4> (
  cb: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => void,
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: T4
): void
function beforeNextFrame <T extends any[]>(cb: (...args: T) => void, ...args: T): void
function beforeNextFrame (cb: Function, ...args: any[]): void {
  cbs.push(cb) === 1 && requestAnimationFrame(flushCallbacks)
  params.push(args)
}
export {beforeNextFrame}
