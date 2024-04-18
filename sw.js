const siteDynamic = "site-dynamic-v1";
const staticCacheName = 'site-static';
const asssets = [
    "/",
    "/index.html",
    "/images/logo-mini.svg",
    "/images/logo.svg",
    "/css/style.css",
    "/vendors/base/vendor.bundle.base.js",
    "/js/off-canvas.js",
    "/js/hoverable-collapse.js",
    "/js/template.js",
    "/vendors/mdi/css/materialdesignicons.min.css",
    "/vendors/base/vendor.bundle.base.css",
    "/js/app.js",
    "/js/chart.js",
    "/js/Chart.min.js",
    "/js/dashboard.js",
    "/js/data-table.js",
    "/js/dataTables.bootstrap4.js",
    "/js/file-upload.js",
    "/js/jquery.cookie.js",
    "/js/jquery.dataTables.js",
    "/js/tabs.js",
    "/vendors/datatables.net-bs4/dataTables.bootstrap4.css",
    "/vendors/datatables.net/jquery.dataTables.js",
    "/vendors/datatables.net-bs4/dataTables.bootstrap4.js",
    "/images/favicon.png",
    "/fallback.html",
];

// cache size limit  
const limitCacheSize = (name, size) => {
    caches.open(name)
    .then(cache => {
        cache.keys()
        .then(keys => {
            if(keys.length > size) 
            {
                cache.delete(keys[0])
                .then(limitCacheSize(name, size))
            }
        })
    })
};



// 1. Install event of the service worker  
self.addEventListener('install', e => {
    // console.log("Service worker has been installed ", e);
    e.waitUntil(caches.open(staticCacheName)
    .then(cache => {
        cache.addAll(asssets);
    })
    .catch(error => {
        let errcode = error.code;
        let errmsg = error.message;
        console.log(errmsg);
        console.log(errcode);
    }));

});

self.addEventListener('activate', e => {
    // console.log("Service worker is activated ", e);//
    e.waitUntil(
        caches.keys()
        .then(keys => {
            // console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== siteDynamic)
                .map(key => caches.delete(key))
            )
        })
    );
});

self.addEventListener('fetch', e => {
    // console.log("Fetch event ", e);

    //1. Respond with cached data
    e.respondWith(
        //2. By checking in our caches if the responds for the specified request
        caches.match(e.request)
        .then(cacheResponse => {
            return cacheResponse || fetch(e.request).then(fetchRespond => {
                return caches.open(siteDynamic).then(cache => {
                    cache.put(e.request.url, fetchRespond.clone());
                    limitCacheSize(siteDynamic, 16)
                    return fetchRespond;
                })
            })
        })
        .catch(() => {
            if(e.request.url.indexOf('.html') > -1)
                return caches.match('/fallback.html');
        })
    )
});