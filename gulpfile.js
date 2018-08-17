const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

/**
 * Copy all static files.
 */
gulp.task('babel', () =>
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
);

/**
 * Copy all static files.
 */
gulp.task('copy', () =>
  gulp.src('./src/icons/**/*').pipe(gulp.dest('./dist/icons'))
);


/**
 * Build task.
 */
gulp.task('build', ['copy', 'babel']);
