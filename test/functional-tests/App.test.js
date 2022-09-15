const App = require('../../src/Server')
const client = require('axios')
const {response} = require("express");
const expect = require('chai').expect
const fs =require('fs')
const path = require("path");

const downloadPath = './deleteMeBundle.js'
const LOCALHOST = 'http://localhost:8001'

describe('App',
    () => {
        const app = new App;

        afterEach(() => {
            app.stop()
        })

        it('returns status 200 when hitting registered endpoint', () => {
            const url = '/foo'
            const config = {}
            const simpleDouble = {
                request: {
                    url: url,
                }
            }
            config.doubles = [simpleDouble]

            app.serve(config)
            return client.get(LOCALHOST + url)
                .then(response => expect(response).to.have.property('status', 200))
        })

        it('returns status 200 when hitting registered endpoint and no status included in double', () => {
            const url = '/noStatusInConfig'
            const config = {}
            const simpleDouble = {
                request: {
                    url: url,
                }
            }
            config.doubles = [simpleDouble]

            app.serve(config)

            return client.get(LOCALHOST+ url)
                .then(response => expect(response).to.have.property('status', 200))

        })

        it('returns expected payload for GET', () => {
            const url = '/getPayloadTest'
            const expectedPayload = 'expectedPayload'
            const config = {}
            const simpleDouble = {
                request: {
                    url: url,
                },
                response: {
                    data: expectedPayload,
                }
            }
            config.doubles = [simpleDouble]

            app.serve(config)
            return client.get(LOCALHOST + url)
                .then(response => {
                    expect(response).to.have.property('data', expectedPayload)
                    expect(response).to.have.property('status', 200)
                })

        })

        it('returns expected payload for POST', () => {
            const url = '/postPayloadTest'
            const expectedPayload = 'plainTextPayload'
            const config = {}
            const simpleDouble = {
                request: {
                    method: 'POST',
                    url: url,
                },
                response: {
                    data: expectedPayload,
                }
            }
            config.doubles = [simpleDouble]

            app.serve(config)
            return client.post(LOCALHOST + url)
                .then(response => {
                    expect(response).to.have.property('data', expectedPayload)
                    expect(response.headers['content-type']).to.eq('text/html; charset=utf-8')
                })

        })

        it('can return json in response data', () => {
            const url = '/Json'
            const expectedPayload = {"arbitraryPayload": true}
            const config = {}
            const simpleDouble = {
                request: {
                    url: url,
                },
                response: {
                    data: expectedPayload,
                }
            }
            config.doubles = [simpleDouble]

            app.serve(config)
            return client.get(LOCALHOST + url)
                .then(response => {
                    expect(response.data).to.deep.eq(expectedPayload)
                    expect(response.headers['content-type']).to.eq('application/json; charset=utf-8')
                })
        })

        it('returns status 404 when hitting not registered endpoint', () => {

            app.serve()

            return client.get(LOCALHOST + '/not-registered')
                .catch(err => {
                    return expect(err.response).to.have.property('status', 404)
                })
        })

        //look into using a second localhost as the redirect endpoint
        it('can redirect 301', () => {
            const endPointUrlThatRedirects = '/redirect-from';
            // const redirectDestination = 'http://localhost:8001/redirect-to';
            const double = {
                request: { url: endPointUrlThatRedirects },
                response: {
                    status: 301,
                    redirectURL: 'http://google.com'
                }
            }

            app.load(double)
            app.serve()

            return client.get(LOCALHOST + endPointUrlThatRedirects)
                .then(response => {
                    expect(response.status).to.eq(200)
                    expect(response.request.socket).to.have.property('_host', 'www.google.com')
                })
        })

        it('can redirect 302', () => {
            const endPointUrlThatRedirects = '/redirect-from';
            // const redirectDestination = 'http://localhost:8001/redirect-to';
            const double = {
                request: { url: endPointUrlThatRedirects },
                response: {
                    status: 302,
                    redirectURL: 'http://google.com'
                }
            }

            app.load(double)
            app.serve()

            return client.get(LOCALHOST + endPointUrlThatRedirects)
                .then(response => {
                    expect(response.status).to.eq(200)
                    expect(response.request.socket).to.have.property('_host', 'www.google.com')
                })
        })

        it('can serve a resource file', () => {
            // Make sure it's not already there
            if (fs.existsSync('./deleteMeBundle.js')) {
                fs.unlinkSync('./deleteMeBundle.js')
                console.log('DELETED FILE before')
            }

            const resourceUrl = '/doubles/GetMeBundle.js'
            const pathToResourceFile = './test/resourceFiles/bundle.js';
            const double = {
                request: { url: resourceUrl },
                attachment: { pathToFile: pathToResourceFile },
            }
            app.load(double)
            app.serve()

            const axiosConfig = { responseType: 'stream' }

            return client.get(LOCALHOST + resourceUrl, axiosConfig)
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

        it('defaults to a port when none is provided', () => {
            app.serve()
            return client.get('http://localhost:8001/').then(response => expect(response.status).to.eq(200))
        })

        it('passes http port when provided in config object', () => {
            app.serve({httpPort: 8002})
            return client.get('http://localhost:8002/').then(response => expect(response.status).to.eq(200))
        })

        // it('passes https port when provided in config object', () => {
        //     app.serve({httpsPort: 8003})
        //
        //     return client.get('https://localhost:8003')
        //         .then(response =>
        //             expect(response.status).to.eq(200))
        // })

        it('double is available when it is added', () => {
            const double = {
                request: { url: '/example' }
            }
            app.load(double)

            app.serve({httpPort: 8003})

            return client.get('http://localhost:8003/example').then(response => expect(response.status).to.eq(200))

        })

        it('can respond to post requests', () => {
            let urlToPostTo = '/examplePost'
            let config = {}
            const double = {
                request: {
                    method: 'POST',
                    url: urlToPostTo
                }
            }
            config.doubles = [double]

            app.serve(config)

            return client.post(LOCALHOST + urlToPostTo, {data: "data"}).then(response => expect(response.status).to.eq(200))
        })

        describe('fixtures', () => {

            it('can load data from a fixture', () => {
                const httpPort = 8007
                const urlToEndpointThatLoadsResponseFromFixture = '/FixtureThisBatman'
                const fixtureFileName = 'arbitraryFixture.js'
                let fullyResolvedPathToFixture = path.resolve('./test/fixtures', fixtureFileName)
                let expectedData = require(fullyResolvedPathToFixture)

                const config = {
                    httpPort: httpPort,
                    fixturesFolder: 'test/fixtures',
                    doubles: [
                        {
                            request: { url: urlToEndpointThatLoadsResponseFromFixture },
                            response: { fixture: fixtureFileName }
                        }
                    ]
                }
                app.serve(config)

                return client.get('http://localhost:' + httpPort + urlToEndpointThatLoadsResponseFromFixture)
                    .then(response => {
                        expect(response.status).to.eq(200)
                        expect(response.data).to.deep.eq(expectedData)
                        expect(response.headers['content-type']).to.eq('application/json; charset=utf-8')
                    })
            })

            it('should default to test/fixtures for fixture location', () => {
                const urlToEndpointThatLoadsResponseFromFixture = '/FixtureThisBatmanReturns'
                const fixtureFileName = 'arbitraryFixture.js'
                let fullyResolvedPathToFixture = path.resolve('./test/fixtures', fixtureFileName)
                let expectedData = require(fullyResolvedPathToFixture)

                const config = {
                    doubles: [
                        {
                            request: { url: urlToEndpointThatLoadsResponseFromFixture },
                            response: { fixture: fixtureFileName }
                        }
                    ]
                }
                app.serve(config)

                return client.get(LOCALHOST + urlToEndpointThatLoadsResponseFromFixture)
                    .then(response => {
                        expect(response.status).to.eq(200)
                        expect(response.data).to.deep.eq(expectedData)
                        expect(response.headers['content-type']).to.eq('application/json; charset=utf-8')
                    })
            })
        })

    })