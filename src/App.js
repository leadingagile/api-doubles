const Server = require("./Server");
// How can we use and test default config without passing parameter in run
const defaultConfig = require("../example-web-app/doubler.config")
class App {

    constructor() {
        this.server = new Server()
    }

    serve(config) {
        this.load(config || {})
        this.server.start()
    }

    load(doubles) {
        if (!doubles) throw Error('(load) requires [doubles]')

        if(!Array.isArray(doubles) ){
            throw Error('doubles is not an array')
        }
        doubles.forEach(double => {
            this.server.registerDouble(double)
        })
    }

    get() {}

    post() {}

    stop() {
        this.server.close()
    }



}

module.exports = App;