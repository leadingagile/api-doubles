const App = require('../../src/App')
const client = require('axios')
const expect = require('chai').expect

const { oneDoubleConfig } = require('../doubler.config')
describe('App', () => {
    const app = new App;
    it   ('returns status 200 when hitting registered endpoint', () => {
        const url = 'http://localhost:8001/some-other-example'
        app.run(oneDoubleConfig)

        return client.get('http://localhost:8001/some-other-example')
            .then(response => expect(response).to.have.property('status',200))

    })
})