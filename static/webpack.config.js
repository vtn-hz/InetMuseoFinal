const path = require('path');

module.exports = {
    entry: './src/config/startSPA.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'src/dist')
    },
    mode: 'development'
};