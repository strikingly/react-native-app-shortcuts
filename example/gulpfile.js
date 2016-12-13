var gulp = require('gulp')
var ts = require('gulp-typescript')
var tslint = require("gulp-tslint")

// Grab settings from tsconfig.json
var tsProject = ts.createProject('./tsconfig.json')
// var commonProject = ts.createProject('../tsconfig.json')
// var imageOptim = require('gulp-imageoptim')

// gulp.task('lint-common', function() {
//   return gulp.src(['./src/common/**/*.ts'])
//     .pipe(tslint({configuration: "../tslint.json"}))
//     .pipe(tslint.report("verbose", {
//       emitError: false,
//       summarizeFailureOutput: true,
//     }))
// })

gulp.task('lint', function() {
  return gulp.src(['./src/**/*.ts'])
    .pipe(tslint({
      configuration: "../tslint.json",
      formatter: "verbose",
    }))
    .pipe(tslint.report({
      emitError: false,
      summarizeFailureOutput: true,
    }))
})

// gulp.task('lint', ['lint-common', 'lint-native'])

// build the common used code and then put into build/common for native code to use
// gulp.task('build-common', function() {
//   return gulp.src(['./src/common/**/*.ts', "../typings/index.d.ts"])
//     .pipe(ts(commonProject))
//     .js
//     .pipe(gulp.dest('built/common'))
// })

// gulp.task('build', ['build-common', 'copyAssets'], function() {
gulp.task('build', ['copyAssets'], function() {
  return gulp.src(['./src/**/*.ts', './src/**/*.tsx', "./typings/index.d.ts"],
                  { followSymlinks: false })
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('built'))
})

gulp.task('copyAssets', function() {
  return gulp.src(['./src/**/*.{png,jpeg,jpg,ico,gif}', './src/**/*.json'])
             .pipe(gulp.dest('./built'))
})

// gulp.task('optimAssets', function() {
//   return gulp.src(['./src/**/*.{png,jpeg,jpg,ico,gif}'], {base: './'})
//     .pipe(imageOptim.optimize())
//     .pipe(gulp.dest('./'))
// })

gulp.task('watch', ['build'], function() {
  gulp.watch('src/**/*.ts', ['build'])
  gulp.watch('src/**/*.tsx', ['build'])
  // gulp.watch('../common/**/*.ts', ['build'])
  // gulp.watch('../common/**/*.tsx', ['build'])
})

gulp.task('default', ['build'])
