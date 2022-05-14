const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser =  require('terser-webpack-plugin');

module.exports = {
    mode:"production",
    output: {        
        clean: true,
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [
          {
            test: /\.html$/i,
            loader: "html-loader",
            options: {
                sources: false
            }
          },
          {
            test: /\.css$/i,
            exclude: /styles.css$/,
            use: ['style-loader','css-loader']
          },
          {
              test: /styles.css$/,
              use: [MiniCssExtractPlugin.loader, 'css-loader']
          },
          {   
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader'
            // test: /\.(png|jpe?g|gif)$/
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
       
        ],
      },
    optimization :{
        minimize : true,
        minimizer: [
          new CssMinimizer(),
          new Terser()
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            title: 'Mi Webpack App',
            //filename:'holamundo.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // filename: 'nuevo-estilo.css',
            filename: '[name].[fullhash].css',
            // filename: '[name].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets/", to: "assets/" }
            ]
        })
            
    ]


}