// import Doubler from '@la-studios/doubler'

const Doubler = require('../../src/App')

const doublerConfig = require('../doubler.config')
const client = require("axios");

const expect = require('chai').expect


describe('application', () => {
    let doubler
    before(() => {
        doubler = new Doubler

    })
    afterEach(() => {
        doubler.stop()
    })

    it('loads all doubles from config', () => {
        doubler.serve(doublerConfig)

        expect(doubler.server.allDoubles).to.deep.equal(doublerConfig.doubles)
    })

    it('returns expected status when hitting registered endpoint', () => {
        const getUrl = 'http://localhost:8001/ntzlibs/etc.clientlibs/clientlibs/granite/utils.min.js'

        doubler.serve(doublerConfig)

        return client.get(getUrl)
            .then(response => expect(response).to.have.property('status',200))

    })
})