const Server = require("./Server");
// How can we use and test default config without passing parameter in run
const defaultConfig = require("../example-web-app/doubler.config")
class App {

    constructor() {
        this.server = new Server()
    }

    run(config){
        if (!config.hasOwnProperty('doubles')){
            throw Error('Config file missing doubles')
        }
        if(!Array.isArray(config.doubles) ){
            throw Error('doubles is not an array')
        }
        config.doubles.forEach(double => {

        })
        this.server.allDoubles = config.doubles
    }



}

module.exports = App;