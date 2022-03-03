// mongoose database schema for items
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    link: { type: String, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;