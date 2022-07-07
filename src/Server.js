
class Server {

    constructor() {
        this.allDoubles = []

        this.response = { status: 404 }
    }

    start() {

    }

    request(method, url) {
        // return {status: 404 }
    }

    removeAllDoublesWithUri() {

    }

    isRegistered(uri) {
        return this.allDoubles.includes(uri)
    }

    registerUri(uri) {
        this.allDoubles.push(uri)
    }
}

module.exports = Server