let onceCbs: Function[] = []
const paramsMap: WeakMap<Function, any[]> = new WeakMap()

function flushOnceCallbacks (): void {
  onceCbs.forEach((cb) => cb(...paramsMap.get(cb)!))
  onceCbs = []
}

function beforeNextFrameOnce (cb: () => void): void
function beforeNextFrameOnce<T1> (cb: (arg1: T1) => void, arg1: T1): void
function beforeNextFrameOnce<T1, T2> (
  cb: (arg1: T1, arg2: T2) => void,
  arg1: T1,
  arg2: T2
): void
function beforeNextFrameOnce<T1, T2, T3> (
  cb: (arg1: T1, arg2: T2, arg3: T3) => void,
  arg1: T1,
  arg2: T2,
  arg3: T3
): void
function beforeNextFrameOnce<T1, T2, T3, T4> (
  cb: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => void,
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: T4
): void
function beforeNextFrameOnce <T extends any[]>(cb: (...args: T) => void, ...params: T): void
function beforeNextFrameOnce (cb: Function, ...params: any[]): void {
  paramsMap.set(cb, params)
  if (onceCbs.includes(cb)) return
  onceCbs.push(cb) === 1 && requestAnimationFrame(flushOnceCallbacks)
}
export { beforeNextFrameOnce }
