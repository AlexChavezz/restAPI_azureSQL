const { Connection } = require('tedious');
const config = require('./db.config');

// Create connection config
const connection = new Connection(config);

module.exports = connection;