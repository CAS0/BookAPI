var express = require('express');

var routes = function(Book){
    var bookRouter = express.Router();
    var bookController = require('../controllers/bookController')(Book);

    bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

    //middle ware to perform a book find in a reusable fashion
    bookRouter.use('/:id', function(req, res, next){
        Book.findById(req.params.id, function(err, book){
            if (err)
                res.status(500).send(err);
            else if (book)
            {
                req.book = book;
                next();
            }
            else
            {
                res.status(404).send("Book not found.");
            }
        });
    });

    bookRouter.route('/:id')
    .get(function(req, res){
        var returnBook = req.book.toJSON();
        returnBook.links = {};
        returnBook.links.FilterByThisGenre = encodeURI('http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre);
        returnBook.links.self = encodeURI('http://' + req.headers.host + '/api/books/' + returnBook._id);
        res.render('book', { title: 'Book details', book: returnBook });//res.json(returnBook);
    })
    .put(function(req, res){
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;
        req.book.save(function(err){
            if (err)
                res.status(500).send(err);
            else
                res.json(req.book);
        });
    })
    .patch(function(req, res){
        if (req.body._id)
            delete req.body._id;

        for (var p in req.body)
        {
            req.book[p] = req.body[p];
        }

        req.book.save(function(err){
            if (err)
                res.status(500).send(err);
            else
                res.json(req.book);
        });
    })
    .delete(function(req, res){
        req.book.remove(function(err){
            if (err)
                res.status(500).send(err);
            else
                res.status(204).send("Book removed.");
        });
    });

    return bookRouter;
};

module.exports = routes;