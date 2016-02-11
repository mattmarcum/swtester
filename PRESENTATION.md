# History
Html5 app cache was horrible.  Service workers are filling the need for allowing web application to be truly 'offline first' applications.  Service Workers are built upon native primitives like `web workers` and 'promises' to allow app developers to control the process of bootstrapping a web application, even in an offline environment.  This includes the ability to control network events and cache assets.

## Tha Bestest: https://github.com/slightlyoff/ServiceWorker/blob/master/explainer.md

# Links
- https://slightlyoff.github.io/ServiceWorker/spec/service_worker/
- https://github.com/slightlyoff/ServiceWorker/blob/master/explainer.md
- https://github.com/slightlyoff/ServiceWorker
- https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- https://jakearchibald.github.io/isserviceworkerready/
- http://caniuse.com/#feat=serviceworkers
- http://caniuse.com/#feat=fetch

#The Big Picture

## Pre-Kickoff
There are libraries out there that automate this process but we'll go through this manually.

First off `https` all the things.  Service workers will only load over http on localhost for dev'ing.

Also self !== this - wtf?

## Ready, Go
The main document registers a service worker with a scope.  A scope determines which documents the service worker is responsible for.  A website can have multiple service workers each responsible for different documents.  The service worker, downloads, installs and then is activated.  When a document is refreshed the service worker is re-downloaded and checked to see if it has changed.  If so the new service worker will go through the same process, but it is doing it in the background.  The old service worker will still be running until the new one has activated.  This can cause weirdness, especially when you have two versions of the site opened in two different tabs.

A service worker is event driven.   Some of the events are of type `ExtendableEvent` that can await promise resolution before the event completes via a `waitUntil` method that accepts a promise.  It takes a promise not a callback - so be careful - I caused all types of weirdness by passing a function.

In chrome dev tools you can go to the resources tab and manually inspect/delete service workers if you get in trouble.

- navigator.serviceWorker
-- registrations
-- controller
--- state
--- pushMessage

- ServiceWorkerRegistration
-- scope

- ServiceWorker
-- install
-- activate
--- clients.claim
-- event.watiUntil => promise
-- importScripts

Caches
Fetch
Sync


# Demos of basic plain js implementation

## Note SW is a work-in-progress - *Expect Bugs*
- https://code.google.com/p/chromium/issues/detail?id=541797


## Demo 1 - asset caching
- setup sw to cache assets
- shutoff server
- reload page, everything loads fine

## Demo 2 - prefetching
- set up sw to prefetch assets for page2
- watch sw fetch assets for page2 in bg on page1
- navigate to page2 and assets are already loaded!

## Demo 3 - api call interception
- set up sw to intercept network requests
- user initiates nw req
-- sw console logs intercept
-- sw initiates nw req and caches result
-- sw returns now-cached result
- shut off server
- user initiates nw req
-- sw intercepts and console logs it
-- nw req fails so sw responds with cached req
- user reloads page and initiates nw req
-- ever just works(tm)

# Automated Builds
- Broccoli (ember) https://github.com/markdalgleish/serviceworker-loader
- npm https://github.com/GoogleChrome/sw-precache
- webpack https://github.com/markdalgleish/serviceworker-loader

# Libs
sw-tools us used by broccoli and the gc npm pkg
- https://github.com/GoogleChrome/sw-toolbox

Conveniece methods for intercepting network request and setting up pre-cached assets.

# Final Demo
EmberJs demo of all the previous features.
