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

    describe('run()', () => {
        it('receives path to config file with one double', () => {
            const app = new App()
            const configFile = {
                doubles: [
                    {
                        request: {
                            method: 'GET',
                            url: 'http://localhost:8001/some-other-example'
                        },
                        response: {
                            status: 200,
                            redirectURL: ""
                        }
                    }
                ]
            }

            app.run(configFile)

            expect(app.server.allDoubles.length).to.equal(1)
        })
    })


})