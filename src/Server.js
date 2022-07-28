const express = require('express')
const app = express()
const port = 8001

class Server {
    #server
    constructor() {
        this.message = ''
        this.allDoubles = []
        this.response = {status: 404}
    }
    getMessage() {
        return this.message
    }
    start() {
        this.allDoubles.forEach(double => {
            let url = new URL(double.request.url)

            if(double.request.method === 'GET') {
                app.get(url.pathname,(req, res) => {
                    res.send("Hello")
                })
            }

        })
            app.use((req, res) => {
                res.sendStatus(404)
            })

        this.#server = app.listen(port, () => {
            console.log("Listening on port " + port)
        })
    }

    close() {
        this.#server.close()
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
        if (this.isRegistered(uri)){
            this.allDoubles = this.allDoubles.filter(double => double.request.url !== uri)
        }else{
            this.message = 'Invalid uri: Not registered'
        }

    }

    isRegistered(uri) {
        return this.allDoubles.some(double => double.request.url === uri)
    }

    registerDouble(double) {
        if(!double.hasOwnProperty('request')){
            throw new Error('Double missing request property.')
        }
        if(!double.hasOwnProperty('response')){
            throw new Error('Double missing response property.')
        }

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