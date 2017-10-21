var gulp = require('gulp'),
  pug = require('gulp-pug'),
  del = require('del');


gulp.task('clean-html', () => del('./src/**/*.html'));

gulp.task('pug', ['clean-html'], done => {
  gulp.src('./src/**/*.pug')
    .pipe(pug({
      pretty: true,
      doctype: 'html'
    }))
    .pipe(gulp.dest('./src/'))
    .on('end', done);
});
