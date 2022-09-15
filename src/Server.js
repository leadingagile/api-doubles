const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
const path = require('path')

app.use(cors())

class Server {

    constructor() {
        this.allDoubles = []
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
    }

    serve(config = {}) {
        this.fixturesFolder = config.fixturesFolder || 'test/fixtures'
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

        //request to root
        app.get('/', (req, res) =>
            res.send('Doubles Server')
        )

        this.registerDoublesWithExpress();

        this.httpServer = app.listen(httpPort,() =>
            console.log("Listening on httpPort " + httpPort)
        )

        // const options = {
        //     key: fs.readFileSync('./rootCA.key'),
        //     cert: fs.readFileSync('./rootCA.pem'),
        // }
        // this.httpsServer = https.createServer(options, app)
        // this.httpsServer.listen(httpsPort, () => {
        //     console.log("Listening on httpsPort " + httpsPort)
        // })
    }

    registerDoublesWithExpress() {
        function fnSendDataAndStatus(data, status) {
            //let data = (double.response.data === undefined) ? {} : double.response.data
            return (req, res) => {
                res.status(status)
                res.send(data)
            };
        }

        this.allDoubles.forEach(({response = {status: 200}, request, attachment}) => {
            let responseStatus = response.status || 200
            let url = request.url
            let responseData = response.data

            if (response.fixture) { //overide the data response with the contents of the named fixture
                let fullyResolvedPathToFixture = path.resolve(this.fixturesFolder, response.fixture)
                responseData = require(fullyResolvedPathToFixture)
            }

            if (attachment) {
                app.get(url, (req, res) =>
                    res.download(attachment.pathToFile)
                )
                return //continue
            }

            if (responseStatus === 301 || responseStatus === 302) { //only works with GET
                app.get(url, (req, res) =>
                    res.redirect(responseStatus, response.redirectURL)
                )
                return //continue
            }

            if (request.method === 'POST') {
                app.post(url, fnSendDataAndStatus(responseData, responseStatus))
                return //continue
            }

            //request.method === GET
            app.get(url, fnSendDataAndStatus(responseData, responseStatus))

        })
    }

    stop() {
        this.httpServer.close((err) =>
            console.log('server closed')
        )
    }

    //remove me
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

    //remove me
    removeAllDoublesWithUri(uri) {
        if (this.isRegistered(uri))
            this.allDoubles = this.allDoubles.filter(double => double.request.url !== uri)
    }

    //remove me
    isRegistered(uri) {
        return this.allDoubles.some(double => double.request.url === uri)
    }

    load(doubles) {
        if (!doubles) throw Error('(load) requires [doubles]')

        if (Array.isArray(doubles)) {
            doubles.forEach(double => this.registerDouble(double))
            return
        }

        this.registerDouble(doubles)
    }

    registerDouble(double) {
        if (!double.hasOwnProperty('request')) throw new Error('Double missing request property.')

        if (this.isRegistered(double.request.url)) {
            this.allDoubles = this.allDoubles.filter(exclusion => {
                let isUrlEqual = exclusion.request.url === double.request.url
                let isMethodEqual = exclusion.request.method === double.request.method

                return !(isUrlEqual && isMethodEqual)
            })
        }

        this.allDoubles.push(double)
    }
}

module.exports = Server