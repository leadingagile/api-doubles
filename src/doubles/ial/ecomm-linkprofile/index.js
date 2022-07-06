/* eslint-disable import/no-commonjs */
const express = require('express');
const router = express.Router();

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

router.all('/api/v1/:countryCode/link-guest-profile', (req, res) => {
  const profileData = {
    status: 200,
  };

  res.set(headers(req));
  res.json(profileData);
});

module.exports = router;
