var gulp =  require('gulp')
var $ = require('gulp-load-plugins')()
var webpack = require('webpack')

/*
 * Webpack config
 */
var wpConfig = {
  devtool: 'source-map',
  entry: {
    index: './src/main.js'
  },
  output: {
    filename: './dist/js/main.js',
  },
  module: {
    loaders: [
      {test: /\.(vs|fs)$/, loader: 'raw-loader'},
    ]
  }
}

/*
 * Build js files into boundle via webpack
 */
gulp.task('boundle', (done) => {
  webpack(wpConfig, (err, stats) => {
    if(err) throw new $.util.PluginError("webpack", err)
    $.util.log("[webpack]", stats.toString({colors: true}))
    done()
  })
})

/*
 * Copy assets to the 'dist/' folder
 */
gulp.task('assets', () => {
  return gulp.src(['assets/**/*.*'], {base: 'assets/'})
    .pipe($.changed('dist'))
    .pipe(gulp.dest('dist'))
    .pipe($.connect.reload())
})

/*
 * Start dev server
 */
gulp.task('server', () => {
  $.connect.server({
    root: 'dist',
    livereload: true
  })
})

/*
 * Reload pages on
 */
gulp.task('reload', () => {
  return gulp.src('dist/**/*.*')
    .pipe($.connect.reload())
})

/*
 * Watch for changes and update files and boundle
 */
var extend = require('util')._extend
gulp.task('watch', () => {
  gulp.watch('assets/**/*.*', ['assets'])
  gulp.watch('dist/**/*.{html,js,map}', ['reload'])

  webpack(extend(wpConfig, {watch: true})).watch({}, (err, stats) => {
    if(err) throw new $.util.PluginError("webpack", err)
    $.util.log("[webpack]", stats.toString({colors: true}))
  })
})

gulp.task('default', ['assets', 'server', 'watch'])
gulp.task('build', ['assets', 'boundle'])
