const express = require('express') // Import the Express.js framework
const mongoose = require('mongoose'); // Import the Mongoose library for MongoDB interaction

const bergRouter = require ("./routes/berg.route.js");

const app = express(); // Create an Express application instance
const cors = require('cors');
app.use(cors());


app.use(express.json());

app.use ("/api/berg", bergRouter);


const port = 3000; // Define the port number for the server to listen on

// Connect to the MongoDB database
mongoose.connect("mongodb+srv://Student24:supersecret@home24.r0wcq.mongodb.net/?retryWrites=true&w=majority&appName=Home24", {dbName: 'home24' })
    .then(() => {   // If the connection is succesful
        console.log("Connected to the database!");
        app.listen(port, () => {  // Start the server and listen on the specified port
            console.log(`Example app listening on port ${port}`);
        });
    })
    .catch(() => {   // If there's an error connecting to the database
        console.log("Failed to connect to the database.");  
    });