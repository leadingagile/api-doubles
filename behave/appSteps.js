const chai = require('chai')
const App = require('../src/App')

Given('the config file path provided is {string}', function (config) {
    this.config = config
});

When('the app is started', function () {
    this.app = new App()
    this.app.run(this.config)
});

Then('the server will start with empty state', function () {

    expect(this.app.server.allDoubles.length).to.equal(0)
});

Given('the config file path is provided is {string}', function (config) {
    this.config = config
});
Then('the server will start with config variables', function () {
    expect(this.app.server.allDoubles.length).to.equal(1)
})

