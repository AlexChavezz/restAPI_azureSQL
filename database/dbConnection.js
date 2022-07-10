const { Connection } = require('tedious');

// Create connection config

const config = {
    authentication: {
        options: {
            userName: process.env.userName,
            password: process.env.password
        },
        type: 'default',
    },
    server: process.env.server,
    options: {
        database: process.env.database, 
        encrypt: true
    }
};

const connection = new Connection(config);

module.exports = connection;