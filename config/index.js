require('dotenv').load();
const ENV = process.env.ENVIRONMENT;
const API_VERSION = 1;

let config = {};
config.server = require('./server').get(ENV);
config.logger = require('./logger').get(ENV);

module.exports = Object.assign(config, {
    [`${ENV}`] : true,
    env : ENV,
    version : API_VERSION,
});
