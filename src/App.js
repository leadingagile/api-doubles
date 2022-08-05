const Server = require("./Server");
// How can we use and test default config without passing parameter in run
const defaultConfig = require("../example-web-app/doubler.config")
class App {

    constructor() {
        this.server = new Server()
    }

    serve(config = {}) {
        this.load(config.doubles || [])
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        //dirty hack we need a LeadingAgile certificate
        this.server.start(config.httpPort, config.httpsPort)
    }

    load(doubles) {
        if (!doubles) throw Error('(load) requires [doubles]')

        if (!Array.isArray(doubles) && typeof doubles !== 'object') throw Error('doubles is not an array or object')


        if(Array.isArray(doubles)) {
            doubles.forEach(double => {
                this.server.registerDouble(double)
            })

            return
        }

        this.server.registerDouble(doubles)
    }

    get() {}

    post() {}

    stop() {
        this.server.close()
    }



}

module.exports = App;