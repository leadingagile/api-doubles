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
        const getUrl = 'http://localhost:8001/clientlibs/utils.min.js'

        return client.get(getUrl)
            .then(response => expect(response).to.have.property('status',200))

    }),

    it('returns expected data from endpoint', () => {
      const postUrl = 'http://localhost:8001/api/day'

      return client.post(postUrl, {data: 'something'})
                   .then(response => {
                      expect(response).to.have.property('status',200)
                      expect(response.data).to.have.property('text', '{"success":true}')
                    })

    }),

    it('returns a file attachment', () => {
      const url = 'http://localhost:8001/files/bundle.js'
      return client.get(url)
                   .then(response => {
                      expect(response).to.have.property('status',200)
                      expect(response.data).to.equal("const foo = 'bar'")
                    })

    })

})
