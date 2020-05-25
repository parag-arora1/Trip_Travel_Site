var gulp = require('gulp'), // needed by both
    // watch
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();
    // styles
    /* postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    mixins = require('postcss-mixins'),
    hexrgba = require('postcss-hexrgba'),
    // scripts
    webpack = require('webpack'),
    modernizr = require('gulp-modernizr'); */

// watch
gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  watch('./app/index.html', function() {
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', gulp.series('styles', 'cssInject'));

  watch('./app/assets/scripts/**/*.js', gulp.series('modernizr', 'scripts'));

});

gulp.task('cssInject', function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});
