export function parseResponsiveProp(
  reponsiveProp: string
): Record<string, string> {
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

export function parseResponsivePropValue(
  reponsiveProp: string,
  activeKey?: string | undefined
): string | undefined {
  const classObj = parseResponsiveProp(reponsiveProp)
  if (activeKey === undefined) return classObj['']
  return classObj[activeKey] ?? classObj['']
}
