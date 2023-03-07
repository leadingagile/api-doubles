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
        this.fixturesFolder = config.fixturesFolder || './test/fixtures'
        this.configureDoublesEndpoint = config.configureDoublesEndpoint ||
                                        config.configureDoublesPath || //accomodating deprecated member: configureDoublesPath
                                        '/'
        this.load(config.doubles || [])
        this.start(process.env['DOUBLES_PORT'] || config.httpPort)
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
            router.post(this.configureDoublesEndpoint, configureDoubles)
            this.load(req.body)
            this.configureDoublesWithExpress();
            res.status(200)
            res.send(req.body)
        }

        if (this.configureDoublesEndpoint) {
          router.post(this.configureDoublesEndpoint, configureDoubles)
        }

        this.httpServer = app.listen(httpPort,() =>
            console.log("Listening on httpPort " + httpPort)
        )
    }

    configureDoublesWithExpress() {
        function fnSendDataAndStatus(data, status) {
            return (req, res) => {
                console.log(`DOUBLER: ${req.method} ${req.url}`)
                res.status(status)
                res.send(data)
            };
        }

        const handleDouble = ({response = {status: 200}, request, attachment}) => {
            let url = request.url
            let responseStatus = response.status || 200
            let responseData = response.data

            if (response.fixture) {
              let fullyResolvedPathToFixture = path.resolve(this.fixturesFolder, response.fixture)
              responseData = require(fullyResolvedPathToFixture)
            }


            const handleGet = () => {
                if (attachment) {
                  router.get(url, (req, res) => {
                    console.log(`DOUBLER: ${req.method} ${req.url}`)
                    res.download(attachment.pathToFile)
                    }
                  )
                  return
                }

                if (responseStatus === 301 || responseStatus === 302) {
                    router.get(url, (req, res) => {
                      console.log(`DOUBLER: ${req.method} ${req.url}`)
                      res.redirect(responseStatus, response.redirectURL)
                      }
                    )
                    return
                }

                router.get(url, fnSendDataAndStatus(responseData, responseStatus))
              }

            const handlePost = () => {
                router.post(url, fnSendDataAndStatus(responseData, responseStatus))
              }

            const handleDelete = () => {
                router.delete(url, fnSendDataAndStatus(responseData, responseStatus))
              }

            const handlePut = () => router.put(url, fnSendDataAndStatus(responseData, responseStatus))

            // TODO: HEAD, PATCH
            const dispatch = {
              "GET": handleGet,
              "POST": handlePost,
              "DELETE": handleDelete,
              "PUT": handlePut,
            }

            const handler = dispatch[request.method] || handleGet
            handler()

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
        }
        else {
          this.registerDouble(doubles)
        }

        console.log('=======Configuration Changed======')
        console.log(doubles)
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
