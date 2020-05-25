var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    webpack = require('webpack');

gulp.task('scripts', function (done) {
  webpack(require('../../webpack.config.js'), function (err, stats) {
    if (err) {
      console.log(err.toString());
    }

    console.log("\n" + stats.toString() + "\n");

    browserSync.reload();
  });
  done();
});
/*
gulp.task('scriptsRefresh', scriptsRefresh);
function scriptsRefresh() {
  browserSync.reload();
};
*/
