importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/article.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' }
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "pages",
    })
);

workbox.routing.registerRoute(
    /\.(?:png|jpg|webp|svg|gif)$/,
    workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 25,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            }),
        ],
    })
);

workbox.routing.registerRoute(
    ({ url }) => url.origin === "https://fonts.gstatic.com/",
    workbox.strategies.cacheFirst({
        cacheName: "Materialize-icon",
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 25,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    ({ url }) => url.origin === "https://api.football-data.org",
    workbox.strategies.staleWhileRevalidate({
        cacheName: "english-league",
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 30,
            }),
        ],
    })
);

// Event Push
self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});