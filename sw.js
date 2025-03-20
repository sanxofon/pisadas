const CACHE_NAME = 'pisadas-guitarra-cache-v1.1';
const urlsToCache = [
  '/pisadas/',                     // Ruta base de tu proyecto en GitHub Pages
  '/pisadas/index.html',            // Rutas relativas a la base
  '/pisadas/notacion.html',            // Rutas relativas a la base
  '/pisadas/style.css',
  '/pisadas/app.js',
  '/pisadas/chords.js',
  '/pisadas/chordGenerator.js',
  '/pisadas/acordesConocidos.js',
  '/pisadas/manifest.webmanifest',
  '/pisadas/readme.md',
  '/pisadas/desconocida.png',  
  '/pisadas/icon-48.png',          // Asegúrate de incluir todos tus iconos
  '/pisadas/icon-96.png',
  '/pisadas/icon-192.png',
  '/pisadas/icon-512.png',
  '/pisadas/share.jpg',
  '/pisadas/trash.png',
  '/pisadas/config.png',
  '/pisadas/export.png',
  '/pisadas/idea.png',
  '/pisadas/import.png',
  '/pisadas/info.png',
  '/pisadas/ok.png',
  '/pisadas/plus.png',
  '/pisadas/save.png',
  '/pisadas/send.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});


self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});