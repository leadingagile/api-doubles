const expect = require('chai').expect
const App = require('../src/App')

describe('App', () => {
    it('can exist', () => {
        const app = new App()

        expect(app).to.be.ok
    })

    it('has a Server instance', () => {
        const app = new App()

        expect(app.server).to.be.ok
    })
})