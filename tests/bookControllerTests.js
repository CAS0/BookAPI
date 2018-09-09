var should = require('should');
var sinon = require('sinon');

describe('Book controller tests', function() {
    describe('Creation of a new book [POST verb]', function() {
        it('Title is required', function() {
            //setup test data
            var Book = function(book) {this.save = function(){}};

            var req = {
                body: {
                    author: "Doug Naylor"
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            //run the test
            var bookController = require('../controllers/bookController')(Book);
            bookController.post(req, res);

            //test assertions
            res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0][0]);
            res.send.calledWith("Title is required").should.equal(true);

        })
    })
})