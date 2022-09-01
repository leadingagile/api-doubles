const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors');

app.use(cors())

class Server {

    constructor() {
        this.message = ''
        this.allDoubles = []
        this.response = {status: 404}
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
    }

    getMessage() {
        return this.message
    }

    serve(config = {}) {
        this.load(config.doubles || [])
        //process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        //dirty hack we need a certificate
        // this.start(config.httpPort, config.httpsPort)
        this.start(config.httpPort)
    }

    // start(httpPort = 8001, httpsPort = 8010) {
    //     app.get('/', (req, res) => {
    //         res.send('Server started without any config')
    //     })

    start(httpPort = 8001) {
        app.get('/', (req, res) => {
            res.send('Server started without any config')
        })

        this.allDoubles.forEach(double => {
            let url = new URL(double.request.url)
            let data = double.response.data

            if (double.attachment !== undefined) {
                app.get(url.pathname, (req, res) => {
                    res.download(double.attachment.pathToFile)
                })
            } else {
                if (double.request.method === 'GET') {
                    app.get(url.pathname, (req, res) => {
                        if (double.response.status === 301) {
                            res.redirect(301, double.response.redirectURL)
                        } else {
                            res.status(double.response.status)
                            res.send(data)
                        }
                    })
                }

                if (double.request.method === 'POST') {
                    app.post(url.pathname, (req, res) => {
                        res.status(double.response.status)
                        res.send(data)
                    })
                }
            }
        })

        this.httpServer = app.listen(httpPort, () => {
            console.log("Listening on httpPort " + httpPort)
        })

        // const options = {
        //     key: fs.readFileSync('./rootCA.key'),
        //     cert: fs.readFileSync('./rootCA.pem'),
        // }
        // this.httpsServer = https.createServer(options, app)
        // this.httpsServer.listen(httpsPort, () => {
        //     console.log("Listening on httpsPort " + httpsPort)
        // })
    }

    stop() {
        this.close()
    }

    close() {
        this.httpServer.close((err) => {
            console.log('server closed')
        })

        // this.httpsServer.close((err) => {
        //     console.log('server closed')
        // })
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
        if (this.isRegistered(uri)) {
            this.allDoubles = this.allDoubles.filter(double => double.request.url !== uri)
        } else {
            this.message = 'Invalid uri: Not registered'
        }
    }

    isRegistered(uri) {
        return this.allDoubles.some(double => double.request.url === uri)
    }

    load(doubles) {
        if (!doubles) throw Error('(load) requires [doubles]')

        if (!Array.isArray(doubles) && typeof doubles !== 'object') throw Error('doubles is not an array or object')

        if (Array.isArray(doubles)) {
            doubles.forEach(double => {
                this.registerDouble(double)
            })

            return
        }

        this.registerDouble(doubles)
    }

    registerDouble(double) {
        if (!double.hasOwnProperty('request')) {
            throw new Error('Double missing request property.')
        }
        if (!double.hasOwnProperty('response')) {
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