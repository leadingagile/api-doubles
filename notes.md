# Notes

The following is an example of what a Double object might look like:

```js
/**
 * @path 	 register/some-example.json
 * @object 	 Double
 **/
{
	"url": "http://localhost:8001/some-example",
	"method": "get",
	"status": 200,
	"returnData": {
		"itDoHaveData": true
	}
}

// Updated Example Double
{
    request: {
        method: 'GET',
        url: 'http://localhost:8001/some-example'
    },
    response: {
        status: 200,
        redirectURL: ""
    }
}
```