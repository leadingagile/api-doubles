const Doubler = require('@leading-agile/api-doubles')

const doublerConfig = require('./doubler.config')
const client = require("axios");

const expect = require('chai').expect


describe('application', () => {
    let doubler

    beforeEach(() => {
        doubler = new Doubler
        doubler.serve(doublerConfig)
    })

    afterEach(() => {
        doubler.stop()
    })

    it('loads all doubles from config', () => {
        expect(doubler.allDoubles).to.deep.equal(doublerConfig.doubles)
    })

    it('returns expected status when hitting registered endpoint', () => {
        const getUrl = 'http://localhost:8001/ntzlibs/etc.clientlibs/clientlibs/granite/utils.min.js'

        return client.get(getUrl)
            .then(response => expect(response).to.have.property('status',200))

    })
})
