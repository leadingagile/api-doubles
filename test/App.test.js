const expect = require('chai').expect
const App = require('../src/App')
const { missingDoubleConfig, doubleNotArrayConfig } = require('../test/badDoubler.config')

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

        it('throws malformed config error if config is missing doubles',() =>{
            const app = new App()

            expect(() => app.run(missingDoubleConfig)).to.throw('Config file missing doubles')
        })

        it('throws config error if doubles not an array', () => {
            const app = new App()

            expect(() => app.run(doubleNotArrayConfig)).to.throw('doubles is not an array')
        })

        // it('throws config error if double does not have request property', () => {
        //     const app = new App()
        //     let config =  {
        //         port: 404,
        //         doubles: [{
        //             url: 'http://some-url.com',
        //             method: 'GET',
        //             response: {
        //
        //             }
        //         }
        //         ]
        //     }
        //
        //     expect(() => app.run)
        // })
    })


})