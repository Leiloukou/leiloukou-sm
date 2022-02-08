const cacheName = 'v1.0.5';
const assets = [
	'/',
	'/login',
	'/login/',
	'/dashboard',
	'/dashboard/',
	'assets/css/style.css',
	'assets/js/script.js',
	'/assets/img/favicon.ico',
	'/assets/img/favicon.svg',
	'/manifest.json',
	'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
	'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
	'https://fonts.gstatic.com/s/comfortaa/v37/1Ptsg8LJRfWJmhDAuUs4TYFq.woff2',
	'https://fonts.gstatic.com/s/poppins/v19/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2',
	'https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,700&display=swap'
];

self.addEventListener('install', (e) => {
      self.skipWaiting();

      e.waitUntil(
            caches
            .open(cacheName)
            .then((cache) => {
                  console.log('caching shell assets');
                  cache.addAll(assets);
            })
            .catch(() =>
                  caches
                  .open(cacheName)
                  .then((cache) => {
                        console.log('caching shell assets');
                        cache.addAll(assets);
                  })
                  .catch((err) => console.log(err))
            )
      );
});

self.addEventListener('activate', (e) => {
      e.waitUntil(
            caches.keys().then((keys) => {
                  return Promise.all(
                        keys
                        .filter((key) => key !== cacheName && key !== cacheName)
                        .map((key) => caches.delete(key))
                  );
            })
      );
});

self.addEventListener('fetch', (e) => {
      e.respondWith(
            caches
            .match(e.request)
            .then((cacheRes) => {
                  return (
                        cacheRes ||
                        fetch(e.request).then((fetchRes) => {
                              return caches.open(cacheName).then((cache) => {
                                    cache.put(e.request.url, fetchRes.clone());
                                    return fetchRes;
                              });
                        })
                  );
            })
            .catch((err) => {
                  console.log(err);
                  return caches.match('/error');
            })
      );
});