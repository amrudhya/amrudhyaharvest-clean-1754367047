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

const EXTERNAL_ASSETS = [
    'https://fonts.googleapis.com/css2?family=General+Sans:wght@400;500;600&display=swap',
    'https://fonts.gstatic.com/s/generalsans/v1/11JnAqM3Vu5ltsQFWyWWWgDZFOl-T-iqlKIqKI5n9v6QXLaQSatZvNtm55NU14fFSQ.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(CACHE_NAME).then((cache) => {
                return cache.addAll(STATIC_ASSETS);
            }),
            caches.open(CACHE_NAME + '-external').then((cache) => {
                return cache.addAll(EXTERNAL_ASSETS.map(url => new Request(url, {
                    mode: 'cors',
                    credentials: 'omit'
                })));
            })
        ])
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== CACHE_NAME + '-external') {
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
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin) && 
        !event.request.url.startsWith('https://fonts.googleapis.com') &&
        !event.request.url.startsWith('https://fonts.gstatic.com') &&
        !event.request.url.startsWith('https://cdnjs.cloudflare.com')) {
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