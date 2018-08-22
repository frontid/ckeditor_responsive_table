const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const del = require("del");
const sass = require('gulp-sass');

const pluginFile = {
  srcFile: "plugin.js",
  srcPath: "./src/",
  dest: "./dist"
};


/**
 * Clean dist dir.
 */
function cleanTask() {
  return del(['dist']);
}


/**
 * Copy all static files.
 */
function copyTask() {
  return gulp.src('./src/icons/**/*')
    .pipe(gulp.dest('./dist/icons'))
}


/**
 * Converts ES6 code into compatible browser code.
 */
function babelizeTask() {
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


// Compiles sass files and moves the result to dist.
function sassTask() {
  return gulp.src('./src/styles/plugin.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: ['./node_modules/breakpoint-sass/stylesheets']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/styles'));
}

/**
 * Watcher.
 */
function watchTask() {
  gulp.watch('src/**/*', sassTask);
  gulp.watch(['src/**/*', '!src/styles'], buildTask);
}

/**
 * Build task.
 */
let buildTask = gulp.series(
  cleanTask,
  copyTask,
  babelizeTask,
  sassTask
);

// Define tasks.
exports.build = buildTask;
exports.watch = watchTask;
