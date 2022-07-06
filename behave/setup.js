const { Before, Given, When, Then } = require('@cucumber/cucumber')
const chai = require('chai')
const expect = chai.expect

global.Before = Before
global.Given = Given
global.When = When
global.Then = Then
global.expect = expect