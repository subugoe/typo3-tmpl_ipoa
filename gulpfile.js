// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var scsslint = require('gulp-scss-lint');
var autoprefixer = require('gulp-autoprefixer');


// JS hint task
gulp.task('jshint', function() {
  gulp.src('./Resources/Public/Javascript/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


// Uglify task
gulp.task('compress', function() {
  return gulp.src('./Resources/Public/Javascript/ipoa.js')
    .pipe(concat('ipoa.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./Resources/Public/Javascript'))
    .pipe(notify({message: 'Finished minifying Javascript'}));
});

// Build css
// not working yet
gulp.task('sass', function() {
  return gulp.src('./Resources/Private/Scss/style.scss')
    .pipe(sass({
      outputStyle: 'compressed',
        onError: function(error) {errorHandler('Sass', error)}
      }))
      .pipe(autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./Resources/Public/Css/'));
});

gulp.task("sasslint", function() {
  return gulp.src('Resources/Private/Scss/*.scss')
    .pipe(scsslint({
      bundleExec: true,
        config: 'Resources/Private/Scss/.scss-lint.yml'
      }));
});

function errorHandler(title, error) {
  if (typeof error.file === 'undefined') error.file = '?'
  if (typeof error.line === 'undefined') error.line = '?'
  if (typeof error.column === 'undefined') error.column = '?'
  console.log(color(title + ' Error: ' + error.message, 'red') + '\nFile: ' + error.file + '\nLine: ' + error.line + '\nColumn: ' + error.column);
}

function color(string, color) {
  var prefix
  switch (color) {
    case 'red': prefix = '\033[1;31m'; break; // and bold
    case 'green': prefix = '\033[0;32m'; break;
  }
  return prefix + string + '\033[0m'
}

gulp.task('default', ['jshint', 'sasslint', 'sass'], function() {});
