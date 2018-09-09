var mongoose = require('mongoose');
var schema = mongoose.Schema;

var bookModel = new schema({
    title: {type: String}, //, required: [true, 'Title is required']},
    author: {type: String},
    genre: {type: String},
    read: {type: Boolean, default:false}
});

module.exports = mongoose.model('Book', bookModel);