require('dotenv').config();
const express = require("express");

const port = [process.env.PORT];
const app = express();

app.get("/", (req, res)=>{
    return "hello world"
})


app.listen(port, () => {
    console.log(`Listen on port ${port}`)
})

