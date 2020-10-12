const path = require('path');

module.exports = {
    entry: './src/script/main.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'src/dist'),
    },
  };