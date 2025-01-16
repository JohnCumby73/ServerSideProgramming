const express = require('express');
const mongoose = require("mongoose");

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = 3000;

mongoose.connect('mongodb://Student24:Student24@logan', {dbName: 'home24' })
    .then(() => {
        console.log("Connected to the database!");
        app.listen(port, () => {
            console.log("Example app listening on port ${port}");
        });
    })
    .catch(() => {
        console.log("Failed to connect to the database.");
    });
