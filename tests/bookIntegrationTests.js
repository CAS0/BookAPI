var should = require('should'),
    supertest = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = supertest.agent(app);

describe('Book CRUD Test', function(){
    it("Should allow a book to be created and return an id and read=false.", function(done){
        var bookBody = {title: "New Book", author: "Tony Caso", genre: "Fiction"};

        agent.post('/api/books')
            .send(bookBody)
            .expect(200)
            .end(function(err, results){
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            })
    })

    afterEach(function(done){
        Book.deleteOne().exec();
        done();
    })
})