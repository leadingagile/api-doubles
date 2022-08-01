const { Before, Given, When, Then, AfterAll } = require('@cucumber/cucumber')
const chai = require('chai')
const expect = chai.expect

global.Before = Before
global.Given = Given
global.When = When
global.Then = Then
global.AfterAll = AfterAll
global.expect = expect