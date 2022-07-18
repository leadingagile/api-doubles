const chai = require('chai')
const App = require('../src/App')

Before(function (){
    this.app = new App()
})
Given('the config file path provided is {string}', function (config) {
    this.config = config
});

When('the app is started', function () {
    this.app.run(this.config)
});

Then('the server will start with empty state', function () {

    expect(this.app.server.allDoubles.length).to.equal(0)
});


