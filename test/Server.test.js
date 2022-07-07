const expect = require('chai').expect

class Server {
    start() {

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
})