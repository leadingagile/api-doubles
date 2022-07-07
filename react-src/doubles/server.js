/* eslint-disable import/no-commonjs */
const express = require('express');
const https = require('https');
const app = express();
const cors = require('cors');

const userProfile = require('./user-profile/userProfile');
const sap = require('./ial/sap/index');
const ecommLinkProfile = require('./ial/ecomm-linkprofile/index');
const fsData = require('./fs/index');
const docuSign = require('./docuSign/index');

const fs = require('fs');
const path = require('path');

const options = {
  key: fs.readFileSync(path.resolve(__dirname, './device.key')),
  cert: fs.readFileSync(path.resolve(__dirname, './localhost.ford.com.crt')),
};

app.use(cors());

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log({
    method: req.method,
    url: req.url,
    params: req.params,
  });
  next();
});

app.use((req, res, next) => {
  const headers = (req) => {
    return {
      Allow: 'GET, OPTIONS, HEAD',
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Headers':
        'Accept, Application-Id, Auth-Token, Content-Type, Origin',
      'Access-Control-Allow-Methods':
        'OPTIONS, GET, HEAD, POST, PUT, DELETE, PATCH',
      'Access-Control-Max-Age': '300',
    };
  };
  res.set(headers(req));
  next();
});

app.use('/api/users', userProfile);
app.use('/api/secure-purchase/gep', sap);
app.use('/api/secure/ecomm-linkprofile', ecommLinkProfile);
app.use('/api/token/v2', fsData);
app.use('/oneford/api/', docuSign);

// ial is not returning anything
app.get('/', (req, res) => {
  res.json({
    userProfile: 'https://localhost.ford.com:8001/api/users',
    guestGuid: 'https://localhost.ford.com:8001/api/users/guest/guid',
    ial: 'https://localhost.ford.com:8001/api/secure-purchase/gep',
    ecommLinkProfile:
      'https://localhost.ford.com:8001/api/secure/ecomm-linkprofile',
    fs: 'https://localhost.ford.com:8001/api/token/v2/cat-with-ci-access-token',
  });
});

app.use('/fma', express.static(path.join(__dirname, 'fma')));

const server = https.createServer(options, app);

server.listen(8001, () => {
  // eslint-disable-next-line no-console
  console.log('listening at https://localhost.ford.com:8001/');
});
