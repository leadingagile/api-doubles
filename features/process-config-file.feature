Feature: Run server with JSON config file

  as a developer
  I want to provide a config file to the application
  so that I can define starting state of http server for testing


#  Scenario: No config file provided
#      Given the config file path provided is ""
#      When the app is started
#      Then the server will start with empty state

  Scenario: Config file provided
    Given a config file
    When the app is started
    Then the server will start with config variables

  Scenario: Config file has incorrect structure
    Given an incorrect config file
    When the app is started
    Then the app will throw an error