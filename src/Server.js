
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
            //         redirectURL: "",
            //         content: {}
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
        let double = this.allDoubles.find( double => double.request.url === url && double.request.method === method)

        if (double === undefined) {
            double = {
                response: {
                    status: 404
                }
            }
        }


        return double
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