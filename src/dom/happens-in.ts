export function happensIn(
  e: {
    target: EventTarget | null
  },
  dataSetPropName: string
): boolean {
  let { target } = e
  while (target) {
    if ((target as HTMLElement).dataset) {
      if ((target as HTMLElement).dataset[dataSetPropName] !== undefined)
        return true
    }
    target = (target as Node).parentElement
  }
  return false
}
