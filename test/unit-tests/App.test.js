const expect = require('chai').expect

const App = require('../../src/Server')

describe('App', () => {
    let app
    before(() => {
        app = new App()
    })

    describe('load()', () => {

        it('throws error when no doubles are provided', () => {
            expect(() => app.load()).to.throw('(load) requires [doubles]')
        })

        it('throws error if doubles is not an array or object', () => {
            expect(() => app.load('Not an array or object').to.throw('doubles is not an array or object'))
        })

    })
})
