// import Doubler from '@la-studios/doubler'
// import Doubler from '../src/doubler'
// import doublerConfig from '../doubler.config'

const Doubler = require('../../src/App')
//Should doubler config be import by default in app instead of importing here?
const doublerConfig = require('../doubler.config')

const expect = require('chai').expect

describe('application', () => {
    let doubler
    before(() => {
        doubler = new Doubler

    })

    it('loads all doubles from config', () => {
        doubler.run(doublerConfig)

        expect(doubler.server.allDoubles).to.deep.equal(doublerConfig.doubles)
    })
})