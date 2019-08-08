const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const config = require('./config');

const connect = mongoose.connect(
  config.database,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
);
module.exports = connect;
