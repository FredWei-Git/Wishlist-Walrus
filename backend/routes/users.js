// requiring express router and user model
const router = require('express').Router();
let User = require('../models/user.model');

// User Server API Endpoints

// handles incoming http get requests
// http://localhost:5000/users/
router.route('/').get((req, res) => {
    User.find() // mongoose query method that gets all user documents
        .then(users => res.json(users)) // .find() returns a promise where a response with json users is sent
        .catch(err => res.status(400).json('Error: ' + err)); // error message is sent
});

// handles incoming http post requests
// http://localhost:5000/users/add
router.route('/add').post((req, res) => {
    const username = req.body.username; // username is taken from the request body
    const newUser = new User({ username }); // create a new instance of user with the username from the request
    newUser.save() // newUser is saved to the database using the .save() method
        .then(() => res.json('User has been added')) // returns json with message saying user has been added
        .catch(err => res.status(400).json('Error: ' + err)); // error message
});

// node.js exporting router
module.exports = router;