'use strict';
require('dotenv').config();
module.exports = {
  NODE_ENV: '"production"',
  FIREBASE_KEY: JSON.stringify(process.env.FIREBASE_KEY),
};
