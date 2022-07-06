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

router.all('/cat-with-ci-access-token', (req, res) => {
  const fsData = {
    access_token:
      'eyJ0eXAiOiJKV1QiLCJ0b2tlbl90eXBlIjoiQSIsImFsZyI6IlJTMjU2Iiwia2lkIjoiY3NkbmtleTEifQ.eyJzdWIiOiJlYzQ3NzhhNC0xZmE1LTQxZjgtYTc1Yy0zM2E5OTY1MDMyZWIiLCJhdWQiOiJiZTEyY2RmYy04YTdmLTQ0MzctODQ1Zi0zYzZiMmQ3NDNkMTgiLCJpc3MiOiJENzY4MDFGQS01MjA1LTQ3RTctQUI2QS1EMEY1NDA4QUIxRkEiLCJ0eXBlIjoic3NvIiwiZXhwIjoxNjQ3MzcyNDM1LCJpYXQiOjE2NDczNjg4MzUsImp0aSI6ImVjNDc3OGE0LTFmYTUtNDFmOC1hNzVjLTMzYTk5NjUwMzJlYnwxNjQ3MzY4ODM1ODA1OTMzMDAwfGEiLCJ1c2VybmFtZSI6Im1waWdkZW51a3Rlc3RAZ21haWwuY29tIn0.M8Ey6DfoT4xHA054OVC1jB7ZLByUZc2h77yqgV854efgxt5TkHt66C-Kn7LGGPEQCKelGK1e03r-vOg0Nmy3j40nI4EixA5QhxrMBhvrODJwXBY3jXlhUkRbHE-w6v792HNMof4I2TCIVACnNx5FwjyzxwqDPZEMDCO8IDIEptufRZsD1wPsX-5tzcUO8gGQoO4SQ1MoBOFFPa9yD8RZRZlCceYeG-EhW0mPWw0vrQBvQa85Vcio-o3MJ2NyjUVFFA1Ja8aya15OKo3fvC7BzwY8kRiIjbb8OGplflf2YwiVX9GLtyglfLxPvSjKLz5MUC2HPoMbrsoQQxDsquUajg',
    refresh_token:
      'eyJ0eXAiOiJKV1QiLCJ0b2tlbl90eXBlIjoiUiIsImFsZyI6IlJTMjU2Iiwia2lkIjoiY3NkbmtleTEifQ.eyJzdWIiOiJlYzQ3NzhhNC0xZmE1LTQxZjgtYTc1Yy0zM2E5OTY1MDMyZWIiLCJhdWQiOiJiZTEyY2RmYy04YTdmLTQ0MzctODQ1Zi0zYzZiMmQ3NDNkMTgiLCJkZXZpY2VfaWQiOm51bGwsImlzcyI6IkQ3NjgwMUZBLTUyMDUtNDdFNy1BQjZBLUQwRjU0MDhBQjFGQSIsInR5cGUiOiJzc28iLCJleHAiOjE2NTAwNDcyMzUsImlhdCI6MTY0NzM2ODgzNSwianRpIjoiZWM0Nzc4YTQtMWZhNS00MWY4LWE3NWMtMzNhOTk2NTAzMmVifDE2NDczNjg4MzU4MDc5OTUwMDAiLCJ1c2VybmFtZSI6Im1waWdkZW51a3Rlc3RAZ21haWwuY29tIn0.W24R5Ucskwgbp_DmgV5HjtalXjsRovFzZUd2e0A-CH98WVugqCtUjatwKgb8O4lwIvySuuFCWZND-no6rnkB9pN0Nc-I1piI5_VPboIofwic6CQ72OQ6W1dx7qGmsYSGXMaOBulPHU1M0FuES8Plcx4NdVEH6j2yDCGmM96hjQc4TnKE5IUQE1xlnoF9NYdePFk8rMyWUgWY-w-4qpUxRD3oKqRlMy-OoIX6z7j82--XWTFHJFHZAMqQXMhesCsvRuyjWIRJsouI6WSojQ4HgH2MyYAsv5s0thdZQXX9FWBOZbAF5cBsMZeazMArbl6dGec5Fr0c1YuY8G7jQkTO9Q',
    ford_consumer_id: 'ec4778a4-1fa5-41f8-a75c-33a9965032eb',
    expires_in: 3600,
    refresh_expires_in: 2629746,
  };

  res.set(headers(req));
  res.json(fsData);
});

module.exports = router;
