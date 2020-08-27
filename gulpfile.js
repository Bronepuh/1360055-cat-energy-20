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
    .pipe(rename("style-min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

//Sprite

const sprite = () => {
  return gulp.src(["source/img/**/icon-*.svg", "source/img/htmlacademy.svg"])
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"))
}

exports.sprite = sprite;

// Server-dev

const server1 = (done) => {
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

exports.server = server1;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

//Clean

const clean = () => {
  return del("build");
}

exports.clean = clean;

//Copy

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico",
    "source/*.html",
    "source/css/**",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
}

exports.copy = copy;

const image = () => {
  return gulp.src("source/img/**/*.{jpg,jpeg,png}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"))
    .pipe(sync.stream());
}

exports.image = image;

//Start-dev

exports.dev = gulp.series(
  styles,
  server1,
  watcher
);

// Promotion

//Build

exports.build = gulp.series(
  clean,
  copy
);

//Server-pro

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

//Start-build

exports.default = gulp.series(
  clean,
  copy,
  image,
  server
);
