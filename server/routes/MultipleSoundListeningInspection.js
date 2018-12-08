const express = require('express');
const router = express.Router();
const config = require('../config');
const fs = require('fs');

const asyncMap = (arr, fn) => Promise.all(arr.map(async v => await fn(v)));

const wrapper = fn => (req, res, next) => fn (req, res).catch(next);

router.get('/', wrapper(async (req, res) => {
  const list = fs.readdirSync(__dirname + '/../public/sound/MS');
  const length = list.length;
  const response = list.map((v, i) => {
    return {
      fullpath: `http://localhost:${config.PORT}/static/sound/MS/${v}`,
      filename: v,
      divider: ((i + 1) !== length),
      statuses: [
        '',
        '',
        '',
      ],
      cursor: i
    };
  }).slice(0, 2);
  return res.status(200).json(response);
}));

module.exports = router;
