const path = require('path');
const paths = require('./paths');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  mode:'production',
  resolve:{
    extensions:['.vue','.js','.jsx','.json']
  },
  devtool:'cheap-module-source-map',//生产模式推荐
  entry:paths.appMain,
  output:{
    publicPath:'./',
    path:paths.appBuild,
    filename:'static/js/[name]-[hash:8].js'
  },
  optimization:{
    minimizer:[
      new UglifyJsPlugin({
        cache:true,
        sourceMap:true,
        parallel:true //多线程
      }),
      new OptimizeCssAssetsPlugin()
    ]
  },
  module:{
    rules:[
      {
        enforce:'pre',
        test:/\.js$/,
        loader:'source-map-loader'
      },
      {
        test:/\.vue$/,
        loader:'vue-loader'
      },
      {
        test:/\.js$/,
        loader:'babel-loader',
        options:{
          presets:['@babel/preset-env'],
          plugins: ['@babel/plugin-syntax-dynamic-import','babel-plugin-transform-vue-jsx']
        },
        //exclude:/node_modules/
      },
      {
        test:/\.(png|jpg|jpeg|gif|svg)$/,
        loader:'url-loader'
      },
      {
        test:/\.scss$/,
        use:[
          {loader:'style-loader'},
          {loader:MiniCssExtractPlugin.loader},
          {loader:'css-loader'},
          { loader: 'postcss-loader',
            options:{
              config:{
                path:'./config/postcss.config.js'
              }
            }
          },
          {
            loader:'sass-loader'
          }
        ]
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title:'vue的jsx项目',
      template:paths.appHtml,
      minify:{
        removeComments:true,
        collapseWhitespace:true
      },
      //favicon:'./favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename:'static/css/[name]-[hash:8].css'
    }),
    new VueLoaderPlugin()
  ]
})