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


module.exports = config;