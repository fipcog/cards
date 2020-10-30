const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 0.1%'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.stream());
});

gulp.task('browserify', function() {
    return browserify('./src/js/main.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./src/js_bundle/'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: "src/"
    });
    gulp.watch("src/scss/**/*.scss", gulp.series('sass'));
    gulp.watch("scr/*.html").on('change', () => {
        browserSync.reload();
    });
    gulp.watch("src/js/**/*.js", gulp.series('browserify')).on('change', () => {
        browserSync.reload();
    });
});

gulp.task('default', gulp.series('sass', 'serve'));