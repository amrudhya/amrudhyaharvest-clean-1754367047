// Service Worker for AmrudhyaHarvest
// Version 1.0 - Performance optimized caching strategy

const CACHE_NAME = 'amrudhya-harvest-v1.0';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/about.html',
    '/products.html',
    '/resources.html',
    '/assets/css/style.css',
    '/assets/js/script.js',
    '/assets/images/logo.svg',
    '/assets/images/favicon.svg',
    '/manifest.json'
];

// Local assets are now included in STATIC_ASSETS - no external dependencies needed
const LOCAL_FONT_ASSETS = [
    '/assets/fonts/fonts.css',
    '/assets/fonts/inter-400.ttf',
    '/assets/fonts/inter-500.ttf',
    '/assets/fonts/inter-600.ttf',
    '/assets/icons/font-awesome.min.css',
    '/assets/icons/webfonts/fa-brands-400.woff2',
    '/assets/icons/webfonts/fa-regular-400.woff2',
    '/assets/icons/webfonts/fa-solid-900.woff2'
];

// Install event - cache static assets including local fonts
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([...STATIC_ASSETS, ...LOCAL_FONT_ASSETS]);
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests (only allow same-origin and Formspree for form submissions)
    if (!event.request.url.startsWith(self.location.origin) && 
        !event.request.url.startsWith('https://formspree.io')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).then((response) => {
                // Don't cache if not a valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // Cache successful responses
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            }).catch(() => {
                // Return offline page for HTML requests
                if (event.request.mode === 'navigate') {
                    return caches.match('/offline.html');
                }
            });
        })
    );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'form-submission') {
        event.waitUntil(sendPendingForms());
    }
});

async function sendPendingForms() {
    // Implementation for offline form submissions
    const pendingForms = await getPendingForms();
    for (const formData of pendingForms) {
        try {
            await fetch(formData.url, {
                method: 'POST',
                body: formData.data,
                headers: formData.headers
            });
            await removePendingForm(formData.id);
        } catch (error) {
            console.log('Form submission failed, will retry later');
        }
    }
}

async function getPendingForms() {
    // Get pending forms from IndexedDB
    return [];
}

async function removePendingForm(id) {
    // Remove form from IndexedDB
}