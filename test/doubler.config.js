const missingDoubleConfig = {
    table : 'true'
}

const doubleNotArrayConfig = {
    table : 'true',
    doubles : 1
}

const oneDoubleConfig = {
    doubles: [
        {
            request: {
                method: 'GET',
                url: 'http://localhost:8001/some-other-example'
            },
            response: {
                status: 200,
                redirectURL: ""
            }
        }
    ]
}




module.exports = {missingDoubleConfig, doubleNotArrayConfig, oneDoubleConfig}