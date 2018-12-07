const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const DichoticListeningTest = require('./routes/DichoticListeningTest');
const FastSoundListeningTest = require('./routes/FastSoundListeningTest');
const BothEarsAlternatingTest = require('./routes/BothEarsAlternatingTest');
const MultipleSoundListeningTest = require('./routes/MultipleSoundListeningTest');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/static', express.static(__dirname + '/public'));

app.use('/dichotic-listening-test', DichoticListeningTest);
app.use('/fastsound-listening-test', FastSoundListeningTest);
app.use('/both-ears-alternating-test', BothEarsAlternatingTest);
app.use('/multiple-sound-listening-test', MultipleSoundListeningTest);

app.get('/', (req, res, next) => {
  res.send(200, 'I\'m fine.');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next)  => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
