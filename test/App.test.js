const expect = require('chai').expect
const client = require('axios')

const App = require('../src/App')
const {missingDoubleConfig, doubleNotArrayConfig, oneDoubleConfig} = require('./doubler.config')

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

        it('defaults to a port when none is provided', () => {
            app.serve()

            return client.get('http://localhost:8001').catch(({response}) => expect(response.status).to.eq(404))
        })
    })

    describe('load()', () => {
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

        it('throws error if doubles is not an array', () => {
            expect(() => app.load('Not an array').to.throw('doubles is not an array'))
        })
    })
})
