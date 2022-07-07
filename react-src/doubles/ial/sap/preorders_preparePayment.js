/* eslint-disable import/no-commonjs */
const express = require('express');
const router = express.Router();

router.all('/*', (req, res) => {
  const orderResponse = {
    data: {
      orderCode: 'sit-11041431',
      jwtToken:
        'eyJhbGciOiJSUzI1NiJ9.eyJ0b3RhbEFtb3VudCI6IjUuMCIsInByb2R1Y3RJZCI6IldBRUdCLUNHVy0yMDIyLU1hY2gtRUdCUjIwMjIyNSIsIm1lcmNoYW50SWQiOiIxMTIwNTQxODAzIiwic2VydmVyQ2FsbGJhY2tVcmwiOiJodHRwczpcL1wvYXBpZ3R3cWEuZm9yZC5jb21cL29uZWZvcmRcL2FwaVwvZ2VwXC9nYnJcL3ByZW9yZGVyc1wvcGF5bWVudC1jYWxsYmFjayIsImN1c3RvbUZpZWxkcyI6eyJvcmRlcklkIjoic2l0LTExMDQxNDMxIn0sImlzcyI6ImVjb21tZXJjZSIsImN1cnJlbmN5IjoiODI2IiwidGF4QW1vdW50IjoiMCIsInRyYW5zYWN0aW9uVGltZXN0YW1wIjoiMjAyMjowNToxMS0yMDo0NDoyOCJ9.xUvGxZDHuIcXbEabwsTcMYu7Z2FRzBG6cl_HPFHZdHRBc3BR_y3CnI4SZvxJRrKEp-IADEt_by95QJes7QPaE8C8LxZkpw8lfA08Rv3PwTGKspgdTfbE0lhelwsOzZc_G3c6p6-OtJ0f76r-J2aT4Qi4wZ_ad_0zvfsHyQyLuPTKUXjOCHJIRvO07JW6aK9bYJgq2wNp6xMdY2Sm9hovUZdAkMomMhJIUk_ris1sx9bMTj741vnSsUz3B_lQp3fD9jRk4HHfRs4DTVxav9u3kOXDkjdEvurkuaJfZsyPSJ-U86i5-sCS34cfmrPq6LcHwfCqw2nqNPoE9993iYweMQ',
      paymentTransactionId: 'sit-11041431',
    },
    status: 200,
    statusText: 'OK',
  };

  res.json(orderResponse);
});

module.exports = router;
