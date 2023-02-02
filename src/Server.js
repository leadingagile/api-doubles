const express = require('express')
const app = express()
// const fs = require('fs')
const cors = require('cors')
const path = require('path')

let router

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    const headers = (req) => {
        return {
            Allow: 'GET, OPTIONS, HEAD',
            'Access-Control-Allow-Origin': req.headers.origin || '*',
            'Access-Control-Allow-Headers':
                'Accept, Application-Id, Auth-Token, Content-Type, Origin',
            'Access-Control-Allow-Methods':
                'OPTIONS, GET, HEAD, POST, PUT, DELETE, PATCH',
            'Access-Control-Max-Age': '300',
        };
    };

    res.set(headers(req));
    router(req, res, next)

});

class Server {

    constructor() {
        router = express.Router()
        this.allDoubles = []
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
    }

    serve(config = {}) {
        router = express.Router()
        this.fixturesFolder = config.fixturesFolder || 'test/fixtures'
        this.configureDoublesPath = config.configureDoublesPath || '/'
        this.load(config.doubles || [])
        this.start(config.httpPort)
    }

    start(httpPort = 8001) {

        router.get('/', (_, res) => res.send('Doubles Server'))

        this.configureDoublesWithExpress();

        const configureDoubles = (req, res) => {
            if (!Server.isArrayOfDoubles(req.body) && !Server.isADouble(req.body)) {
                res.status(400)
                res.send('Request body must contain double or list of doubles')
                return
            }
            router = express.Router()
            router.post(this.configureDoublesPath, configureDoubles)
            this.load(req.body)
            this.configureDoublesWithExpress();
            res.status(200)
            res.send(req.body)
        }

        if (this.configureDoublesPath) {
          router.post(this.configureDoublesPath, configureDoubles)
        }

        this.httpServer = app.listen(httpPort,() =>
            console.log("Listening on httpPort " + httpPort)
        )
    }

    configureDoublesWithExpress() {
        function fnSendDataAndStatus(data, status) {
            return (_, res) => {
                res.status(status)
                res.send(data)
            };
        }

        const handleDouble = ({response = {status: 200}, request, attachment}) => {
            let responseStatus = response.status || 200
            let url = request.url
            let responseData = response.data

            if (response.fixture) {
                let fullyResolvedPathToFixture = path.resolve(this.fixturesFolder, response.fixture)
                responseData = require(fullyResolvedPathToFixture)
            }

            if (attachment) {
                router.get(url, (_, res) =>
                    res.download(attachment.pathToFile)
                )
                return
            }

            if (responseStatus === 301 || responseStatus === 302) {
                router.get(url, (_, res) =>
                    res.redirect(responseStatus, response.redirectURL)
                )
                return
            }

            if (request.method === 'POST') {
                router.post(url, fnSendDataAndStatus(responseData, responseStatus))
                return
            }

            router.get(url, fnSendDataAndStatus(responseData, responseStatus))

        }

        this.allDoubles.forEach(handleDouble)

    }

    stop() {
        this.httpServer.close(() => console.info('server closed'))
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
        if (this.isRegistered(uri))
            this.allDoubles = this.allDoubles.filter(double => double.request.url !== uri)
    }

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

    static isADouble(double) {
        if (!double?.request?.url) return false
        return true
    }

    static isArrayOfDoubles(doubles) {
        if (!Array.isArray(doubles)) return false
        return doubles.every(Server.isADouble)
    }
}

module.exports = Server
