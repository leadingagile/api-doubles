const baseDouble = {
    request: {
        method: 'GET',
        url: 'http://localhost:8001/some-example'
    },
    response: {
        status: 200,
        redirectURL: "",
        content: {
            size: 42,
            hasStuff: true
        }
    }
}

const sameUrl301BaseDouble = {
    request: {
        method: 'GET',
        url: 'http://localhost:8001/some-example'
    },
    response: {
        status: 301,
        redirectURL: "",
        content: {
            size: 42,
            hasStuff: true
        }
    }
}

const postBaseDouble = {
    request: {
        method: 'POST',
        url: '/some-example'
    },
    response: {
        status: 200,
        redirectURL: "",
        content: {
            size: 42,
            hasStuff: true
        },
        data: {
            foo: 'bar'
        }
    }
}

const base301Double = {
    request: {
        method: 'GET',
        url: 'http://localhost:8001/301-example'
    },
    response: {
        status: 301,
        redirectURL: "some-redirect-url",
        content: {
            size: 42,
            hasStuff: true
        }
    }
}

const badUrlDouble = {
    request: {
        method: 'GET',
        url: 'http://localhost:8000/bad-url'
    },
    response: {
        status: 200,
        redirectURL: "",
        content: {
            size: 42,
            hasStuff: true
        }
    }
}

const noRequestDouble = {
    method: 'POST',
    response: {
        status: 301,
        redirectURL: "https://localhost:8081/some-random-redirect",
        content: {
            size: 420,
            hasStuff: true
        }
    }
}

const noRequestUrlDouble = {
    request: {
        method: 'GET',
    },
    response: {
        status: 200,
        content: 'Will never return'
    }
}

module.exports = { baseDouble, postBaseDouble, badUrlDouble, base301Double, sameUrl301BaseDouble, noRequestDouble, noRequestUrlDouble };