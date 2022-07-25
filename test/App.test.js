const expect = require('chai').expect

const App = require('../src/App')
const {missingDoubleConfig, doubleNotArrayConfig, oneDoubleConfig} = require('./doubler.config')

describe('App', () => {
    const app = new App()

    it('can exist', () => {
        expect(app).to.be.ok
    })

    it('has a Server instance', () => {
        expect(app.server).to.be.ok
    })

    describe('run()', () => {

    })

    describe('load()', () => {
        it('receives config file with one double', () => {
            app.load(oneDoubleConfig)

            expect(app.server.allDoubles.length).to.equal(1)
        })
        it('throws malformed config error if config is missing doubles', () => {
            expect(() => app.load(missingDoubleConfig)).to.throw('Config file missing doubles')
        })

        it('throws config error if doubles not an array', () => {
            expect(() => app.load(doubleNotArrayConfig)).to.throw('doubles is not an array')
        })
    })
})
