;(function () {
  const endpoint = 'https://averfo.com/collect'

  function sendEvent(name) {
    const payload = {
      name,
      url: location.href,
      path: location.pathname,
      referrer: document.referrer || null,
      language: navigator.language || null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
      ts: Date.now()
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

  sendEvent('pageview')
  window.addEventListener('load', () => sendEvent('page.load'))

  window.addEventListener('popstate', () => sendEvent('pageview'))
  const pushState = history.pushState
  history.pushState = function () {
    pushState.apply(this, arguments)
    sendEvent('pageview')
  }
})()
