
class Server {

    constructor() {
        this.allDoubles = [
            // {
            //     request: {
            //         method: 'GET',
            //         url: 'http://localhost:8001/some-example'
            //     },
            //     response: {
            //         status: 200,
            //         redirectURL: ""
            //     }
            // },
        ]

        this.response = { status: 404 }
    }

    start() {

    }

    request(method, url) {
        // return {status: 404, method: 'get', locat }
        // if(true){
        //     return double.response
        // } else {
        //     return generate404response()
        // }

    }

    removeAllDoublesWithUri() {

    }

    isRegistered(uri) {
        return  this.allDoubles.some(double => double.request.url === uri)
    }

    registerDouble(double) {
        this.allDoubles.push(double)
    }
}

module.exports = Server