const path = require('path');
const paths = require('./paths');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  mode:'development',
  devtool:'cheap-module-eval-source-map',//开发模式推荐
  resolve:{
    extensions:['.vue','.js','.jsx','.json'],
    alias:{
      '@':path.resolve('src')
    }
  },
  entry:[
    paths.appMain
  ],
  output:{
    filename:'boundle.js'
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
          presets: ['@babel/preset-env'],    
          //文件按需加载解析
          plugins: ['@babel/plugin-transform-runtime', 'babel-plugin-transform-vue-jsx',
            '@babel/plugin-syntax-dynamic-import']//router动态引入插件
        },
        exclude: /node_modules/,
      },
      {
        test:/\.(png|jpg|jpeg|svg|svg|gif)$/,
        loader:'url-loader'
      },
      {
        test:/\.scss$/,
        use:[
          {loader:'style-loader'},
          {loader:'css-loader'},
          { loader:'postcss-loader',
            options:{
              config:{
                path:'./config/postcss.config.js'
              }
            }
          },
          {loader:'sass-loader'}
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'webpack手动配置vue项目',
      template:paths.appHtml
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ],
  devServer:{
    historyApiFallback:true,
    disableHostCheck:true,
    host:'localhost',
    port:'8060',
    hot:true,
    open:true,
    inline:true,
    watchContentBase:true,
    clientLogLevel:'none',
    stats:{
      children: false //解决Entrypoint undefined
    }
  }
})