const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'development',
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
    filename: 'bundle.js',
    /** Clean
     * If we wanted to add more to our index.js file in src it would create more
     * dist files -> We want to keep that clean and not overrun our file folder
     */
    clean: true
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
      directory: path.resolve(__dirname, '/dist')
    },
    port: 5000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
  },
  /** Loaders
   * test: /\.scss$/ -> regex -> Any files that end with scss will apply these laoders
   *
   * * Babel -> allows for backward compatiability with older browsers
   * We don't want to mess with anything in the node-modules -> exclude /node_modules/
   */
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
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
      title: 'Webpack App',
      filename: 'index.html',
      template: './src/index.html'
    })
    // new BundleAnalyzerPlugin()
  ]
};
