const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoPrefixer = require('gulp-autoprefixer');

function css() {
    return gulp
    .src('scss/*.scss')
    .pipe(autoPrefixer())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('css'))
}

function watch() {
    gulp.watch('scss/*.scss', css)
    gulp.watch('index.html')
}

gulp.task('css', css);
gulp.task('watch', gulp.parallel(watch));