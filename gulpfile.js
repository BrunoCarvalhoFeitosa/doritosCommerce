//Variables
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;
const imageMin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

//Task to transform pug in html and build file in browser
gulp.task("pug", () => {
    return gulp.src("src/templates/*.pug")
        .pipe(pug({
            pretty: false
        }))
        .pipe(gulp.dest("build"))
        .pipe(browserSync.stream());
});

//Task to transform scss in css and build file in browser
gulp.task("sass", () => {
    return gulp.src("src/scss/**/**/*.scss")
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream())
});

//Task to uglify js and build file in browser
gulp.task("uglify", () => {
    return gulp.src("src/js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("build/js"))
        .pipe(browserSync.stream());
});

//Task to minify images
gulp.task("imageMin", () => {
    return gulp.src("src/images/*")
        .pipe(imageMin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
        }))
        .pipe(gulp.dest("build/images"));
});

//Task to watch all the changes in files and generate build
gulp.task("watch", () => {
    browserSync.init({
        server: "build"
    });

    gulp.watch("src/templates/**/*.pug", gulp.series("pug"));
    gulp.watch("src/scss/**/*.scss", gulp.series("sass"));
    gulp.watch("src/js/**/*.js", gulp.series("uglify"));
    gulp.watch("src/images/**/*", gulp.series("imageMin"));
    browserSync.reload();
});

//Task default to execute all task in lote and order
gulp.task("default", gulp.series("pug", "sass", "uglify", "imageMin", "watch"));