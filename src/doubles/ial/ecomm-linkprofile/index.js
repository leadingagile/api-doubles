/* eslint-disable import/no-commonjs */
const express = require('express');
const router = express.Router();

router.all('/api/v1/:countryCode/link-guest-profile', (req, res) => {
  const profileData = {
    status: 200,
  };

  res.json(profileData);
});

module.exports = router;
