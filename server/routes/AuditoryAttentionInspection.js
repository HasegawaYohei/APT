const express = require('express');
const router = express.Router();
const config = require('../config');
const fs = require('fs');

const asyncMap = (arr, fn) => Promise.all(arr.map(async v => await fn(v)));

const wrapper = fn => (req, res, next) => fn (req, res).catch(next);

router.get('/', wrapper(async (req, res) => {
  const list = fs.readdirSync(__dirname + '/../public/sound/AA').filter(v => v.slice(-4) === '.wav');
  const length = list.length;
  const response = list.map((v, i) => {
    return {
      fullpath: `http://localhost:${config.PORT}/static/sound/AA/${v}`,
      filename: v,
      divider: ((i + 1) !== length),
    };
  });
  return res.status(200).json(response);
}));

module.exports = router;
