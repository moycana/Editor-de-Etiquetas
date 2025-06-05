const CACHE_NAME = "meu-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/favicon.ico",
  "clientes.json",
  "html2canvas.min.js",
  "jspdf.umd.min.js",
  "pdfobject.min.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
