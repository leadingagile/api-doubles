const client = require("axios");
const expect = require('chai').expect

// The Doubler CLI must be running externally for these tests
// Be sure to `npm run doubles` before running these tests
// Run the external doubler in a separate terminal from the one running the tests

// note the external doubles cli config species a port different from the one used by the
// other tests so there are no collisions

describe('application with external doubler', () => {

    it('returns expected status when hitting registered endpoint', () => {

        const getUrl = 'http://localhost:8010/clientlibs/utils.min.js'

        return client.get(getUrl)
                     .then(response => expect(response).to.have.property('status',200))

    }),

    it('returns expected data from endpoint', () => {
      const postUrl = 'http://localhost:8010/api/day'

      return client.post(postUrl, {data: 'something'})
                   .then(response => {
                      expect(response).to.have.property('status',200)
                      expect(response.data).to.have.property('text', '{"success":true}')
                    })

    }),

    it('returns a file attachment', () => {
      const url = 'http://localhost:8010/files/bundle.js'
      return client.get(url)
                   .then(response => {
                      console.log(response)
                      expect(response).to.have.property('status',200)
                      expect(response.data).to.equal("const foo = 'bar'")
                    })

    })
})
