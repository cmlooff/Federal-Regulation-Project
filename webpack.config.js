const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: process.env.NODE_ENV,
  /** Notes
   * Targeting our src/index.js and outputting the bundled file
   * in our dist folder
   *
   * Can also set multiple entry points by making the entry into an object
   */
  entry: {
    /** Notes
     * The file name is going to take the name of the bundle 'key'
     */
    bundle: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '/dist'),
    // Adding in hashing for the name
    filename: 'index_bundle.js'
  },
  /** Dev Server
   * Serving the dist
   * Set port to 3000
   * Automatically open the server when npm run dev
   * hot -> hot reloading
   * compress -> gzip compression
   */
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'src')
    },
    port: 3000,
    open: true,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  },
  /** Loaders
   * test: /\.scss$/ -> regex -> Any files that end with scss will apply these loaders
   *
   * * Babel -> allows for backward compatibility with older browsers
   * We don't want to mess with anything in the node-modules -> exclude /node_modules/
   */
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        /** Loading Images
         * /\.(png|svg|jpg|jpeg|gif)$/i -> i is for case-insensitive
         */
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Petitionist',
      filename: 'index.html',
      template: './src/index.html'
    })
    // new BundleAnalyzerPlugin()
  ]
};
