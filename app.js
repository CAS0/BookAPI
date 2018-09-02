var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var app = express();
var port = process.env.port || 3000;
var bookRouter = express.Router();

var db = mongoose.connect('mongodb://localhost/BookAPI', {useNewUrlParser:true});
var Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

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

app.use('/api', bookRouter);

app.get('/', function(req, res) {
    res.send('welcome to my api');
})

app.listen(port, function(){
    console.log('gulp is running my api on port: ' + port)
})