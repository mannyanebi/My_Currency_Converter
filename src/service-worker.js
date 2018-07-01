var cacheName = 'v2';

var cacheFiles = [
    './',
    '/src/css/bootstrap.min.css',
    '/src/js/jquery/3.3.1/jquery.min.js',
    '/src/index.html',
    '/src/js/jquery/3.3.1/jquery.min.js',
    '/src/js/popper.js/1.14.0/umd/popper.min.js',
    '/src/css/4.1.0/js/bootstrap.min.js',
    '/src/js/test.js',
    '/src/js/app.js'
];

self.addEventListener('install', function (event) {
    console.log("[Service Worker] Installed")

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[Service Worker] Caching cacheFiles");
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('activate', function (event) {
    console.log("[Service Worker] Activated")

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (thisCacheName) {
                if (thisCacheName !== cacheName){
                    console.log("[Service Worker] Removing Cached Files from", thisCacheName)
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
})

self.addEventListener('fetch', function (event) {
    console.log("[Service Worker] Fetching", event.request.url)
})