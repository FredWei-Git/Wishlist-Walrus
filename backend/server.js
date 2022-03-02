// include node.js modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// configures environment variables in .env file
require('dotenv').config();

// create express server
const app = express()
const port = process.env.PORT || 5000;

// cors middleware
app.use(cors());
app.use(express.json()); // parse json, server will be sending and receiving json

// connecting to mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// starts server/listening to a port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});