var express = require('express');

var routes = function(Book){
    bookRouter = express.Router();

    bookRouter.route('/books')
    .post(function(req, res){
        var book = new Book(req.body);
        book.save();
        res.status(201).send(book);
    })
    .get(function(req, res){
        
        var query = {};
        if (req.query.genre)
        {
            query.genre = req.query.genre;
        }

        Book.find(query, function(err, books){
            if (err)
                res.status(500).send(err);
            else
                res.json(books);
        })
    });

    bookRouter.route('/books/:id')
    .get(function(req, res){
        Book.findById(req.params.id, function(err, book){
            if (err)
                res.status(500).send(err);
            else
                res.json(book);
        })
    });

    return bookRouter;
};

module.exports = routes;