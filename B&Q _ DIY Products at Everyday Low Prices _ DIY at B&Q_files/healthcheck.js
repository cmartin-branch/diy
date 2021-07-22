// cookie helper methods used to
// prevent repetitive reporting

const removeCookie = cookieName =>
    (document.cookie = `${cookieName}=; expires=${new Date(0).toString()}`),
  setCookie = (key, value) => (document.cookie = `${key}=${value}`),
  isCookiePresent = cookieName =>
    document.cookie.split('; ').some(line => {
      const [key] = line.split('=')
      key === cookieName
    })

// reset target cookie 'adBlockDetected'

removeCookie('adBlockDetected')

//  method to report block to the backend

const reportBlock = _ => {
  if (!isCookiePresent('adBlockDetected')) {
    const { protocol, host } = window.location
    setCookie('adBlockDetected', 'true')
    fetch(`${protocol}//${host}/notealium`)
  }
}

// mutation observer checking whether the cookie
// consent banner is present within the DOM and has
// style attributes forcing it to invisible state

function checkIfCookieBannerIsHidden() {
  const [trusteBoxOverlay] = document.getElementsByClassName(
    'truste_box_overlay'
  )

  if (trusteBoxOverlay) {
    const { display, visibility, opacity, width, height } = getComputedStyle(
        trusteBoxOverlay
      ),
      invisibleConditions = {
        isNotDisplayed: display === 'none',
        isHidden: visibility === 'hidden',
        isTransparent: opacity === '0',
        isOfZeroHeight: height === '0px',
        isOfZeroWidth: width === '0px',
      },
      isPopupBlocked = Object.keys(invisibleConditions).some(
        key => invisibleConditions[key]
      )

    if (isPopupBlocked) {
      reportBlock()
      this.disconnect()
    }
  }
}
const observer = new MutationObserver(checkIfCookieBannerIsHidden)

observer.observe(document, {
  childList: true,
  attributes: true,
  subtree: true,
})

// make 'suspicious' network request to check
// whether some browser extension blocks that

const checkSensitiveUrls = (async _ => {
  const sensitiveUrls = ['https://www.google-analytics.com/collect'],
    mode = 'no-cors'

  try {
    for await (url of sensitiveUrls) {
      if (isCookiePresent('adBlockDetected')) break
      await fetch(url, { mode })
    }
  } catch {
    reportBlock()
  }
})()
