const CACHE = 'textblower-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/notification.mp3',
  '/applepay.mp3',
  '/twitter.mp3',
  '/snapchat.mp3',
  '/grindr.mp3',
  '/diamondplate.svg',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
