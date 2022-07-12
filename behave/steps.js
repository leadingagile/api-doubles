const Server = require('../src/Server')

const chai = require('chai')

Before(function() {
	this.server = new Server
	this.expectedResponse = undefined
})

Given('the double server has been started', function () {

	this.server.start()
})


Given('there is no double registered with the url {string}', function (uri) {

	this.server.removeAllDoublesWithUri(uri)
})


When('the client makes a {string} request to {string}', function (method, uri) {

	this.expectedResponse = this.server.request(method, uri)
})

Then('the client should receive a response', function () {
	expect(this.expectedResponse.hasOwnProperty('response')).to.be.true

});



Then('the client should receive a response with {int} status code', function (status) {

	//expect(this.server.response).to.have.property('status', status)
	expect(this.server.response.status).equal(status)
})

Given('a double with the registered url {string}', function (uri) {
	const double = {
			request: {
				method: 'GET',
				url: uri
			},
			response: {
				status: 200,
				redirectURL: "",
				content: 'test'
			}
		}

	this.server.registerDouble(double)

});

Given('a double with the url {string} and a response has been registered', function (uri) {
	const double = {
		request: {
			method: 'GET',
			url: uri
		},
		response: {
			status: 200,
			redirectURL: ""
		}
	}

	this.server.registerDouble(double)

});


Given('that double has a status of {int}', function (status) {
	// const double = {
	// 	uri: 'http://localhost:8001/redirect-example',
	// 	method: 'get',
	// 	status: status,
	// 	location: 'redirect.com'
	// }
	//
	// this.server.registerUri(double)
	// const response = this.server.request('get','http://localhost:8001/redirect-example')
	//
	// chai.expect(response.status).equal(status)
	// chai.expect(response.location).not.be(response.uri)

	return 'pending'

});




