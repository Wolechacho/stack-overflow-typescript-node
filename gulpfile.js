"use strict";
let gulp = require("gulp");
let typescript = require("gulp-typescript");
let tslint = require("gulp-tslint");
let sourcemaps = require("gulp-sourcemaps");
let rimraf = require("rimraf");


const TSLINT = "tslint";
const TS_SRC_GLOB = "./src/**/*.ts";
const TS_GLOB = [TS_SRC_GLOB];
const COPY_STATIC_FILES = "copy:static";
const STATIC_FILES = ['./src/**/*.json'];
const COMPILE_TYPESCRIPT = "compile:typescript";
const BUILD = "build";
const CLEAN_BUILD = "clean:build";

const tsProject = typescript.createProject("tsconfig.json");

// Removes the ./build directory with all its content.
gulp.task(CLEAN_BUILD, function (callback) {
    rimraf("./build", callback);
});

// Checks all *.ts-files if they are conform to the rules specified in tslint.json.
gulp.task(TSLINT, function () {
    return gulp.src(TS_GLOB)
        .pipe(tslint({formatter: "verbose" }))
        .pipe(tslint.report({
            // set this to true, if you want the build process to fail on tslint errors.
            emitError: false
        }));
});


// Compiles all *.ts-files to *.js-files.
gulp.task(COPY_STATIC_FILES, function () {
    return gulp.src(STATIC_FILES)
        .pipe(gulp.dest("dist"));
});

gulp.task(COMPILE_TYPESCRIPT, function () {
    return gulp.src(TS_GLOB)
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write(".", {sourceRoot: "../src"}))
        .pipe(gulp.dest("dist"));
});

// Runs all required steps for the build in sequence.
gulp.task(BUILD, gulp.series(CLEAN_BUILD, TSLINT, COMPILE_TYPESCRIPT, COPY_STATIC_FILES));