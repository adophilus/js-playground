const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/assets/scripts/index.js',
  '/assets/scripts/components/counter.js',
  '/assets/styles/index.css',
  '/assets/styles/reset.css',
]
const CACHE_KEY = 'v0.0.1'

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_KEY).then(cache => {
    cache.addAll(STATIC_ASSETS)
  }))
})
