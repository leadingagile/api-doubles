/* eslint-disable import/no-commonjs */
const express = require('express');
const router = express.Router();

router.all('/*', (req, res) => {
  const orderResponse = {
    data: { orderCode: req.params.orderNumber },
    status: 200,
    statusText: 'OK',
  };

  res.json(orderResponse);
});

module.exports = router;
