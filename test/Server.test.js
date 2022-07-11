const expect = require('chai').expect

const Server = require('../src/Server')

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

        let server
        before(() => {
            server = new Server
            server.start()
        })

        it('returns with status as 404 when no double is registered with provided url', () => {
            server.request('get', 'http://localhost:8000/bad-url')

            expect(server.response.status).to.eq(404)
        })

    })

    describe('removeAllDoublesWithUri()', () => {
        it('removes all doubles that have the provided uri', () => {
            const server = new Server
            server.start()
            const uri = 'http://localhost:8000/bad-url'

            server.removeAllDoublesWithUri(uri)

            expect(server.allDoubles.some(double => double.uri === uri)).to.be.false
        })
    })

    describe('registerUri()', () => {
        it('registers a uri', () => {
            const server = new Server
            const double = {
                request: {
                    method: 'GET',
                    url: "http://localhost:8001/some-example"
                },
                response: {
                    status: 200,
                    redirectURL: ""
                }
            }

            server.registerDouble(double)

            expect(server.allDoubles).contains(double)
        })
    })
    
    describe('isRegistered()', () => {
        it('returns true if uri is registered', () => {
            const server = new Server
            const uri = "http://localhost:8001/some-example"
            const double = {
                request: {
                    method: 'GET',
                    url: uri
                },
                response: {
                    status: 200,
                    redirectURL: ""
                }
            }
            server.registerDouble(double)

            expect(server.isRegistered(uri)).to.be.true
        })

        it('returns false if uri is not registered', () => {
            const server = new Server
            let uri = "http://localhost:8001/some-example";

            expect(server.isRegistered(uri)).to.be.false
        })
    })

})