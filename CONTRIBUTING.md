# Auto Doubler

Simple tool that automatically registers doubles over HTTP

## BDD/TDD Development Process

In order to drive the development of the application, we are using a BDD/TDD approach.

### Tools
- [Cucumber - cucumber-js](https://cucumber.io/docs/installation/javascript/)
- [Mocha - Test Runner](https://mochajs.org/)
- [Chai - Assertion Library](https://www.chaijs.com/)


## Directory Structure
- `behave` - Configuration and step definitions for behavior tests
- `features` - BDD specification files
- `test` - Unit tests
- `src` - Source code


## Running Tests
`npm run behave`
: run all behavior tests

`npm run test:unit`
: run unit tests

`npm run test:integration`
: run all integration tests

## Starting a Doubles Server from the Command Line
`npm run start:doubles [pathToConfig]`
: start the app. first argument is a path to a json config file

## Using a Doubles Server Programatically
Look at `./example-web-app/README.md` for a code example of using api-doubles as a library.

## Submitting Pull Requests

Thanks for helping extend and improve the tool!

* Be sure your fork is up-to-date with the current main
* Be sure your changes have tests at the necessary levels (unit, functional, etc.)
* Be sure all tests pass

## Publishing Notes

Bump the (prerelease) version and publish.

```shell
npm run do:publish
```
* Runs the tests
* Commits the version change and tag
* Pushes the changes
* Publishes the package to NPM

**What's Happening**

Actions are initiated by `./scripts/publish.sh`. They also include behavior from the `preversion.sh` and `postversion.sh` scripts which are registered in `package.json` to run before and after `npm version`.

## Contributors

- Butch Howard <butch.howard@leadingagile.com>
- Aaron Pietryga <aaron.pietryga@leadingagile.com>
- Keith Dingle <keith.dingle@leadingagile.com>
- James Hester <james.hester@leadingagile.com>
- Ron Quartel <ron.quartel@leadingagile.com>
