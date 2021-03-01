export function parseClass (paramsLiteral: string): Record<string, string> {
  const params: Record<string, string> = {}
  paramsLiteral.split(/ +/).forEach(pairLiteral => {
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