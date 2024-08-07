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
    window.navigator.serviceWorker.register('/sw.js')
  }
})

pwaIntallBtn.addEventListener('click', () => {
  triggerPrompt()
})
