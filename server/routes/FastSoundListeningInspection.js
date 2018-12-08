const express = require('express');
const router = express.Router();
const config = require('../config');
const fs = require('fs');

const asyncMap = (arr, fn) => Promise.all(arr.map(async v => await fn(v)));

const wrapper = fn => (req, res, next) => fn (req, res).catch(next);

router.get('/normal', wrapper(async (req, res) => {
  const list = fs.readdirSync(__dirname + '/../public/sound/FS/STRING');
  const length = list.length;
  const response = list.map((v, i) => {
    return {
      fullpath: `http://localhost:${config.PORT}/static/sound/FS/STRING/${v}`,
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

router.get('/fast', wrapper(async (req, res) => {
  const list = fs.readdirSync(__dirname + '/../public/sound/FS/Fast');
  const length = list.length;
  const response = list.map((v, i) => {
    return {
      fullpath: `http://localhost:${config.PORT}/static/sound/FS/Fast/${v}`,
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

router.get('/more-fast', wrapper(async (req, res) => {
  const list = fs.readdirSync(__dirname + '/../public/sound/FS/MoreFast');
  const length = list.length;
  const response = list.map((v, i) => {
    return {
      fullpath: `http://localhost:${config.PORT}/static/sound/FS/MoreFast/${v}`,
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
