const CACHE_NAME = 'sudoku-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './dist/index.css',
  './dist/index.js',
  './dist/sudokuSolver.js',
  './dist/analyze.js',
];
self.addEventListener('install', (ev) => {
  ev.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});
self.addEventListener('activate', (ev) => {
  ev.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        }),
      );
    }),
  );
});
self.addEventListener('fetch', (ev) => {
  ev.respondWith(
    caches.match(ev.request).then((cached) => cached || fetch(ev.request)),
  );
});
//# sourceMappingURL=sw.js.map
