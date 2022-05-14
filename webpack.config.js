const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode:"development",
    output: {
        clean: true
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
          }
       
        ],
      },
    optimization :{

    },
    plugins : [
        new HtmlWebpackPlugin({
            title: 'Mi Webpack App',
            //filename:'holamundo.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // filename: 'nuevo-estilo.css',
            // filename: '[name].[fullhash].css',
            filename: '[name].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets/", to: "assets/" }
            ]
        })
            
    ]


}
