const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/main.ts',
  target: 'node',
  externals: [
    nodeExternals({ importType: 'module' }),
    nodeExternals({ importType: 'module', modulesDir: path.resolve(__dirname, '../../node_modules') })
  ],
  experiments: {
    outputModule: true,
  },
  mode: 'none',
  optimization: {
    minimize: false,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.mjs',
    module: true,
    chunkFormat: 'module',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'swc-loader',
            options: {
              module: {
                type: 'es6'
              }
            }
          },
        ],
        exclude: /node_modules|test/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
