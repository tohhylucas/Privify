// Simple Service Worker for ReactLynx Privacy Dashboard
const CACHE_NAME = "reactlynx-privacy-dashboard-v2";
const urlsToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./data.js",
  "./react-app.jsx",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});
