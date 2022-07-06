# Product Extraction

The product extraction team is incrementally adding functionality to support the ability to test in isolation.


# Doubles

## 1. Generate Cert

Run the script, answer the prompts.

Some of the steps will require you to authenticate with you local admin credentials. They will update your keychain with the certs created.


```shell
./scripts/generate_cert_files.sh
```

Current defaults are for `ford.com` and `localhost.ford.com` -- this will change real soon


## 2. Update `hosts` file

The domain used (`localhost.ford.com`) must be in your `/etc/hosts` file. Add this line to the file

```
127.0.0.1	localhost.ford.com

```

## 3. Run the Double Server

```shell
npm run start:doubles
```

You can check the doubles are running by opening a browser to the domain being served (e.g. https://localhost.ford.com:8001/ )

You should see a list of the endpoints being hosted.


# Project

## Directory Structure

- `./aem/react-app/doubles`: Doubled dependencies and related utilities.
	- `./fma`: FMA functionality replaced by call with custom `bundle.js` implementation.
	- `./fs`: Handle `/cat-with-ci-access-token`endpoint.
	- `./ial`: Serve doubled endpoints to handle IAL requests.
	- `./user-profile`: Provides doubling for user profile service.


## Other files (@todo)
- `devices.key`: -
- `localhost.ford.com.crt`: -
- `localhost.ford.com.csr`: -
- `rootCA.key`: -
- `rootCA.pem`: -
- `rootCA.key`: -
- `server.js`: -
- `v3.ext`: -


## Techniques

#### Javascript resource replacement
Replace a JavaSript resource provided over http with a custom version.

example: FMA, `./aem/react-app/doubles/fma/bundle.js`


### Custom endpoint handler
Handle an HTTP request with a registered endpoint on a doubled server.

example: FS, `./aem/react-app/doubles/fs/index.js`


### JSON fixture
Store a fixture representing a request response in JSON and provide it as the response body when requested (via doubled HTTP server).

example: User Profile Service, `./aem/react-app/doubles/user-profile/doubles/userProfileGet.json`


## Scripts

`npm run start:doubles` - Run the doubles server at https://localhost.ford.com:8001/

`npm start` - Serve the react application and direct to `https://localhost.ford.com:3000/hints.html`. Recommended to log into AEM first.


## EU Checkout Flow Instructions

These doubles enable the ability to move through a designated happy path of the EU Checkout flow. In order to do these, we have certain prerequisites and established expectations. Some of these are to satisfy state dependencies introduced by shared flow and sibling products.

Prerequisities:
- AEM has been started and logged in to at http://localhost.ford.com:4502/

- React app is served and accessible via https://localhost.ford.com:3000/hints.html

- Doubles server has been started at https://localhost.ford.com:8001

- Copy dataModel:
	- Navigate to https://wwwqa2-couk.brandeulb.ford.com/shop/price-and-locate/pre-order/build-your-own#/model
	- click SELECT button in middle option: AWD
	- click SELECT button, only option
	- select Rapid Red color option
	- click INTERIOR button
	- click EXTRAS button
	- click CONTINUE button
	- select Payment Method: click "Are you a business customer looking for a finance plan?"
	- confirm "Other ways to pay" is selected
	- select Delivery Method: click Select button in Collection option
	- enter characters "l", "o", "n" (as in "London") into the zip code input
	- wait for suggestions
	- select top option: Gates of Woodford
	- click Checkout

	- Authenticate through SSO]
	- go to developer tools
		-> Application
		-> sessionStorage
		-> https://wwwqa2-couk.brandeulb.ford.com
		-> persist:dataModelDsEnabled
	- Copy value of `persist:dataModelDsEnabled`
- Paste dataModel:
	- Open local application to https://localhost.ford.com:3000/hints.html


	- go to developer tools
		-> Application
		-> localStorage
		-> https://localhost.ford.com:3000
		-> dataModel
	- Paste value from QA with key `dataModel`

- Input value for `cartReferral`
	In local application (https://localhost.ford.com:3000)

	- go to developer tools
		-> Application
		-> localStorage
		-> https://localhost.ford.com:3000
		-> cartReferral
	- Paste data for `cartReferral`:
		`{"guestGUID": "ec4778a4-1fa5-41f8-a75c-33a9965032eb"}`

Checkout steps:
- Click "UK Checkout" link on [hints]
- Click Continue button
- Click Sign at Dealer button
- CONGRATULATIONS!


## General Notes

### Timer Expiry

When investigating the ability to reconstitute the application, we discovered the `dataModel` has a `timer` object which cooresponds to the timer in the top right of the application.

The `timerExpiry` field stores a javascript formatted unix timestamp. This has an additional length of 3 characters representing milliseconds. To edit this in the experience, update it with a current timestamp plus whatever value you would like it to read (1 minute = 60000).


## Gotchas

### Security certificate warning

Due to using the https protocol, when using certain browsers load a page for the first time, the browser prompts for explicit permission to access this page.

When first accessing new hosts such as the double server (http://localhost.ford.com:8001) or the react-act (https://localhost.ford.com:3000) it is advised to visit them directly in the browser to proceed.

To do so, after receiving the "Your connection is not private" warning, click the "Advanced" button and follow the link at the bottom to "Proceed to localhost.ford.com (unsafe)".

If you see a blank screen when loading the react-app in the browser (not including the `hints.html` page) , review each end point manually to assure security certificates are not the issue.
