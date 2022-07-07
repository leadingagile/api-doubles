/* eslint-disable import/no-commonjs */
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  const userProfileData = require('./doubles/userProfileGet.json');
  res.json(userProfileData);
});

router.put('/', (req, res) => {
  const userProfileData = require('./doubles/userProfilePut.json');

  res.json(userProfileData);
});

router.all('/guest/guid', (req, res) => {
  const userProfileData = {
    httpStatus: 200,
    status: 200,
    requestStatus: 'CURRENT',
    error: null,
    lastRequested: new Date().toISOString(),
    version: '1.0.0',
    guestUserGuid: '262cce04-bb16-3756-b304-fe07464557e8',
  };
  res.json(userProfileData);
});

router.all('/guest/guid', (req, res) => {
  const userProfileData = {
    httpStatus: 200,
    status: 200,
    requestStatus: 'CURRENT',
    error: null,
    lastRequested: new Date().toISOString(),
    version: '1.0.0',
    guestUserGuid: '262cce04-bb16-3756-b304-fe07464557e8',
  };

  res.set(headers(req));
  res.json(userProfileData);
});

module.exports = router;
