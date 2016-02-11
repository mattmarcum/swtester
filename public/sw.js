var currentVersion=5;

self.addEventListener('install', function(event) {
  console.log('hello world! INSTALL');
  event.waitUntil(Promise.resolve);
});


self.addEventListener('activate', function(event) {
  clients.claim();
  console.log('hello world! Activate');

});

self.addEventListener("message", function(e) {
  // e.source is a client object
  debugger;
  console.log("Hello! Your message was: " + e.data);
});

self.addEventListener('install', function(event) {
  // pre cache a load of stuff:
  event.waitUntil(
    caches.open('swtester-v-'+currentVersion).then(function(cache) {
      return cache.addAll([
        '/',
        '/sw-register.js',
        '/sw.gif'
      ]);
    })
  )
});

self.addEventListener('fetch', function(event) {
  var reqUrl = event.request.url;
  var response;

  console.log('got fetch req for:'+reqUrl);

  event.respondWith(caches.match(event.request)
  .then(function(response) {

    if(!response) throw new Error('not found');

    console.log('got cache hit for req for:' + reqUrl);

    //update cache
    caches.open('swtester-v-' + currentVersion)
    .then(function(cache) {

      console.log('updating file:', reqUrl);

      fetch(event.request).then(function(response) {

        cache.put(event.request, response);

      }).catch(function(err) {

        console.log('eror fetching:', reqUrl, err)

      });
    });

    //return cached version immediately
    return response.clone();

  })
  .catch(function() {
    return fetch(event.request.clone())
    .then(function(response) {

      console.log('saving new file:', reqUrl);

      caches.open('swtester-v-'+currentVersion).then(function(cache) {
        cache.put(event.request, response);
      });

      return response.clone();
    })
    .catch(function(err) {
      console.log('eror fetching:', reqUrl, err)
    });
  }));
});
