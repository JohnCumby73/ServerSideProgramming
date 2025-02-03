const express = require('express');  // Import the Express.js Framework
const mongoose = require("mongoose"); // Import the Mongoose library for MongoDB interaction

const courseRoute = require ("./routes/course.route.js");
const studentRoute = require ("./routes/student.route.js");

const app = express();  // Create an Express application instance
const cors = require('cors');
app.use(cors());

// Define a route for the root URL ('/')
// app.get() -- Method provided by the Express app object. It tells the application to listen for GET requests made to a specific path.
//  -- '/' First argument to app.get(). It specifies the route or path that this handler will respond to. / represents the root URL.
//  -- (req, res) Second argument to app.get(). It's a callback function that is executed when a GET request is made to the / path.
// res.send('Hello, World!');   // Uses the send() method of the res object to send the text back to the client as a response.   


app.use(express.json());

app.use ("/api/courses", courseRoute);
app.use ("/api/students", studentRoute);

app.get('/', (req, res) => {
    res.send('Hello, World!');   // Send a simple text response
});


// Query/Retrieve all records by Name
// app.get('/api/course/name=:name', async (req, res) => {
//     try {
//         const courses = await Course.find ({courseName:req.params.name});
//         res.status(200).json(courses);
//     }
//     catch (err) {
//         res.status(500).json({message: err.message});
//     }
// });

// ---------------------- Handling Update Messages
// Update All records
// app.put('/api/courses', async (req, res) => {
//     try {
//         const courses = await Course.updateMany({}, req.body);
//         res.status(200).json(courses)
//     }
//     catch (err) {
//         res.status(500).json({message: err.message});
//     }
// })


// Update all records by Name
// app.put('/api/courses/name=:name', async (req, res) => {
//     try {
//         const courses = await Course.updateMany ({courseName:req.params.name}, req.body);
//         res.status(200).json(course);
//     }
//     catch (err) {
//         res.status(500).json({message: err.message})
//     }
// })

// -------------------------------- Handling Delete Messages

// Delete All Records
// app.get ('/api/courses', async (req, res) => {
//     try {
//         const courses = await Course.deleteMany ({});
//         res.status(200).json(courses);
//     }
//     catch (err) {
//         res.status(500).json({message: err.message});
//     }
// })


// Delete all records by name
// app.delete ('/api/courses/name=:name', async (req, res) => {
//     try {
//         const course = await Course.deleteMany({courseName:req.params.name});
//         res.status(200).json(course);
//     }
//     catch (err) {
//         res.status(500).json({message: err.message})
//     }
// })
const port = 3000;  // Define the port number for the server to listen on

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
