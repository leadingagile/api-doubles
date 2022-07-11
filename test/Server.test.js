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

        // This, on the other hand (other than below), is true when no double with this url has been registed
        it('returns with status as 404 when no double is registered with provided url', () => {
            server.request('get', 'http://localhost:8000/bad-url')
            //const status = response.status // why not just pass response.status to expect? What is value of this?

            expect(server.response.status).to.eq(404)
        })

        /*
        // Remember, what this is refering to is IF / WHEN a "double" has been registered.
        // it('returns 200 with valid url', () => {
        it('returns with status as 200 when Double is registered and status is set to 200 and url matches provided url', () =>
                const response = server.request('GET','http://localhost:8001/')

                expect(response.status).to.eq(200)
                // has no expect been written yet? that all?
                // We are discussing the project's direction. Have two different understandings

                // Word.
            })
        }
        */
    })


    describe('removeAllDoublesWithUri()', () => {
        it('removes all doubles that have the provided uri', () => {
            const server = new Server
            server.start()
            const uri = 'http://localhost:8000/bad-url'

            server.removeAllDoublesWithUri(uri)

            // of all the doubles that the server has, none of them should have the uri that is provided
            expect(server.allDoubles.some(double => double.uri === uri)).to.be.false
        })
    })

    describe('registerUri()', () => {
        it('registers a uri', () => {
            const server = new Server
            let uri = "http://localhost:8001/some-example";

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

            expect(server.allDoubles).contains(double)
        })
    })
    describe('isRegistered()', () => {
        it('returns true if uri is registered', () => {
            const server = new Server
            let uri = "http://localhost:8001/some-example";
            server.registerDouble(uri)

            expect(server.isRegistered(uri)).to.be.true
        })

        it('returns false if uri is not registered', () => {
            const server = new Server
            let uri = "http://localhost:8001/some-example";

            expect(server.isRegistered(uri)).to.be.false
        })
    })

})