var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', done => {
      gulp.src('./src/scss/*.scss')
      .pipe(plumber())
      .pipe(autoprefixer())
      .pipe(sass())
      .pipe(gulp.dest('./src/css'))
      done()
    });

    gulp.task('log', done => {
      console.log("DONE")
      done()
    });

    gulp.task('watch', () => {
      gulp.watch('./src/scss/*.scss', gulp.series('sass','log'));
    })

    gulp.task("default",
      gulp.series(
        'watch'
      )
    );