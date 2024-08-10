const STATIC_ASSETS = [
  '/js-playground/simple-pwa/',
  '/js-playground/simple-pwa/index.html',
  '/js-playground/simple-pwa/assets/scripts/index.js',
  '/js-playground/simple-pwa/assets/scripts/components/counter.js',
  '/js-playground/simple-pwa/assets/styles/index.css',
  '/js-playground/simple-pwa/assets/styles/reset.css',
]
const CACHE_KEY = 'v0.0.1'

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_KEY).then(cache => {
    cache.addAll(STATIC_ASSETS)
  }))
})
