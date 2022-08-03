const App = require('../../src/App')
const client = require('axios')
const expect = require('chai').expect

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

    it('returns status 404 when hitting not registered endpoint', () => {

        app.serve()

        return client.get('http://localhost:8001/not-registered')
            .catch(err => {
               return expect(err.response).to.have.property('status',404)
            })
    })
})