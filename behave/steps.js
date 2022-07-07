const Server = require('../src/Server')

Before(function() {
	this.server = new Server
})

Given('the double server has been started', function () {

	this.server.start()
})


Given('there is no double registered with the url {string}', function (uri) {

	this.server.removeAllDoublesWithUri(uri)
})


When('the client makes a {string} request to {string}', function (method, uri) {

	this.server.request(method, uri)
})


Then('the client should receive a response with {int} status code', function (status) {

	//expect(this.server.response).to.have.property('status', status)
	expect(this.server.response.status).equal(status)
})

Given('a double with the registered url {string}', function (uri) {
	this.server.registerUri(uri)

});

Given('a double with the url {string} has been registered', function (uri) {
	this.server.registerUri(uri)

});

Given('that double has a status of {int}', function (int) {
	// Given('that double has a status of {float}', function (float) {
	// Write code here that turns the phrase above into concrete actions
	return 'pending';
});




