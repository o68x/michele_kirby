var gulp         = require('gulp');
var child        = require('child_process');
var sass         = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var browserSync  = require('browser-sync').create();

var reload = browserSync.reload;

gulp.task('kirby', function(done) {
  child.spawn('php', ['-S', 'localhost:8000', 'kirby/router.php'], {stdio: 'inherit'})
})

// Compile Sass, Autoprefix
gulp.task('style', function() {
	return gulp.src('assets/scss/style.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(postcss([autoprefixer()]))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('assets/css'))
});

// Compile Sass, Autoprefix, Minify
gulp.task('stylemin', function() {
	return gulp.src('library/scss/style.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(postcss([autoprefixer(), cssnano()]))
	.pipe(rename({ suffix: '.min' }))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('library/css'))
});

gulp.task('bs', function() {
  browserSync.init({
      proxy: 'http://localhost:8000',
      browser: 'firefox',
      reloadDelay: 2000,
  });

  gulp.watch('assets/js/**/*.js').on("change", reload);
  gulp.watch(['site/**/*.php', 'site/**/*.yml']).on("change", reload);
  gulp.watch('content/**/*.*').on("change", reload);
  gulp.watch('assets/scss/**/*.scss',
		gulp.series('style'))
			.on('change', reload);
});

gulp.task('default', gulp.series('bs'));
