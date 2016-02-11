var currentVersion=2;

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
