const mix = require('laravel-mix')
const tailwindcss = require('tailwindcss')

mix
  .js('assets/js/app.js', 'public/js')
  .sass('assets/sass/app.scss', 'public/css')
  .setPublicPath('public')
  .webpackConfig(require('./webpack.config'))
  .options({
    processCssUrls: false,
    postCss: [tailwindcss('./tailwind.config.js')],
    version: true
  })

if (!mix.inProduction()) {
  mix
    .webpackConfig({
      devtool: 'source-map'
    })
    .sourceMaps()
} else {
  mix.version()
}
