;(function () {
  const endpoint = 'https://averfo.com/collect'

  function sendEvent(name) {
    const payload = {
      name, // event type: "pageview" or "page.load"
      url: window.location.href,
      path: window.location.pathname,
      referrer: document.referrer || null,
      language: navigator.language || null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
      ts: Date.now()
    }

    if (navigator.sendBeacon) {
      console.log('Using sendBeacon for event:', name)
      navigator.sendBeacon(endpoint, JSON.stringify(payload))
    } else {
      console.log('Using fetch for event:', name)

      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        keepalive: true
      })
    }
  }

  // Track pageview immediately
  sendEvent('pageview')

  // Track page.load when all resources finish loading
  window.addEventListener('load', () => sendEvent('page.load'))
})()
