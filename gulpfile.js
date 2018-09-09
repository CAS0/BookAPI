var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');

/*
gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: { port:8000 },
        ignore: ['./node_modules/**']
    }).on('restart', function(){
        console.log('restarting');
    });
});
*/

//Using error-first callback style task
function defaultTask(cb) {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: { port:8000 },
        ignore: ['./node_modules/**']
    }).on('restart', function(){
        console.log('restarting');
    });    
    cb();
}

//Using stream  style task
function testTask() {
    env({vars: {ENV:'Test'}});
    return gulp.src('tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}));
}

exports.default = defaultTask;
exports.test = testTask;