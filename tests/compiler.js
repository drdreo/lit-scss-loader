// From https://webpack.js.org/contribute/writing-a-loader/#testing
const path = require('path');
const webpack = require('webpack');
const memoryfs = require('memory-fs');

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.(s?)(c|a)ss$/,
        use: [
          {
            loader: path.resolve(__dirname, '../index.js'),
              // Uses the same options as the parameters
						options
					},
        ]
      }]
    }
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) reject(err);

      resolve(stats);
    });
  });
};