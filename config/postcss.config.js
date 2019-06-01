module.exports = {
  plugins:[
    require('autoprefixer'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      stage:3
    })
  ]
}