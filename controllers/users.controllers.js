const connection = require('../database/dbConnection');
const { Request } = require('tedious');

const excectQuery = (connection) => {
    data = [];
    const request = new Request('SELECT * FROM users', (error, rowCount) => {
        if (error) {
            console.log(error);
        }
        // console.log(rowCount)
        request.on('row', (columns) => {
            console.log(columns)
        })


    })
    request.on("requestCompleted", () => {
        connection.close();
        return data;
    })
    connection.execSql(request);
}

const getData = (request, response) => {
    let data = [];
    connection.connect();
    connection.on('connect', (error) => {
        if (!error) {
            excectQuery(connection);
            // console.log(data)
        } else {
            console.log(`Error: ${error}`);
        }
    })
    response.json(data)
}


module.exports = {
    getData,
}
