var currentVersion=5;

self.addEventListener('install', function(event) {
  console.log('hello world! sw.js in installing.');
  event.waitUntil(Promise.resolve);
});


self.addEventListener('activate', function(event) {
  clients.claim();
  console.log('sw.js is ctivating');

});

self.addEventListener("message", function(e) {
  // e.source is a client object
  debugger;
  console.log("Hello! Your message was: " + e.data);
});
