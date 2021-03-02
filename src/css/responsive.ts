export function parseResponsiveProp(
  reponsiveProp: string | number
): Record<string, string> {
  if (typeof reponsiveProp === "number") {
    return {
      '': reponsiveProp.toString()
    }
  }
  const params: Record<string, string> = {}
  reponsiveProp.split(/ +/).forEach((pairLiteral) => {
    if (pairLiteral === '') return
    const [prefix, value] = pairLiteral.split(':')
    if (value === undefined) {
      params[''] = prefix
    } else {
      params[prefix] = value
    }
  })
  return params
}

// Get the responsive string value derived from responive-prop & active-key or active-value
function parseResponsivePropValue(
  reponsiveProp: undefined | null,
  activeKeyOrSize?: number | string | undefined
): undefined
function parseResponsivePropValue( // query by string
  reponsiveProp: string | number,
  activeKey?: string | undefined
): string | undefined
function parseResponsivePropValue( // query by number
  reponsiveProp: string | number,
  activeSize?: number | undefined
): string | undefined
function parseResponsivePropValue( // fallback
  reponsiveProp: string | number | undefined | null,
  activeKeyOrSize?: number | string | undefined
): string | undefined
function parseResponsivePropValue(
  reponsiveProp: string | number | undefined | null,
  activeKeyOrSize?: number | string | undefined
): string | undefined {
  if (reponsiveProp === undefined || reponsiveProp === null) return undefined
  const classObj = parseResponsiveProp(reponsiveProp)
  if (activeKeyOrSize === undefined) return classObj['']
  if (typeof activeKeyOrSize === 'string') {
    return classObj[activeKeyOrSize] ?? classObj['']
  } else {
    // Here we suppose all the keys are number formatted
    let activeValue: string | undefined = undefined
    let activeKey: number = -1
    Object.keys(classObj).forEach((key) => {
      const keyAsNum = Number(key)
      if (
        !Number.isNaN(keyAsNum) &&
        activeKeyOrSize >= keyAsNum &&
        keyAsNum >= activeKey
      ) {
        activeKey = keyAsNum
        activeValue = classObj[key]
      }
    })
    return activeValue
  }
}

export { parseResponsivePropValue }
