/* eslint-disable no-console */
/* eslint-disable import/no-commonjs */
const express = require('express');
const router = express.Router();

router.all('/:orderNumber', (req, res) => {
  const code = req.params.orderNumber;

  const reservationFee = './cart/doubles/v1-carts/reservation-fee.json';
  const noReservationFee = './cart/doubles/v1-carts/no-reservation-fee.json';

  const arrangements = {
    'loc-cannot-sign-online-and-no-reservation-fee': noReservationFee,
    'loc-can-sign-online-but-signs-offline-and-no-reservation-fee': noReservationFee,
    'loc-can-sign-online-but-signs-offline-and-reservation-fee': reservationFee,
    'loc-can-sign-online-and-does-and-no-reservation-fee': noReservationFee,
    'loc-can-sign-online-and-does-and-reservation-fee': reservationFee,
  };

  console.log({ code });
  console.log({ arrangements });

  const cartDataValue = require(arrangements[code]);

  res.json({
    ...cartDataValue,
    code,
  });
});

module.exports = router;
