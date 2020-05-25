var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    del = require('del'), // close text editor before running tasks with del
    svg2png = require('gulp-svg2png');

var config = {
  shape: {
    spacing: {
      padding: 1
    }
  },
  mode: {
    css: {
      variables: {
        replaceSvgWithPng: function() {
          return function(sprite, render) {
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

gulp.task('beginClean', beginClean); // close text editor before running
function beginClean() {
  return del(['./app/temp/sprite', './app/assets/images/sprites']);
};

gulp.task('createSprite', createSprite);
function createSprite() {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite'));
};

gulp.task('createPngCopy', createPngCopy);
function createPngCopy() {
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
}

gulp.task('copySpriteGraphic', copySpriteGraphic);
function copySpriteGraphic() {
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'));
};

gulp.task('copySpriteCSS', copySpriteCSS);
function copySpriteCSS() {
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
};

gulp.task('endClean', endClean); // close text editor before running
function endClean() {
  return del('./app/temp/sprite');
};

gulp.task('icons', gulp.series('beginClean', 'createSprite', 'createPngCopy', gulp.parallel('copySpriteGraphic', 'copySpriteCSS'), 'endClean')); // close text editor before running
