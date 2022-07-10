const connection = require('../database/dbConnection');
const { Request } = require('tedious');

const getData = (req, res) => {
    connection.on('connect', (error) => {
        if (!error) {
            let users = [];
            const request = new Request("SELECT * FROM users", (error, rowCount, rows) => {
                if (error) console.log(error);
                else {
                    console.log(rowCount, rows);
                }
            })
            let user = {};
            request.on("row", (columns) => {
                users = [...users, columns];
                // columns.forEach((column) => {
                //     console.log(column);
                // })
            })
            request.on('requestCompleted', () => {
                console.log("Request Finished");
                console.table(users);
                res.json(users);
            })
            connection.execSql(request);
        } else {
            console.log(`Error: ${error}`);
        }
    })
    connection.connect();
}

const inserData = (req, res) => {
    const { name } = req.body;
}


module.exports = {
    getData,
}
