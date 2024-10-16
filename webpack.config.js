const path = require('path')

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    externals: {
        phaser: 'Phaser',  // This tells Webpack to use the global Phaser instance
      },

    module: {
        rules: [
          {
            test: /\.js$/,         // Apply this rule to .js files
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader', // Use Babel for transpiling
              options: {
                presets: ['@babel/preset-env'], // Use the preset-env to support older browsers
              },
            },
          },
        ],
      },
    
      devServer: {
        static: path.resolve(__dirname, 'dist'),
        open: true,   // Automatically open the browser
      },
    mode: 'production',
};