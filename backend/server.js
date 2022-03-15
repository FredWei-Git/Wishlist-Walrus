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

// use the route files
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');

// add the files as middleware
app.use('/items', itemsRouter);
app.use('/users', usersRouter);

// heroku 
app.use(express.static(path.join(__dirname, "client/build")));
// Handle React routing, return all requests to React app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// starts server/listening to a port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});