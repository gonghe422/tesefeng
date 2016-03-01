var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css'); //压缩css文件
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var uglify = require("gulp-uglify"); //压缩js
var jshint = require("gulp-jshint");
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};
//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function () {
  gulp.watch(['./www/**/*.html'], ['html']);
});

//使用connect启动一个Web服务器
gulp.task('connect', function () {
  connect.server({
    //root: './www',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./www/**/*.html')
    .pipe(connect.reload());
});
//js错误代码检测
gulp.task('jsLint', function() {
  gulp.src('www/js/*/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter()); // 输出检查结果
});
//压缩css文件
gulp.task('minify-css', function() {
  gulp.src('www/css/*.css') // 要压缩的css文件
    .pipe(rename({suffix: '.min'})) //rename压缩后的文件名
    .pipe(minifyCss()) //压缩css
    .pipe(gulp.dest('www/dist/css'));
});


//压缩js文件
gulp.task('rename', function() {
  gulp.src('www/js/app.js')
    .pipe(uglify()) //压缩
    .pipe(rename('app.min.js')) //会将1.js重命名为1.min.js
    .pipe(gulp.dest('www/dist/js'));
});


//JS 合并压缩
gulp.task('minifyjs', function() {
    return gulp.src('www/js/*/*.js')
        .pipe(concat('main.js'))                  //合并所有js到main.js
        .pipe(gulp.dest('minified/js'))           //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))           //rename压缩后的文件名
        .pipe(uglify())                           //压缩
        .pipe(gulp.dest('www/dist/js'));          //输出
});

//合并js
gulp.task('concat', function() {
  gulp.src('www/js/*/*.js') //要合并的文件
    .pipe(concat('all.js')) // 合并匹配到的js文件并命名为 "all.js"
    .pipe(gulp.dest('www/dist/js'));
});

//gulp.task('default', ['sass']);
//运行Gulp时，默认的Task
gulp.task('default', ['connect', 'watch']);



gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

// gulp.task('watch', function() {
//   gulp.watch(paths.sass, ['sass']);
// });

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
