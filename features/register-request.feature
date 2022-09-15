Feature: Register a request

	As a developer
	I want to register a request that I can make to an http server
	So that I can hit it during testing

Background:
	Given the double server has been started


Scenario: Double not registered returns 404
	Given there is no double registered with the url "http://localhost:8001/some-example"
	When the client makes a "get" request to "http://localhost:8001/some-example"
	Then the client should receive a response with 404 status code


Scenario Outline: Receive a response with specific status code
	Given a double with the registered url "http://localhost:8001/redirect-example"
	And that double has a status of <status>
	When the client makes a "get" request to "http://localhost:8001/redirect-example"
	Then the client should receive a response with <status> status code

	Examples:
	| status |
	| 200 	 |
	| 201 	 |


Scenario Outline: Receive a response with expected data for get and post request
	Given a double with the url "http://localhost:8001/some-example" and a response has been registered
	When the client makes a <httpMethod> request to "http://localhost:8001/some-example"
	Then the client should receive a response

	Examples:
		| httpMethod |
		| "get" |
		| "post" |

Scenario: Receive a request to remove doubles with uri
	Given Given a registered double with url "http://localhost:8001/redirect-example"
	When the client requests removal with url "http://localhost:8001/redirect-example"
	Then double with url "http://localhost:8001/redirect-example" should not be registered
