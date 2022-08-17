const expect = require('chai').expect

const App = require('../src/App')

describe('App', () => {
    let app
    before(() => {
        app = new App()
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

        it('throws error if doubles is not an array or object', () => {
            expect(() => app.load('Not an array or object').to.throw('doubles is not an array or object'))
        })

    })
})
