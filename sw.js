const CACHE_NAME = 'pisadas-guitarra-cache-v1.6.5';
const APP_VERSION = '1.6.5'; // Update this when releasing a new version
const urlsToCache = [
  '/pisadas/',                     // Ruta base del proyecto en GitHub Pages
  '/pisadas/index.html',            // Rutas relativas a la base
  '/pisadas/notacion.html',            // Rutas relativas a la base
  '/pisadas/style.css',
  '/pisadas/app.js',
  '/pisadas/chords.js',
  '/pisadas/chordGenerator.js',
  '/pisadas/acordesConocidos.js',
  '/pisadas/acordesPosibles.js',    // Añadido archivo faltante
  '/pisadas/manifest.webmanifest',
  '/pisadas/README.md',
  '/pisadas/sw.js',                 // Incluir el propio service worker
  '/pisadas/instrumentos.js',       // Archivo de instrumentos
  
  // Imágenes
  '/pisadas/desconocida.png',  
  '/pisadas/icon-48.png',          // incluir todos los iconos
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
  '/pisadas/send.png',
  '/pisadas/download.png',         // Nueva imagen para descargar
  '/pisadas/sheet.png'             // Nueva imagen para planilla de acordes
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache version:', APP_VERSION);
        return cache.addAll(urlsToCache)
          .then(() => {
            // Force the new service worker to activate immediately
            return self.skipWaiting();
          });
      })
      .catch(error => {
        console.error('Cache installation failed:', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Try network first, then fall back to cache
    fetch(event.request)
      .then(response => {
        // If we got a valid response, clone it and update the cache
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseClone);
            });
          return response;
        } else {
          throw new Error('Network response was not valid');
        }
      })
      .catch(() => {
        // Network failed, try the cache
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If the request is for an HTML page, return the offline page
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/pisadas/index.html');
            }
            // Otherwise, return whatever we have in cache or a simple offline response
            return caches.match(event.request) || new Response('Network error happened', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});


self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Add a message handler to check for version updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CHECK_VERSION') {
    event.ports[0].postMessage({
      type: 'VERSION',
      version: APP_VERSION
    });
  }
});