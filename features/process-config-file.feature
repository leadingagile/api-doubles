Feature: Run server with JSON config file

  as a developer
  I want to provide a config file to the application
  so that I can define starting state of http server for testing


  Scenario: No config file provided
#      Given there is no defined config file ''
      Given the config file path provided is ""
      When the app is started
      Then the server will start with empty state
#  Given a double server
#  When provided a config file
#  Then it will run with specified configuration