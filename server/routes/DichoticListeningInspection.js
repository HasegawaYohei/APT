const express = require('express');
const router = express.Router();
const config = require('../config');
const fs = require('fs');

const asyncMap = (arr, fn) => Promise.all(arr.map(async v => await fn(v)));

const wrapper = fn => (req, res, next) => fn (req, res).catch(next);

router.get('/single-ear-single-sound', wrapper(async (req, res) => {
  const list = fs.readdirSync(__dirname + '/../public/sound/SH/SingleEarSingleSound').filter(v => v.slice(-4) === '.wav');
  const length = list.length;
  const response = list.map((v, i) => {
    return {
      fullpath: `http://localhost:${config.PORT}/static/sound/SH/SingleEarSingleSound/${v}`,
      filename: v,
      divider: ((i + 1) !== length),
      status: '',
      cursor: i
    };
  });
  return res.status(200).json(response);
}));

router.get('/single-ear-single-word', wrapper(async (req, res) => {
  const list = fs.readdirSync(__dirname + '/../public/sound/SH/SingleEarSingleWord').filter(v => v.slice(-4) === '.wav');
  const length = list.length;
  const response = list.map((v, i) => {
    return {
      fullpath: `http://localhost:${config.PORT}/static/sound/SH/SingleEarSingleWord/${v}`,
      filename: v,
      divider: ((i + 1) !== length),
      status: '',
      cursor: i
    };
  });
  return res.status(200).json(response);
}));

router.get('/single-sound', wrapper(async (req, res) => {
  const list = fs.readdirSync(__dirname + '/../public/sound/SH/SingleSound').filter(v => v.slice(-4) === '.wav');
  const length = list.length;
  const response = list.map((v, i) => {
    return {
      fullpath: `http://localhost:${config.PORT}/static/sound/SH/SingleSound/${v}`,
      filename: v,
      divider: ((i + 1) !== length),
      statusL: '',
      statusR: '',
      cursor: i
    };
  });
  return res.status(200).json(response);
}));

router.get('/word', wrapper(async (req, res) => {
  const list = fs.readdirSync(__dirname + '/../public/sound/SH/Word').filter(v => v.slice(-4) === '.wav');
  const length = list.length;
  const response = list.map((v, i) => {
    return {
      fullpath: `http://localhost:${config.PORT}/static/sound/SH/Word/${v}`,
      filename: v,
      divider: ((i + 1) !== length),
      statusL: '',
      statusR: '',
      cursor: i
    };
  });
  return res.status(200).json(response);
}));

router.get('/sentence', wrapper(async (req, res) => {
  const list = fs.readdirSync(__dirname + '/../public/sound/SH/Sentence').filter(v => v.slice(-4) === '.wav');
  const length = list.length;
  const response = list.map((v, i) => {
    return {
      fullpath: `http://localhost:${config.PORT}/static/sound/SH/Sentence/${v}`,
      filename: v,
      divider: ((i + 1) !== length),
      statusL: '',
      statusR: '',
      cursor: i
    };
  });
  return res.status(200).json(response);
}));

module.exports = router;
