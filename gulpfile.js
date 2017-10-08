var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var del = require('del');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');

var spriter = require('gulp-css-spriter');
var base64 = require('gulp-base64');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var runSequence = require('run-sequence');



/*************************开发模式*************************/
gulp.task('server:dev', function() {
	browserSync.init({
		server: {
			baseDir: './src/',
			index: 'index.html'
		},
		port: 8080
	})
	gulp.watch('src/css/*.css', ['css:dev'])
	gulp.watch('src/js/*.js', ['js:dev'])
	gulp.watch('src/*.html', ['html:dev'])
})

gulp.task('html:dev' , function(){
	gulp.src([
		'./src/*.html'
	])
	.pipe(gulp.dest('./src/'))
	.pipe(reload({
		stream:true
	}))

});
gulp.task('css:dev', function () {
	gulp.src(['src/css/*.css','!src/css/all.css','!src/css/all.min.css'])
    .pipe(autoprefixer())
    .pipe(concat('all.css'))
    // .pipe(spriter({
    //     'spriteSheet': 'src/img/spritesheet.png',
    //     'pathToSpriteSheetFromCSS': '../img/spritesheet.png'
    // }))
    .pipe(cleanCss())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('src/css/'))
	.pipe(reload({
		stream:true
	}))
})
gulp.task('js:dev',function () {
    gulp.src(['src/js/*.js','!src/js/all.js','!src/js/all.min.js'])
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename('./all.min.js'))
    .pipe(gulp.dest('src/js/'))
	.pipe(reload({
		stream:true
	}))
})
/*************************生产模式*************************/
gulp.task('html:pro', function () {
    gulp.src('src/*.html')
    .pipe(gulp.dest('docs/'))
})
gulp.task('css:pro', function () {
    gulp.src('src/css/all.min.css')
    .pipe(rev())
    .pipe(gulp.dest('docs/css/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev/css/'))
})

gulp.task('js:pro', function() {
    gulp.src('src/js/all.min.js')
    .pipe(rev())
    .pipe(gulp.dest('docs/js/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev/js/'))
})

gulp.task('imagemin', function () {
    gulp.src(['src/img/*.png','src/img/*.jpg'])
    .pipe(imagemin())
    .pipe(gulp.dest('docs/img/'))
})

gulp.task('pro', ['html:pro','css:pro','js:pro','imagemin'], function () {
    gulp.src(['rev/**/*.json', 'docs/*.html'])
    .pipe(revCollector({}))
    .pipe(gulp.dest('docs/'))
    console.log('生产模式完成');
})
