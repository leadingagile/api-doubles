const App = require('../../src/App')
const client = require('axios')
const {response} = require("express");
const expect = require('chai').expect
const fs =require('fs')

const downloadPath = './deleteMeBundle.js'

describe('App', () => {
    const app = new App;

    afterEach(() => {
        app.stop()
    })

    it('returns status 200 when hitting registered endpoint', () => {
        const url = 'http://localhost:8001/'
        const config = {}
        const simpleDouble = {
            request: {
                method: 'GET',
                url: url,
            },
            response: {
                status: 200,
            }
        }
        config.doubles = [simpleDouble]

        app.serve(config)

        return client.get(url)
            .then(response => expect(response).to.have.property('status',200))

    })

    it('returns expected payload for GET', () => {
        const url = 'http://localhost:8001/getPayloadTest'
        const expectedPayload = 'expectedPayload'
        const config = {}
        const simpleDouble = {
            request: {
                method: 'GET',
                url: url,
            },
            response: {
                status: 200,
                data: expectedPayload,
            }
        }
        config.doubles = [simpleDouble]

        app.serve(config)
        return client.get(url)
            .then(response => {
                expect(response).to.have.property('data',expectedPayload)
            })

    })

    it('returns expected payload for POST', () => {
        const url = 'http://localhost:8001/postPayloadTest'
        const expectedPayload = 'expectedPayload'
        const config = {}
        const simpleDouble = {
            request: {
                method: 'POST',
                url: url,
            },
            response: {
                status: 200,
                data: expectedPayload,
            }
        }
        config.doubles = [simpleDouble]

        app.serve(config)
        return client.post(url)
            .then(response => {
                expect(response).to.have.property('data',expectedPayload)
            })

    })

    it('returns expected json payload', () => {
        const url = 'http://localhost:8001/Json'
        const expectedPayload = {"success": true}
        const config = {}
        const simpleDouble = {
            request: {
                method: 'POST',
                url: url,
            },
            response: {
                status: 200,
                data: expectedPayload,
            }
        }
        config.doubles = [simpleDouble]

        app.serve(config)
        return client.post(url)
            .then(response => {
                //console.log(response.headers['content-type'])
                expect(response.data).to.deep.eq(expectedPayload)
            })
    })

    it('returns status 404 when hitting not registered endpoint', () => {

        app.serve()

        return client.get('http://localhost:8001/not-registered')
            .catch(err => {
               return expect(err.response).to.have.property('status',404)
            })
    })

    it('selects correct double', () => {
        const config = {}
        const simpleDoubleGet1 = {
            request: {
                method: 'GET',
                url: 'http://localhost:8001/simpleDoubleGet1',
            },
            response: {
                status: 200,
                data: 'simpleDouble1Payload',
            }
        }
        const simpleDoubleGet2 = {
            request: {
                method: 'GET',
                url: 'http://localhost:8001/simpleDoubleGet2',
            },
            response: {
                status: 200,
                data: 'simpleDouble2Payload',
            }
        }
        config.doubles = [simpleDoubleGet1, simpleDoubleGet2]

        app.serve(config)

        return client.get('http://localhost:8001/simpleDoubleGet2')
            .then(response => {
                expect(response).to.have.property('data','simpleDouble2Payload')
            })

    })

    //look into using a second localhost as the redirect endpoint
    it('can redirect', ()=>{
        const endPointUrlThatRedirects = 'http://localhost:8001/redirect-from';
        // const redirectDestination = 'http://localhost:8001/redirect-to';
        const double = {
            request: {
                method: 'GET',
                url: endPointUrlThatRedirects
            },
            response: {
                status: 301,
                redirectURL : 'http://google.com'
            }
        }

        app.load(double)
        app.serve()

        return client.get(endPointUrlThatRedirects)
            .then(response => {
                //console.log(response.request.socket._host)
                //console.log(response)
                expect(response.status).to.eq(200)
                expect(response.request.socket).to.have.property('_host','www.google.com')})
    })

    it('can serve a resource file', ()=>{
        // Make sure it's not already there
        if (fs.existsSync('./deleteMeBundle.js')) {
            fs.unlinkSync('./deleteMeBundle.js')
            console.log('DELETED FILE before')
        }

        const resourceUrl =  'http://localhost:8001/doubles/GetMeBundle.js'
        const pathToResourceFile = './test/resourceFiles/bundle.js';
        const double = {
            request: {
                method: 'GET',
                url: resourceUrl
            },
            attachment : {pathToFile : pathToResourceFile},
            response:{
                status: 200
            }
        }
        app.load(double)
        app.serve()

        const axiosConfig = {
            responseType: 'stream'
        }

        return client.get(resourceUrl, axiosConfig)
           .then(response => {
               const downloadFile = 'deleteMeBundle.js';
               let stream = fs.createWriteStream(downloadFile)
               stream.once("finish", () => {
                   expect(response.headers['content-type']).to.eq('application/javascript; charset=UTF-8')
                   expect(response.status).to.eq(200)

                   expect(fs.existsSync(downloadFile)).to.be.true

                   const bundleJs = fs.readFileSync(pathToResourceFile).toString()
                   const deleteMeBundleJs = fs.readFileSync(downloadFile).toString()

                   expect(bundleJs).to.eq(deleteMeBundleJs)

                   fs.unlinkSync(downloadFile)
               })
               response.data.pipe(stream)

            })

    })
})