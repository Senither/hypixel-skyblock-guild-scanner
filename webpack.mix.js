const config = require('./config')
const mix = require('laravel-mix')
const tailwindcss = require('tailwindcss')
require('laravel-mix-definitions')

mix.definition({
  facadeBaseUrl: `'${config.facadeBaseUrl}'`
})

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
