const Server = require('../src/Server')

const chai = require('chai')

Before(function() {
	this.server = new Server
	this.expectedResponse = undefined
})

Given('the double server has been started', function () {

	// this.server.start()

})


Given('there is no double registered with the url {string}', function (uri) {

	this.server.removeAllDoublesWithUri(uri)
})


When('the client makes a {string} request to {string}', function (method, uri) {

	this.expectedResponse = this.server.request(method, uri)
})

Then('the client should receive a response', function () {
	expect(this.expectedResponse.hasOwnProperty('status')).to.be.true

});



Then('the client should receive a response with {int} status code', function (status) {
	expect(this.server.response.hasOwnProperty('status')).to.be.true
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
	const double = {
		request :{
			url: 'http://localhost:8001/redirect-example',
			method: 'GET'
		},
		response :{
			status: status,
			location: 'redirect.com'
		}
	}

	this.server.registerDouble(double)
	let response = this.server.request('GET','http://localhost:8001/redirect-example')

	expect(response.status).equal(status)

});

Given('Given a registered double with url {string}', function (uri) {
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

When('the client requests removal with url {string}', function (uri) {

	this.server. removeAllDoublesWithUri(uri)
});

Then('double with url {string} should not be registered', function (uri) {

	expect(this.server.isRegistered(uri)).to.be.false
});

Given('a registered double with url {string}', function (uri) {
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
When('the client requests removal with an invalid url {string}', function (uri) {

	this.server.removeAllDoublesWithUri(uri)
});

Then('the message {string} should return', function (message) {
	expect(this.server.getMessage()).equal(message)

});






