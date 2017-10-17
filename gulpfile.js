"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

gulp.task("style", function () {
  gulp.src("assets/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          "last 2 versions"
        ]
      })
    ]))
    .pipe(gulp.dest("assets/css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function () {
  server.init({
    server: ".",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("components/**/*.{scss,sass}", ["style"]);
  gulp.watch("components/**/*.js").on("change", server.reload);
  gulp.watch("*.html").on("change", server.reload);
  gulp.watch("components/**/*.html").on("change", server.reload);
  gulp.watch("assets/js/*.js").on("change", server.reload);
});
