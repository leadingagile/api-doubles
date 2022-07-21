const expect = require('chai').expect

const Server = require('../src/Server')

describe('Server', () => {
    let server
    beforeEach(() => {
        server = new Server
    })
    it('can exist', () => {
        expect(server).to.be.ok
    })

    describe('start()', () => {
        it('can be started', () => {
            server.start()

            expect(server).to.be.ok
        })
    })

    describe('request()', () => {
        it('returns with status as 404 when no double is registered with provided url', () => {
            server.request('get', 'http://localhost:8000/bad-url')

            expect(server.response.status).to.eq(404)
        })

        it('returns a response', () => {
            let double = {
                request: {
                    method: 'GET',
                    url: 'http://localhost:8001/some-other-example'
                },
                response: {
                    status: 200,
                    redirectURL: ""
                }
            }

            server.registerDouble(double)

            expect(server.request('GET', 'http://localhost:8001/some-other-example')).to.deep.equal({
                status: 200,
                redirectURL: ""
            })
        })

        it('returns a response with content', () => {
            let double = {
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

            server.registerDouble(double)
            let testDouble = server.request('GET', 'http://localhost:8001/some-example')

            expect(testDouble.hasOwnProperty('content')).to.be.true
        })
    })

    describe('removeAllDoublesWithUri()', () => {
        it('removes all doubles that have the provided uri', () => {
            const uri = 'http://localhost:8000/bad-url'
            const double = {
                request: {
                    method: 'GET',
                    url: 'http://localhost:8000/bad-url'
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

            server.registerDouble(double)
            server.removeAllDoublesWithUri(uri)

            expect(server.isRegistered(uri)).to.be.false
        })
        it('should set message if no valid url is found', () => {
            const uri = 'http://localhost:8000/bad-url'
            const double = {
                request: {
                    method: 'GET',
                    url: 'http://localhost:8000/good-url'
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

            server.registerDouble(double)
            server.removeAllDoublesWithUri(uri)

            expect(server.isRegistered(double.request.url)).to.be.true
            expect(server.getMessage()).to.equal('Invalid uri: Not registered')
        })
        it('removes multiple doubles with the same uri', () => {
            const uri = 'http://localhost:8001/some-example'

            const double1 = {
                request: {
                    method: 'GET',
                    url: uri
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

            const double2 = {
                request: {
                    method: 'POST',
                    url: uri
                },
                response: {
                    status: 301,
                    redirectURL: "https://localhost:8081/some-random-redirect",
                    content: {
                        size: 420,
                        hasStuff: true
                    }
                }
            }

            server.registerDouble(double1)
            server.registerDouble(double2)
            server.removeAllDoublesWithUri(uri)

            expect(server.isRegistered(uri)).to.be.false
        })

        it('only removes double with provided url', () => {
            const someExampleUrl = 'http://localhost:8001/some-example'
            const randomUrl = 'http://localhost:8001/random'

            const removingDouble = {
                request: {
                    method: 'GET',
                    url: someExampleUrl
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

            const keepingDouble = {
                request: {
                    method: 'POST',
                    url: randomUrl
                },
                response: {
                    status: 301,
                    redirectURL: "https://localhost:8081/some-random-redirect",
                    content: {
                        size: 420,
                        hasStuff: true
                    }
                }
            }

            server.registerDouble(removingDouble)
            server.registerDouble(keepingDouble)
            server.removeAllDoublesWithUri(someExampleUrl)

            expect(server.isRegistered(someExampleUrl)).to.be.false
            expect(server.isRegistered(randomUrl)).to.be.true
        })
    })

    describe('registerDouble()', () => {
        it('registers a double', () => {
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

        it('replaces double in allDoubles if double exists', () => {
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
            const replaceDouble = {
                request: {
                    method: 'GET',
                    url: "http://localhost:8001/some-example"
                },
                response: {
                    status: 301,
                    redirectURL: ""
                }
            }

            server.registerDouble(double)
            server.registerDouble(replaceDouble)
            let response = server.request('GET', "http://localhost:8001/some-example")
            expect(server.allDoubles.length).equal(1)
            expect(response.status).equal(301)
        })

        it('does not replace double in allDoubles if method is different', () => {
            const double = {
                request: {
                    method: 'PUT',
                    url: "http://localhost:8001/some-example"
                },
                response: {
                    status: 200,
                    redirectURL: ""
                }
            }
            const newDouble = {
                request: {
                    method: 'GET',
                    url: "http://localhost:8001/some-example"
                },
                response: {
                    status: 301,
                    redirectURL: ""
                }
            }

            server.registerDouble(double)
            server.registerDouble(newDouble)
            let response = server.request('GET', "http://localhost:8001/some-example")
            expect(server.allDoubles.length).equal(2)
            expect(response.status).equal(301)
        })

        it('throws malformed double error if double is missing request', () => {
            const noRequestDouble = {
                method: 'POST',
                response: {
                    status: 301,
                    redirectURL: "https://localhost:8081/some-random-redirect",
                    content: {
                        size: 420,
                        hasStuff: true
                    }
                }
            }

            expect(() => server.registerDouble(noRequestDouble)).to.throw('Double missing request property.')
        })

        it('throws malformed double error if double missing response', () => {
            const noResponseDouble = {
                request: {
                    url: 'some-stuff',
                    method: 'yep'
                },
                hasStuff: 'false'
            }

            expect(() => server.registerDouble(noResponseDouble)).to.throw('Double missing response property.')
        })
    })

    describe('isRegistered()', () => {
        it('returns true if uri is registered', () => {
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
            let uri = "http://localhost:8001/some-example";

            expect(server.isRegistered(uri)).to.be.false
        })
    })
})