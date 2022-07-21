const chai = require('chai')
const App = require('../src/App')

Given('a config file', function () {
    this.config = {
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
});

When('the app is started', function () {
    this.app = new App()
});

Then('the server will start with config variables', function () {
    this.app.run(this.config)
    expect(this.app.server.allDoubles.length).to.equal(1)
})

Given('an incorrect config file', function () {
    this.config = {
        doubles: "bad"
    }
});

Then('the app will throw an error', function () {
    expect(() => this.app.run(this.config)).to.throw(Error)
});


