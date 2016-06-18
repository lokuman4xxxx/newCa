/**
 *
 * @authors Your Name (you@example.org)
 * @date    2016-04-22 09:56:03
 * @version $Id$
 */

// 引入gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint'); //检查js
var sass = require('gulp-sass'); //编译Sass
var concat = require('gulp-concat'); //合并
var uglify = require('gulp-uglify'); //uglify 组件（用于压缩 JS）
var rename = require('gulp-rename'); //重命名
var cleanCSS = require('gulp-clean-css'); //压缩 CSS
var autoprefixer = require('gulp-autoprefixer'); //自动检测添加CSS前缀
var browserSync = require('browser-sync').create(); //浏览器同步刷新
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); //图片压缩
var del = require('del');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

var htmlSrc = 'src/*.html';
var cssSrc = 'src/scss/*.scss';
var cssDest = 'dist/css';
var jsSrc = 'src/js/*.js';
var jsDest = 'dist/js';
var imgSrc = 'src/img/*';
var imgDest = 'dist/img';
var cssRevSrc = 'src/rev/css';

//CSS里更新引入文件版本号
gulp.task('revCollectorCss', function() {
    return gulp.src(['src/rev/**/*.json', cssSrc])
        .pipe(revCollector())
        .pipe(gulp.dest(cssRevSrc));
});

// 编译Sass
gulp.task('sass', function() {
    return gulp.src(cssSrc)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            compatibility: 'ie9'
        }))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(rev())
        .pipe(gulp.dest(cssDest)) //dest()写入文件
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/css'))
        .pipe(browserSync.stream());
});

gulp.task('revImg', function() {
    return gulp.src(imgSrc)
        .pipe(rev())
        .pipe(gulp.dest(imgDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/img'));
})

//压缩图片
gulp.task('image', function() {
    return gulp.src(imgSrc)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(rev())
        .pipe(gulp.dest(imgDest))
        .pipe(rev.manifest()); //dest()写入文件
});

// 检查js脚本的任务
gulp.task('js', function() {
    return gulp.src(jsSrc) //可配置你需要检查脚本的具体名字。
        // .pipe(jshint())
        // .pipe(jshint.reporter('default'))
        .pipe(concat('all.js'))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(jsDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/js'))
        .pipe(browserSync.stream());
});

//更新引入文件版本
gulp.task('htmlRev', function() {
    return gulp.src(['src/rev/**/*.json', htmlSrc])
        .pipe(revCollector())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

// Watch
gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch(htmlSrc, ['htmlRev']);
    gulp.watch(cssSrc, ['sass']);
    gulp.watch(jsSrc, ['js']);
});

// Clean
gulp.task('clean', function(cb) {
    del([cssDest, jsDest, imgDest, "dist/*.html"], cb)
});

// 定义默认任务,执行gulp会自动执行的任务
gulp.task('default', ['clean', 'sass', 'revImg', 'image', 'js', 'htmlRev', 'browser-sync']);