var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	nodemon = require('gulp-nodemon');

gulp.task('default', ['watch']);

gulp.task('build-js', function () {
    gulp.src('./public/js/**/*.js')
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/build'));
});

gulp.task('server', function () {
  nodemon({
    script: 'app.js'
  })
});

gulp.task('watch', ['build-js', 'server'], function() {
	gulp.watch('./public/js/**/*.js', ['build-js']);
});