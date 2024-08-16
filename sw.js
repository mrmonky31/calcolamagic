const CACHE_NAME = 'magic-calculator-v1';
const urlsToCache = [
  '/calcolamagic/',
  '/calcolamagic/index.html',
  '/calcolamagic/styles.css',
  '/calcolamagic/script.js',
  '/calcolamagic/icon-192x192.png',
  '/calcolamagic/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch('/calcolamagic/index.html'));
  } else {
    event.respondWith(
      fetch(event.request)
        .catch(() => fetch('/calcolamagic/index.html'))
    );
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});
