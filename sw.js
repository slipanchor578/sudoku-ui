const CACHE_NAME = 'sudoku-cache-v1';
const ASSETS = [
  '/sudoku-ui',
  '/sudoku-ui/index.html',
  '/sudoku-ui/dist/index.css',
  '/sudoku-ui/dist/index.js',
  '/sudoku-ui/dist/sudokuSolver.js',
  'sudoku-ui/dist/analyze.js',
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
