/*
* author: pace_zhong@foxmail.com
* desc: priceMatch
* date: 2018-03-09
*/
const gulp = require('gulp');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const colors= require('colors');
const pump = require('pump');
const fs = require('fs');
const gulpif = require("gulp-if");

// 定义打包文件路径
const src='./',
      js=src+'scripts',
      img=src+'images',
      css=src+'css',
      dist='./dist',
      distJs=dist+'/scripts',
      distCss=dist+'/css',
      distImg=dist+'/images';

/* ---------------- dev task ----------------- */
gulp.task('scss',() => {
  // 编译scss文件
  return gulp.src(css+'/**/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest(css));
});

/* ---------------- release task ---------------- */

gulp.task('clean',() => {
  // 清空dist目录
  return gulp.src(dist, {read: false})
      .pipe(clean());
});

// 发布
gulp.task('release',['clean'], function (cb) {

  gulp.src(img+'/*.*').pipe(gulp.dest(distImg));

  gulp.src(src+'/index.html').pipe(gulp.dest(dist));

  gulp.src(css+'/**/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest(distCss));

  pump(
    [
      gulp.src(js+'/**/*.js'),
      uglify(),
      gulp.dest(distJs)
    ]
  );

});
