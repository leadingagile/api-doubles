const getDouble = {
    "request": {
        "method": "GET",
        "url": "/clientlibs/utils.min.js",
        "httpVersion": "HTTP/1.1"
    },
    "response": {
        "status": 200,
        "statusText": "OK",
        "data": {
          "mimeType": "application/x-javascript",
          "text": "(function(b){})"
        }
    }
}

const getRedirectDouble = {
    "request": {
        "method": "GET",
        "url": "/v1.0/endpoint/default/authorize",
    },
    "response": {
        "status": 302,
        "statusText": "",
        "redirectURL": "/v2.0/endpoint/default/authorize",
    }
}

const postDouble = {
    "request": {
        "method": "POST",
        "url": "/api/day",
    },
    "response": {
        "status": 200,
        "statusText": "",
        "data": {
            "size": 16,
            "mimeType": "application/json",
            "text": "{\"success\":true}"
        }
    }
}

const staticFileDouble = {
    request: {
        method: 'GET',
        url: '/files/bundle.js'
    },
    attachment : {pathToFile : './test/bundle.js'},
    response:{
        status: 200
    }
}

module.exports = {
    httpPort: 8001,
    doubles: [
        getDouble,
        postDouble,
        getRedirectDouble,
        staticFileDouble
    ]
}
