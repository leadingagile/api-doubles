Feature: Run server with JSON config file

  as a user of the api-doubles app
  I want to provide a config file to the application
  so that I can define starting state of http server for testing

  Scenario: Config file provided
    Given a config file
    Then the server will start

  Scenario: Config file has incorrect structure
    Given an incorrect config file
    Then the app will throw an error