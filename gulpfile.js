//  TODO:
//    Review: https://github.com/kogakure/gulp-tutorial/
var
  browserSync =   require('browser-sync').create(),
  gulp =          require('gulp'),
  watch =         require('gulp-watch'),
  less =          require('gulp-less'),
  plumber =       require('gulp-plumber'),
  minifyCSS =     require('gulp-clean-css'),
  uglify =        require('gulp-uglify'),
  htmlmin =       require('gulp-htmlmin'),
  htmlreplace =   require('gulp-html-replace'),
  rename =        require('gulp-rename'),
  size   =        require('gulp-size');

var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');

gulp.task('svgstore', function () {
    return gulp
        .src('./svg/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore(({ inlineSvg: true })))
        .pipe(gulp.dest('svg/build'));
});

/*******************************************/
/* Less tasks                              */
/*******************************************/
/* Compile less files */
gulp.task('less', function () {
  return gulp.src('./less/site.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest('./css/'));
});

/* Watch for changes in .less files */
gulp.task('watch', function () {
  return gulp.watch('./less/**/*.less', ['less']);
});

/*******************************************/
/* Build tasks                             */
/*******************************************/
//  TODO:
//    - prefix css

/*  Minify css */
gulp.task('minify:css', function () {
  return gulp.src('./css/site.css')
    .pipe(minifyCSS())
    .pipe(rename('site.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

/*  Minify js */
gulp.task('minify:js', function() {
  return gulp.src('./js/site.js')
    .pipe(uglify({
        optimizationLevel: 3,
        progessive: true,
        interlaced: true
      }))
    .pipe(rename('site.min.js'))
    .pipe(gulp.dest('./dist/js'));
});

/*  Minify html */
gulp.task('minify:html', function() {
  return gulp.src('./*.html')
    .pipe(htmlreplace({
      'css': 'css/site.min.css',
      'js': 'js/site.min.js'
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

/* Copy fonts, images and other files */
gulp.task('copy:assets', function(){
  gulp.src('./fonts/*.*').pipe(gulp.dest('./dist/fonts'));
  gulp.src('./img/*.*').pipe(gulp.dest('./dist/img'));
  gulp.src('./favicon.ico').pipe(gulp.dest('./dist'));
});

/*******************************************/
/* BrowserSync Server tasks                */
/*******************************************/
/* Serve files from dist folder */
gulp.task('run', function() {
    return browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

/*******************************************/
/* Build web site                          */
/*******************************************/
gulp.task('build', ['less', 'minify:css', 'minify:js', 'minify:html', 'copy:assets']);

/*******************************************/
/* Build web site and serve files          */
/*******************************************/
gulp.task('server', ['build', 'browser-sync']);

/*******************************************/
/* Default task: Compile less and watch    */
/* for changes on less files               */
/*******************************************/
gulp.task('default', ['less', 'watch']);
