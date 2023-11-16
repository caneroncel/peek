var gulp = require('gulp');
var strip = require('gulp-strip-comments'); // strip comments
var terser = require('gulp-terser'); // minify js
var concat = require('gulp-concat');
var headerComment = require('gulp-header-comment'); //add header comment
var signature = " Project: Peek JS Notification\n Author: Caner ONCEL (@caneroncel)\n https://github.com/caneroncel/peek";

var peektask = [
    'peek.js'
];

/* Page */
gulp.task("peektask", async function () {

    var timestamp= Date.now();
    var datetime= new Date(timestamp).toLocaleString();

    let page = gulp.src(peektask)
        .pipe(concat("peek.min.js"))
        .pipe(strip())
        .pipe(terser())
        .pipe(headerComment(signature + "\n\n" + "Version: 1.0.0\n" + datetime))
        .pipe(gulp.dest("."));

    return [page];

});
