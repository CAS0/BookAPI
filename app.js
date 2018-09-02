var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var app = express();
var port = process.env.port || 3000;

var db = mongoose.connect('mongodb://localhost/BookAPI', {useNewUrlParser:true});
var Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var bookRouter = require('./routes/bookRoutes')(Book);
app.use('/api', bookRouter);

app.get('/', function(req, res) {
    res.send('welcome to my api');
})

app.listen(port, function(){
    console.log('gulp is running my api on port: ' + port)
})