import './components/counter.js'


/**
 * @typedef PwaInstallationEvent
 * @type {object}
 * @property {Function} prompt
 */

/** @type {?PwaInstallationEvent} */
let _promptEvent = null

const triggerPrompt = () => {
  if (_promptEvent)
    _promptEvent.prompt()
}

/**
 * @param {PwaInstallationEvent} event
 */
const setPromptEvent = (event) => {
  _promptEvent = event
}

/** @type {HTMLButtonElement} */
const pwaIntallBtn = document.querySelector('#pwa-installer')

window.addEventListener('beforeinstallprompt', (event) => {
  /** @type {PwaInstallationEvent} */
  const promptEvent = event
  setPromptEvent(promptEvent)
  pwaIntallBtn.removeAttribute('disabled')
})

window.addEventListener('load', async () => {
  if ('serviceWorker' in window.navigator) {
    window.navigator.serviceWorker.register('/js-playground/simple-pwa/sw.js')
  }
})

const requestForNotificationsPermission = () => {
  if (window.Notification) {
    switch (window.Notification.permission) {
      case 'default': {
        window.Notification.requestPermission()
        break
      }
      case 'denied':{
        alert("Permission denied, you have to enable notifications from your brower's settings")
      }
    }
  }
}

pwaIntallBtn.addEventListener('click', () => {
  triggerPrompt()
  requestForNotificationsPermission()
})
