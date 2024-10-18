const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
    entry: './src/index.ts',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    externals: {
        phaser: 'Phaser',  
      },

    module: {
        rules: [
          {
            test: /\.tsx$/,         
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader', 
              options: {
                presets: ['@babel/preset-env'], 
              },
              loader: 'ts-loader',
            },
          },
          {
            test: /\.(png|jpe?g|gif)$/i,  
            type: 'asset/resource',  
        },
        ],
      },
      
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      open: true,   
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins:[
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
    
    devtool: 'source-map',
    mode: 'production',
};