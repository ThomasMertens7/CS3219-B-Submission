// Import express
import express from 'express';
// Import Body parser
import bodyParser from 'body-parser';
// Import Mongoose
import mongoose from 'mongoose';
// Initialise the app
import cors from 'cors'
let app = express();

app.use(cors())


// Import routes
import apiRoutes from './api-routes.js';
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost:27017/footballTeams');
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

export default app;