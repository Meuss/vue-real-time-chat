'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

require('dotenv').config();
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FIREBASE_KEY: JSON.stringify(process.env.FIREBASE_KEY),
});
