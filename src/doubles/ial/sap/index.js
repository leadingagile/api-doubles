/* eslint-disable import/no-commonjs */
const express = require('express');
const router = express.Router();

const v1_carts = require('./v1_carts');
const v1_preorders_docusign_offlinesign = require('./v1_preorders_docusign_offlinesign');
const catchallSuccess = require('./catchallSuccess');
const preorders_preparePayment = require('./preorders_preparePayment');

router.use('/:countryCode/preorders', preorders_preparePayment);
router.use('/:countryCode/v1/orders', catchallSuccess);
router.use('/:countryCode/v1/carts', v1_carts);
router.use(
  '/:countryCode/v1/preorders/docusign/offlinesign',
  v1_preorders_docusign_offlinesign
);
router.use('/:countryCode/v2/preorders/confirm', catchallSuccess);

module.exports = router;
