const gulp = require('gulp');
const debug = require('gulp-debug');
const rename = require('gulp-rename');
const defaultTheme = require('./src/plugins/gulp-default-theme');
const scssToJson = require('./src/plugins/gulp-scss-to-json');

gulp.task('default-theme', () => {
  return gulp
    .src('./src/styles/variables.scss')
    .pipe(debug({ title: 'Generating theme:' }))
    .pipe(defaultTheme({}))
    .pipe(rename('styled.d.ts'))
    .pipe(gulp.dest('./src/types'));
});

gulp.task('theme', () => {
  return gulp
    .src('./src/styles/variables.scss')
    .pipe(debug({ title: 'Generating theme:' }))
    .pipe(scssToJson())
    .pipe(rename('theme.json'))
    .pipe(gulp.dest('./src/styles'));
});

gulp.task('default', gulp.parallel('theme', 'default-theme'));
