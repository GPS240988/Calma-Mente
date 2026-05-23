// Placeholder for Firebase Analytics or Vercel Analytics setup

export const logEvent = (eventName: string, params?: Record<string, any>) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Analytics] ${eventName}`, params || '')
    return
  }

  // TODO: Add actual analytics SDK call here (e.g. logEvent(analytics, eventName, params))
}
