var gulp     = require('gulp'),
    less     = require('gulp-less'),
    cssMin   = require('gulp-clean-css'),
    htmlMin  = require('gulp-htmlmin'),
    jsMin    = require('gulp-uglify'),
    jsConcat = require('gulp-concat'),
    browserSync =require('browser-sync').create();
//定义一个testLess任务(自定义任务名称)
gulp.task('testLess',function(){
 gulp.src('src/css/*.less')//该任务针对的文件
 .pipe(less())//该任务调用的模块
 .pipe(gulp.dest('dist/css')).pipe(browserSync.stream());//在css/下生成style.css
 });
//自动监听less
gulp.task('auto', function() {
    // 监听文件修改，当文件被修改则执行
    gulp.watch('src/css/*.less', ['testLess']);
    gulp.watch('src/js/*.js',['jsMin']);
});
//压缩css   //
gulp.task('cssMin',function(){
    gulp.src('css/*.css')
        .pipe(cssMin({
            advanced:false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility:'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks:false,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments:'*'//保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/css')).pipe(browserSync.stream());
});
//压缩html
gulp.task('htmlMin',function() {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/*.html')
        .pipe(htmlMin(options))
        .pipe(gulp.dest('dist')).pipe(browserSync.stream());
});
//压缩图片

//压缩js
gulp.task('jsMin',function() {
    var options = {
        mangle: true,//类型：Boolean 默认：true 是否修改变量名
        compress: true,//类型：Boolean 默认：true 是否完全压缩
        //preserveComments: 'all' //保留所有注释
    }
    gulp.src('src/js/*.js')
        .pipe(jsMin(options))
        .pipe(gulp.dest('dist/js')).pipe(browserSync.stream())
});
//合并js文件，减少http请求
gulp.task('jsConcat',function(){
    gulp.src('src/js/*.js')
        .pipe(jsConcat('all.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js')).pipe(browserSync.stream());
})

gulp.task('browserSync',function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("src/*.html").on("change",browserSync.reload);
})


//默认任务
gulp.task('default', ['testLess','auto','cssMin','htmlMin','jsMin','jsConcat','browserSync']);



// //导入工具包 require('node_modules里对应模块')
// var gulp = require('gulp'), //本地安装gulp所用到的地方
//     less = require('gulp-less');
//
// //定义一个testLess任务（自定义任务名称）
// gulp.task('testLess', function () {
//     gulp.src('src/less/index.less') //该任务针对的文件
//         .pipe(less()) //该任务调用的模块
//         .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
// });
//
// gulp.task('default',['testLess']); //定义默认任务
//    //
// //gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
// //gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
// //gulp.dest(path[, options]) 处理完后文件生成路径