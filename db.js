const mongoose = require("mongoose");
require("dotenv").config(); // require the dotenv module used for storing sensitive info

// Define the mongoDB connection URL
const mongoURL = "mongodb://127.0.0.1:27017/Hotel"; // replace 'mydatabase' with your database name
// const mongoURL = process.env.MONGODB_URL_LOCAL; // accessing the local mongoDB server from the .env file
// const mongoURL = "mongodb+srv://riddhidhara2003:qwerty12345@cluster0.dfkhr.mongodb.net/"; // here saving my local database server online on mongodb atlas
// const mongoURL = process.env.MONGODB_URL; // calling the mongoURL from the .env file

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