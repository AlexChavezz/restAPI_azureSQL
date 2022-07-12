const { Request, TYPES, Connection } = require('tedious');
const config = require('../database/db.config');

const getData = (req, res) => {
    const connection = new Connection(config)
    connection.on('connect', (error) => {
        if (!error) {
            let users = [];
            const request = new Request("SELECT * FROM persons", (error, rowCount, rows) => {
                if (error) console.log(error);
                else {
                    console.log(rowCount, rows);
                }
            })
            let user = {};
            request.on("row", (columns) => {
                // users = [...users, columns];
                columns.forEach((column) => {
                    user[column.metadata.colName] = column.value;
                    users = [...users, user];
                })
            })
         
            request.on('requestCompleted', () => {
                console.log("Request Finished");
                connection.close();
                res.json(users);
            })
            connection.execSql(request);
        } else {
            console.log(`Error: ${error}`);
        }
    })
    connection.connect();
}



const executeStatment = (connection, { email, password }) => {
    const request = new Request("INSERT INTO persons (email, password) VALUES (@email, @password);", (error) => {
        if (error) {console.log(`REQUEST ERROR: ${error}`)};
    });
    request.addParameter('email', TYPES.NVarChar, email);
    request.addParameter('password', TYPES.NVarChar, password);
    request.on('requestCompleted', () => {
        console.log("User added successfully");
        connection.close();
    });

    connection.execSql(request);
}

const insertData = (req, res) => {
    const connection = new Connection(config);
    const { email, password } = req.body;
    connection.on('connect', (error) => {
        if (error) {
            console.log(`Error: ${error}`);
        } else {
            executeStatment(connection, {email, password});
            // connection.execSql(request);
            res.json({
                ok: true, 
                msg:"user created successfully",
            })
        }
    })
    connection.connect();
}


module.exports = {
    getData,
    insertData
}
