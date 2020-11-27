const warnedMessages = new Set<string>()

export function warnOnce (location: string, message: string) {
  const mergedMessage = `[seemly/${location}]: ${message}`
  if (warnedMessages.has(mergedMessage)) return
  warnedMessages.add(mergedMessage)
}

export function warn (location: string, message: string) {
  console.error(`[seemly/${location}]: ${message}`)
}
