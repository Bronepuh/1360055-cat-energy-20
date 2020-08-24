const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require('gulp-csso');
const rename = require("gulp-rename");
const webp = require('gulp-webp');
const del = require('del');
const svgstore = require('gulp-svgstore');

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

//CSS

const css = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style-min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.css = css;

//Sprite

const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"))
}

exports.sprite = sprite;

//Html

const html = () => {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"))
}

exports.html = html;

//Webp

gulp.task('webp', () =>
  gulp.src("source/img/**/*.{jpg,gpeg,png}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"))
);

//Copy

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))

}

exports.copy = copy;

//Clean

const clean = () => {
  return del("build");
}

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

//Build

exports.build = gulp.series(
  clean,
  copy,
  css,
  sprite,
  html
);

//Start

exports.default = gulp.series(
  styles,
  server,
  watcher
);
