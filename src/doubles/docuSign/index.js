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

// https://localhost.ford.com:3000/content/guxeu/uk/en_gb/home/root/checkout/order-confirmation.model.json

router.all('/v2/signing/envelope/create', (req, res) => {
  const data = {
    result: {
      envelopeId: '1b9490b3-6b00-4534-ba13-794f5016e62c',
      status: 'sent',
      statusDateTime: '2022-05-04T20:09:36.4370000Z',
      signingURL:
        'https://localhost.ford.com:3000/content/guxeu/uk/en_gb/home/root/checkout/order-confirmation.html',
    },
    error: null,
  };

  res.set(headers(req));
  res.json(data);
});

module.exports = router;
