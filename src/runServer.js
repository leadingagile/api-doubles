const App = require('./App')
const app = new App()
const fs = require('fs')

if(!process.argv[2]) {
    console.log('Please provide a path to a config file (in JSON format) in the arguments')
    app.serve()
}
else {
    let fileData = fs.readFileSync(process.argv[2]);

    let config = JSON.parse(fileData);
    app.serve(config)
}