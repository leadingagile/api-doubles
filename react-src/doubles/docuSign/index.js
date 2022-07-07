/* eslint-disable import/no-commonjs */
const express = require('express');
const router = express.Router();

/*
 * @todo 		 Handle state needed to account for nextPageUrl
 * @author 	 jhoove32@ford.com
 * Rather than two routes, change to be a single route with an argument?
 * Maybe arg can be the url?
 */
const pages = {
  paymentPage:
    'https://localhost.ford.com:3000/content/guxeu/uk/en_gb/home/root/checkout/checkout-payment.html',
  orderPage:
    'https://localhost.ford.com:3000/content/guxeu/uk/en_gb/home/root/checkout/order-confirmation.html',
};

let nextPageUrl = pages.orderPage;

router.all('/v2/signing/envelope/setTheNextPageAsPayment', (req, res) => {
  nextPageUrl = pages.paymentPage;
  res.json({});
});

router.all('/v2/signing/envelope/setTheNextPageAsConfirmation', (req, res) => {
  nextPageUrl = pages.orderPage;

  res.json({});
});

router.all('/v2/signing/envelope/create', (req, res) => {
  const data = {
    result: {
      envelopeId: '1b9490b3-6b00-4534-ba13-794f5016e62c',
      status: 'sent',
      statusDateTime: '2022-05-04T20:09:36.4370000Z',
      signingURL: nextPageUrl,
    },
    error: null,
  };

  res.json(data);
});

module.exports = router;
