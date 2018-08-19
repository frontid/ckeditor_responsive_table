const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const del = require("del");


const paths = {
  scripts: [
    {
      srcFile: "plugin.js",
      srcPath: "./src/",
      dest: "./dist"
    },
    {
      srcFile: "table.js",
      srcPath: "./src/dialogs/",
      dest: "./dist/dialogs"
    }
  ]
};


/**
 * Clean dist dir.
 */
function clean() {
  return del(['dist']);
}


/**
 * Copy all static files.
 */
function copy() {
  return gulp.src('./src/icons/**/*')
    .pipe(gulp.dest('./dist/icons'))
}


/**
 * Converts ES6 code into compatible browser code.
 */
function babelize() {
  paths.scripts.map(file => {
    let src = file.srcPath + file.srcFile;
    browserify({entries: [src]})
      .transform(babelify)
      .bundle()
      .pipe(source(file.srcFile))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(file.dest));
  });

  // Ne need to return a dummy stream to avoid
  // "The following tasks did not complete: /
  // Did you forget to signal async completion?"
  return gulp.src('.');
}

/**
 * Watcher.
 */
function watchTask() {
  return gulp.watch('src/**/*', buildTask);
}

/**
 * Build task.
 */
var buildTask = gulp.series(clean, copy, babelize);

// Define tasks.
exports.build = buildTask;
exports.watch = watchTask;
