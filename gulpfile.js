"use strict";

const gulp = require('gulp'),
  cleanCSS  = require('gulp-clean-css'),
  htmlclean = require('gulp-htmlclean'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify-es').default,
  coffee = require('gulp-coffee'),
  rename = require('gulp-rename'),
  inject = require('gulp-inject'),
  addsrc = require('gulp-add-src'),
   fonts = require('gulp-google-webfonts'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
     gutil = require('gulp-util'),
     autoprefixer = require('gulp-autoprefixer'),
     browserSync = require('browser-sync'),
     htmlreplace = require('gulp-html-replace'),
     cssmin = require('gulp-cssmin');

const paths = {
  vendors: {
    js: [
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/popper.min.js',
      'node_modules/tether/dist/js/tether.min.js',
    ],
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
    ],
    sass: [
      'node_modules/font-awesome/scss/font-awesome.scss',
    ],
  },
  src: {
    root:   'src/',
    html:   'src/**/*.html',
    js:     'src/**/*.js',
    coffee: 'src/**/*.coffee',
    sass:   'src/**/*.scss',
    img:    'src/assets/img/*',
    fonts:  'src/assets/fonts/fonts.list',
  },
  tmp: {
    assets: {
      css:    'tmp/assets/css',
      js:     'tmp/assets/js',
      img:    'tmp/assets/img',
      fonts:  'tmp/assets/fonts',
    },
    dir:   './tmp/',
    index:  'tmp/index.html',
    html:  'tmp/**/*.html',
    root:   'tmp/',
    js:     'tmp/**/*.js',
    css:    'tmp/**/*.css',
    fonts:  'tmp/**/*.woff',
    img:    'tmp/assets/img/*',
  },
  dist: {
    root: 'dist/',
    index:  'dist/index.html',
    html:   'dist/**/*.html',
    assets: 'dist/assets',
    js:     'dist/**/*.js',
    css:    'dist/**/*.css',
  },
};
const reload  = browserSync.reload;
const scriptStream = gulp.src([paths.tmp.js], {read: false});


gulp.task('html:tmp', function () {
  return gulp.src(paths.src.html).pipe(gulp.dest(paths.tmp.root));
});

gulp.task('fonts:tmp', function () {
  return gulp.src(paths.src.fonts)
    	.pipe(fonts({}))
    	.pipe(gulp.dest(paths.tmp.assets.fonts));
});

gulp.task('css:tmp', function () {
  return gulp.src(paths.src.sass)
      .pipe(sass())
      .pipe(concat('style.css'))
      .pipe(gulp.dest(paths.tmp.assets.css));
});

gulp.task('js-vendors:tmp',function () {
  return gulp.src(paths.vendors.js)
  .pipe(concat('includes.min.js'))
  .pipe(gulp.dest(paths.tmp.assets.js));
});

gulp.task('css-vendors:tmp', function () {
  return gulp.src(paths.vendors.sass)
      .pipe(sass())
      .pipe(addsrc(paths.vendors.css))
      .pipe(concat('includes.style.css'))
      .pipe(gulp.dest(paths.tmp.assets.css));
});

gulp.task('js:tmp',function () {
  return gulp.src(paths.src.coffee)
  .pipe(coffee({bare: true}))
  .pipe(addsrc(paths.src.js))
  .pipe(concat('scripts.min.js'))
  .pipe(gulp.dest(paths.tmp.assets.js));
});

gulp.task('img:tmp',function () {
  return gulp.src(paths.src.img)
  .pipe(gulp.dest(paths.tmp.assets.img));
});

gulp.task('copy:tmp', gulp.series('html:tmp', 'fonts:tmp', 'img:tmp',
 'css:tmp', 'css-vendors:tmp', 'js:tmp', 'js-vendors:tmp', function(done) {
  //default
  done();
}));

gulp.task('inject:tmp', gulp.series('copy:tmp', function () {
  var css = gulp.src(paths.tmp.css);
  var js = gulp.src(paths.tmp.js);
  return gulp.src(paths.tmp.index)
    .pipe(inject( css, { relative:true } ))
    .pipe(inject( scriptStream, { relative:true } ))
    .pipe(gulp.dest(paths.tmp.root));
}));

gulp.task('serve',  gulp.series('inject:tmp', function () {
  browserSync({
      server: paths.tmp.root,
      open: true,
      notify: false
  });
}));

gulp.task('watch',  gulp.series('serve', function () {
  gulp.watch(paths.src.root, ['inject:tmp', reload]);
}));

/* Distribution */

gulp.task('html:dist', function () {
  return gulp.src(paths.tmp.html)
  .pipe(htmlclean())
  .pipe(gulp.dest(paths.dist.root));
});

gulp.task('fonts:dist', function () {
  return gulp.src(paths.tmp.fonts)
      .pipe(rename({ dirname: "", }))
    	.pipe(gulp.dest(paths.dist.assets));
});

gulp.task('css:dist', function () {
  return gulp.src(paths.tmp.css)
      .pipe(concat('style.min.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest(paths.dist.assets));
});

gulp.task('js:dist',function () {
  return gulp.src(paths.tmp.js)
  .pipe(uglify())
  .pipe(concat('scripts.min.js'))
  .pipe(gulp.dest(paths.dist.assets));
});

gulp.task('img:dist',function () {
  return gulp.src(paths.tmp.img)
  .pipe(gulp.dest(paths.dist.assets));
});

gulp.task('copy:dist', gulp.series('html:dist', 'fonts:dist', 'img:dist',
'css:dist', 'js:dist', function(done) {
  //default
  done();
}));

gulp.task('inject:dist',  gulp.series('copy:dist', function () {
  const css = gulp.src(paths.dist.css);
  const js = gulp.src([paths.dist.js], {read: false});
  return gulp.src(paths.dist.html)
    .pipe(inject( css, { relative:true } ))
    .pipe(inject( js, { relative:true } ))
    .pipe(gulp.dest(paths.dist.root));
}));

gulp.task('dist', gulp.series('copy:tmp', 'inject:dist'))

gulp.task('clean', gulp.series(function(done) {
    del([paths.tmp.root, paths.dist.root]);
    done();
}));
