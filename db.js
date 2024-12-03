const mongoose = require("mongoose");

// Define the mongoDB connection URL
const mongoURL = "mongodb://127.0.0.1:27017/Hotel"; // replace 'mydatabase' with your database name

// set up mongoDB connections
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection
// mongoose maintains a default connection object representing the mongoDB connection
const db = mongoose.connection;


// define event listeners for database connections

// Connected event is fired when the connection is successful
db.on('connected', () => {
    console.log("Connected to mongoDB server");
});

// Error event is fired when there is an error in the connection
db.on('error', (err) => {
    console.log("Error in connecting to mongoDB server", err);
});

// Disconnected event is fired when the connection is disconnected
db.on('disconnected', () => {
    console.log("Disconnected from mongoDB server");
});

// export the database connection object

module.exports = db;