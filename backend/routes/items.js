// requiring express router and item model
const router = require('express').Router();
let Item = require('../models/item.model');

// Item Server API Endpoints

// handles incoming http get requests
// http://localhost:5000/items/
router.route('/').get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

// handles incoming http post requests
// http://localhost:5000/items/add
router.route('/add').post((req, res) => {
    // get the properties of the item from the request body
    const username = req.body.username;
    const description = req.body.description;
    const cost = Number(req.body.cost);
    const link = req.body.link;
    const date = Date.parse(req.body.date);
    // create new item instance with properties from the request
    const newItem = new Item({
        username,
        description,
        cost,
        link,
        date,
    });

    newItem.save()
        .then(() => res.json('Item added to wishlist'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// :id GET endpoint
// http://localhost:5000/items/:id
router.route('/:id').get((req, res) => {
    Item.findById(req.params.id)
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

// handles http delete requests with id to delete specific id
// http://localhost:5000/items/:id
router.route('/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// handles http update requests with id to update specific id
// http://localhost:5000/items/update/:id
router.route('/update/:id').post((req, res) => {
    Item.findById(req.params.id)
        .then(items => {
            items.username = req.body.username;
            items.description = req.body.description;
            items.cost = Number(req.body.cost);
            items.link = req.body.link;
            items.date = Date.parse(req.body.date);

            items.save()
                .then(() => res.json('Item has been updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// node.js exporting router
module.exports = router