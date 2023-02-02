const client = require("axios");
const expect = require('chai').expect

// The Doubler CLI must be running externally for these tests
// Be sure to `npm run doubles` before running these tests
// Run the external doubler in a separate terminal from the one running the tests

// note the external doubles cli config species a port different from the one used by the
// other tests so there are no collisions

describe('application with external doubler', () => {

    it('returns expected status when hitting registered endpoint', () => {

        const getUrl = 'http://localhost:8010/ntzlibs/etc.clientlibs/clientlibs/granite/utils.min.js'

        return client.get(getUrl)
            .then(response => expect(response).to.have.property('status',200))

    })
})
