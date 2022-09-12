#!/usr/bin/env node

const Server = require('./Server')
const server = new Server()
const fs = require('fs')

if(!process.argv[2]) {
    console.log('Please provide a path to a config file (in JSON format) in the arguments')
    process.abort()
}

let fileData = fs.readFileSync(process.argv[2]);
server.serve(JSON.parse(fileData))
