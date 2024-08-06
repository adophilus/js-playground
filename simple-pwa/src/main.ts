import '@unocss/reset/tailwind.css'
import './styles.css'
import './components/counter'


type PwaInstallationEvent = {
  prompt: Function
}

let _promptEvent: PwaInstallationEvent | null = null
const triggerPrompt = () => {
  if (_promptEvent)
    _promptEvent.prompt()
}

const setPromptEvent = (event: PwaInstallationEvent) => {
  _promptEvent = event
}

const pwaIntallBtn = document.querySelector('#pwa-installer')!
window.addEventListener('beforeinstallprompt', (event) => {
  const promptEvent = event as unknown as PwaInstallationEvent
  console.log('Got installation event', promptEvent)
  setPromptEvent(promptEvent)
  pwaIntallBtn.removeAttribute('disabled')
})

if (window.navigator?.serviceWorker) {
  window.navigator.serviceWorker.register('/sw.js')
}

pwaIntallBtn.addEventListener('click', () => {
  triggerPrompt()
})
