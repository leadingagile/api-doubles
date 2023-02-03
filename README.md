# Auto Doubler

Simple tool that automatically registers doubles over HTTP

# Using Server instance in Tests

See the [tests in the example app](./example-web-app/test/app.test.js) for ideas

# Using CLI (external) Instance in Tests


`package.json`

```
scripts": {
    "doubles": "npx double ./doubler-config.json",
```

## Config File Format

The configuration file when using the CLI (external server) form of the doubler is the same as the Doubles Configuration Format except it is a JSON file instead of a Javascript Object file.

Todo:
Make them the same!


## Doubles Configuration Format

The configuration data defines how the Doubles Server handles endpoints.

### Server-Wide Settings

httpPort:
The port on LOCALHOST where the server will listen. Defaults to 8001.

fixturesFolder:
A path to a folder where response data fixtures will be found. Path can be relative (to the project main folder). Defaults to './test/fixtures'.

configureDoublesEndpoint:
An endpoint where updated configuration can be POSTed to change the endpoints and data the server handles. Defaults to '/'.

doubles:
A array of endpoint definition objects. Defaults to '[]'.

### Endpoint Definition Objects:

These are the items that will be in the `doubles` array. Each item defines how an endpoint responds to HTTP operations. Each item defines the operation, request and response values.

request:
A request item definition

response:
A response item definition

attachment:
An attachment definition (NB: this will likely move to the `response` item RSN)


#### Request Item Definition

url:
The endpoint (the path portion of the URL, i.e. no scheme, host, port, or authority). Required.

method:
The HTTP method: GET, POST, DELETE (others coming RSN). Defaults to GET.

#### Response Item Definition

status:
HTTP status value to set in the response. Defaults to 200.

data:
Response content body to set. Defaults to empty.

redirectURL:
The URL to redirect to when the response status is 301 or 302. Optional.

fixture:
The file path to a javascript file that exports a value object that will be the data. Optional. If presen, overrides `data`.

### Attachment Item Definition

pathToFile:
The path to the file to be sent as part of the response. Required if `attachment` is defined.



```javascript
{
    httpPort: 8001,
    fixturesFolder: './some/path',
    configureDoublesEndpoint: './some/path',
    doubles: [
        {
            request: {
                method: 'GET',
                url: '/some/endpoint'
            },
            response: {
                status: 200,
                data: 'some payload'
            }
        },
        {
            request: {
                method: 'GET',
                url: '/some/other/endpoint'
            },
            response: {
                status: 400
            }
        },
        {
            request: {
                method: 'POST',
                url: '/something/endpoint'
            },
            response: {
                status: 200,
                data: 'some response data'
            }
        },
        {
            request: {
                url: '/some/redirecting/endpoint'
            },
            response: {
                status: 301,
                redirectURL: 'http://google.com'
            }
        },
        {
            request: {
                method: 'GET',
                url: '/something/endpoint'
            },
            response: {
                status: 200,
                fixture: './some/fixture_file.js'
            }
        },
        {
            request: {
                method: 'GET',
                url: '/something/endpoint'
            },
            attachment: {
                pathToFile: './some/file'
            },
            response: {
                status: 200,
            }
        }

    ]
}
```




## Contributors

- Butch Howard <butch.howard@leadingagile.com>
- Aaron Pietryga <aaron.pietryga@leadingagile.com>
- Keith Dingle <keith.dingle@leadingagile.com>
- James Hester <james.hester@leadingagile.com>
- Ron Quartel <ron.quartel@leadingagile.com>
