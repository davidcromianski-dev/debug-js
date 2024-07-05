const path = require('path');

module.exports = {
    //devtool: 'eval-source-map', // development
    devtool: 'source-map', // production
    entry: './src/main.js',
    mode: 'production', // 'development' or 'production
    resolve: {
        extensions: ['.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
};