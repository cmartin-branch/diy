;(function trustArcHelper(window) {
  var t = (window.trustArcHelper = window.trustArcHelper || {})

  var overlayClass = 'truste_box_overlay'
  var isLink = false

  function disconnect() {
    t.observer && t.observer.disconnect()
    t.observer = null
  }

  // This is a workaround to help us style correctly, in particular
  // to remove the scrollbar when trustarc is shown
  t.registerObserver = function(isCookieLink) {
    // Don't need to create new observer if we already have one
    if (t.observer) {
      return
    }

    // This helps us apply a class to body based on whether the overlay is
    // present
    t.observer = new MutationObserver(function(mutationList) {
      try {
        mutationList.forEach(function(m) {
          var c = 'trustArcActive'
          if (m.addedNodes[0] && m.addedNodes[0].className === overlayClass) {
            if (isCookieLink) {
              document.body.classList.add(c)
            }
          } else if (
            m.removedNodes[0] &&
            m.removedNodes[0].className === overlayClass
          ) {
            document.body.classList.remove(c)
            disconnect()
          }
        })
      } catch (e) {
        console.warn(
          'trustArcHelper error - you may see a double scrollbar when on cookie preferences',
          e
        )
      }
    })

    // Trust arc inserts divs into body, so we look out for those
    t.observer.observe(document.body, { childList: true })

    // We don't want the observer sticking around unnecessarily, but we also
    // don't have a better way of knowing whether to register this observer,
    // on page load, so we always register the observer, but remove it after
    // an admittedly arbitrary timeout
    window.setTimeout(function() {
      if (!document.querySelector('.' + overlayClass)) {
        disconnect()
      }
    }, 10000)
  }

  t.registerObserver(isLink)
})(window)
