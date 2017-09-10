Basic structure of  Progressive application.
    (developers.google ).

1.   Service worker.  https://developers.google.com/web/fundamentals/getting-started/primers/service-workers

- It's a JavaScript Worker, so it can't access the DOM directly. Instead, a service worker can communicate with the pages it controls by responding to messages sent via the postMessage (https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage) interface, and those pages can manipulate the DOM if needed.

- Service worker is a programmable network proxy, allowing you to control how network requests from your page are handled.
It's terminated when not in use, and restarted when it's next needed, so you cannot rely on global state within a service worker's onfetch and onmessage handlers. If there is information that you need to persist and reuse across restarts, service workers do have access to the IndexedDB API.
https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

- Service workers make extensive use of promises, so if you're new to promises, then you should stop reading this and check out Promises, an introduction.
 https://developers.google.com/web/fundamentals/getting-started/primers/promises

2.   Fetch API.    (???)   ES7  AJAX-replacement API

3. https://developers.google.com/web/fundamentals/performance/http2/

 High Performsnce Browser Networking. https://hpbn.co/  
Performance is a feature. This book provides a hands-on overview of what every web developer needs to know about the various types of networks (WiFi, 3G/4G), transport protocols (UDP, TCP, and TLS), application protocols (HTTP/1.1, HTTP/2), and APIs available in the browser (XHR, WebSocket, WebRTC, and more) to deliver the best—fast, reliable, and resilient—user experience.
