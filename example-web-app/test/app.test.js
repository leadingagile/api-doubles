// import Doubler from '@la-studios/doubler'

const Doubler = require('../../src/App')

const doublerConfig = require('../doubler.config')

const expect = require('chai').expect


describe('application', () => {
    let doubler
    before(() => {
        doubler = new Doubler

    })

    it('loads all doubles from config', () => {
        doubler.serve(doublerConfig)

        // expect(doubler.server.allDoubles).to.deep.equal(doublerConfig.doubles)
    })
})