const Server = require("./Server");

class App {

    constructor() {
        this.server = new Server()
    }

    run(config){
        this.server.allDoubles = config.doubles
    }



}

module.exports = App;