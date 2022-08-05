const expect = require('chai').expect
const client = require('axios')

const App = require('../src/App')

describe('App', () => {
    let app
    before(() => {
        app = new App()
    })

    it('can exist', () => {
        expect(app).to.be.ok
    })

    it('has a Server instance', () => {
        expect(app.server).to.be.ok
    })

    describe('serve()', () => {
        afterEach(() => app.stop())

        it('defaults to a port when none is provided', () => {
            app.serve()

            return client.get('http://localhost:8001').catch(({response}) => expect(response.status).to.eq(404))
        })

        it('uses a port when provided', () => {
            app.serve({httpPort: 8002})

            return client.get('http://localhost:8002').catch(({response}) => expect(response.status).to.eq(404))
        })
    })

    describe('load()', () => {
        afterEach(() => app.stop())

        it('throws error when no doubles are provided', () => {
            expect(() => app.load()).to.throw('(load) requires [doubles]')
        })

        it('receives doubles array with one double', () => {
            const doubles = []
            const double = {
                request: {
                    method: 'GET',
                    url: 'http://localhost:8001/some-example'
                },
                response: {
                    status: 200,
                    redirectURL: "",
                    content: {
                        size: 42,
                        hasStuff: true
                    }
                }
            }
            doubles.push(double)

            app.load(doubles)

            expect(app.server.allDoubles[0]).to.deep.equal(double)
        })

        it('throws error if doubles is not an array or object', () => {
            expect(() => app.load('Not an array or object').to.throw('doubles is not an array or object'))
        })

        it('double is available when it is added', () => {
            const double = {
                request: {
                    method: 'GET',
                    url: 'http://localhost:8003/example'
                },
                response: {
                    status: 200
                }
            }

            app.load(double)

            app.serve({httpPort: 8003})

            return client.get('http://localhost:8003/example').then(response => expect(response.status).to.eq(200))

        })

        it('can respond to post requests', () => {
            const double = {
                request: {
                    method: 'POST',
                    url: 'http://localhost:8001/example'
                },
                response: {
                    status: 200
                }
            }

            app.load(double)

            app.serve()

            return client.post('http://localhost:8001/example', { data: "data"}).then(response => expect(response.status).to.eq(200))
        })

    })
})
