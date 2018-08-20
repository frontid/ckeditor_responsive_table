const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const del = require("del");

const pluginFile = {
  srcFile: "plugin.js",
  srcPath: "./src/",
  dest: "./dist"
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
  let src = pluginFile.srcPath + pluginFile.srcFile;

  // By pattern.
  //return browserify({entries:  entries: globby.sync(["index.js", "src/**/*.js"])})

  return browserify({entries: [src]})
    .transform(babelify)
    .bundle()
    .pipe(source(pluginFile.srcFile))
    .pipe(buffer())
    // .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(pluginFile.dest));

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
