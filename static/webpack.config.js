const path = require('path');

module.exports = {
    entry: './src/config/startApplication.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'src/dist')
    },
    mode: 'development'
};