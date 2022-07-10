const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }
    routes(){
        this.app.use('/', require('../routes/users.routes'));
    }
    listening(){
        this.app.listen(this.port, () => {
            console.log(`Server listening on ${this.port}`);
        });
    }
}

module.exports = Server;