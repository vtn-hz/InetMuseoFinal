const path = require('path');

module.exports = {
    entry: './src/public/js/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'src/dist')
    },
    mode: 'development'
};