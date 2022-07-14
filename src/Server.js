class Server {

    constructor() {
        this.allDoubles = []
        this.response = {status: 404}
    }

    start() {
    }

    request(method, url) {
        let double = this.allDoubles.find(double => double.request.url === url && double.request.method === method)
        if (double === undefined) {
            double = {
                response: {
                    status: 404
                }
            }
        }

        this.response = double.response
        return double.response
    }

    removeAllDoublesWithUri(uri) {
        this.allDoubles = this.allDoubles.filter(double => double.request.url !== uri)
    }

    isRegistered(uri) {
        return this.allDoubles.some(double => double.request.url === uri)
    }

    registerDouble(double) {
        if (this.isRegistered(double.request.url)) {
            this.allDoubles = this.allDoubles.filter(exclusion => {
                let isUrlEqual = exclusion.request.url === double.request.url
                let isMethodEqual = exclusion.request.method === double.request.method

                return isUrlEqual && isMethodEqual ? false : true
            })
        }

        this.allDoubles.push(double)
    }
}

module.exports = Server