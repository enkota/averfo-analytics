!(function () {
  const endpoint = 'https://averfo.com/collect'

  function track(name, data = {}) {
    const payload = {
      name,
      url: location.href,
      path: location.pathname,
      referrer: document.referrer || null,
      language: navigator.language || null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
      ts: Date.now(),
      ...data
    }

    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, JSON.stringify(payload))
    } else {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      })
    }
  }

  // 👇 single global entry point
  window.averfo = window.averfo || {}
  window.averfo.track = track

  track('pageview')

  window.addEventListener('load', () => track('page.load'))
  window.addEventListener('popstate', () => track('pageview'))

  const pushState = history.pushState
  history.pushState = function () {
    pushState.apply(this, arguments)
    track('pageview')
  }
})()
