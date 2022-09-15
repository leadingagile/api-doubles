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

const noResponseDouble = {
    request: {
        url: 'some-stuff',
        method: 'yep'
    },
    hasStuff: 'false'
}

module.exports = { baseDouble, postBaseDouble, badUrlDouble, base301Double, sameUrl301BaseDouble, noRequestDouble, noResponseDouble };