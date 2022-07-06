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

router.all('/:orderNumber', (req, res) => {
  const cartData = require('./cart/doubles/v1-carts-get.json');
  cartData.code = req.params.orderNumber;

  res.set(headers(req));
  res.json(cartData);
});

module.exports = router;
