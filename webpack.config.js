const path = require('path');

module.exports = {
    entry: './src/script/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'src/dist'),
    },
  };