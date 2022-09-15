const chai = require('chai')
const App = require('../src/Server')

const app = new App()
AfterAll( function () {
     app.stop()
})

Given('a config file', function () {
    this.config = {
        "httpPort": 8002,
        doubles: [
            {
                request: {
                    method: 'GET',
                    url: '/some-other-example'
                },
                response: {
                    status: 200,
                    redirectURL: ""
                }
            }
        ]
    }
});

Then('the server will start', function () {
    app.serve(this.config)
})

Given('an incorrect config file', function () {
    this.config = {
        doubles: "bad"
    }
});

Then('the app will throw an error', function () {
    expect(() => this.app.run(this.config)).to.throw(Error)

});

