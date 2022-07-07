const expect = require('chai').expect

class Server {
    start() {

    }

    request(method, url) {
        return {status: 404 }
    }
}

describe('Server', () => {
    it('can exist', () => {
        const server = new Server

        expect(server).to.be.ok
    })

    describe('start()', () => {
        it('can be started', () => {
            const server = new Server

            server.start()

            expect(server).to.be.ok
        })
    })

    describe('request()', () => {
        it('returns 404 with non-existent url', () => {
            const server = new Server

            server.start()

            const response = server.request('GET', 'http://localhost:8000/bad-url')
            const status = response.status

            expect(status).to.eq(404)

            
        })
    })
})