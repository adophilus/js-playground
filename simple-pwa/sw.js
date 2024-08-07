const STATIC_ASSETS = [
  '/simple-pwa/',
  '/simple-pwa/index.html',
  '/simple-pwa/assets/scripts/index.js',
  '/simple-pwa/assets/scripts/components/counter.js',
  '/simple-pwa/assets/styles/index.css',
  '/simple-pwa/assets/styles/reset.css',
]
const CACHE_KEY = 'v0.0.1'

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_KEY).then(cache => {
    cache.addAll(STATIC_ASSETS)
  }))
})
