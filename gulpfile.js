const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const del = require("del");
var vinylPaths = require('vinyl-paths');

const jsFilesConf = [
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
];

//
// /**
//  * Clean dist dir.
//  */
// gulp.task('clean', () => {
//   return gulp.src('dist')
//     .pipe(vinylPaths(del))
//   }
// );


/**
 * Copy all static files.
 */
gulp.task('copy', () => {
    return gulp.src('./src/icons/**/*')
      .pipe(gulp.dest('./dist/icons'))
  }
);


/**
 * Copy all static files.
 */
gulp.task('babel', () => {
    jsFilesConf.map(file => {
      let src = file.srcPath + file.srcFile;
      return browserify({entries: [src]})
        .transform(babelify)
        .bundle()
        .pipe(source(file.srcFile))
        .pipe(buffer())
        .pipe(gulp.dest(file.dest));
    });
  }
);


/**
 * Build task.
 */
gulp.task('build', gulp.series('copy', 'babel'), function () {
  return gulp;
});


// Watch changes in general and detect when something relevant gets changed.
gulp.task('watch', gulp.series('build'), function () {
  gulp.watch('src/**/*', ['build']);
});

