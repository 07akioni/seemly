type GetElement = () => HTMLElement

function unwrapElement<T> (target: T | string | GetElement): T extends HTMLElement ? HTMLElement : HTMLElement | null
function unwrapElement (target: HTMLElement | string | GetElement) {
  if (typeof target === 'string') return document.querySelector(target)
  if (typeof target === 'function') return target()
  return target
}

export { unwrapElement }
