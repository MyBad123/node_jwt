const express = require('express');
const db = require('./db');

const port = 4000;
let app = express();

db.connect("mongodb://127.0.0.1:27017/myusers");

app.get('/', (req, res) => {
    res.send("hello");
})
app.listen({port}, () => {
    console.log('it is run');
})