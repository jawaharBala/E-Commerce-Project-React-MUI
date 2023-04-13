const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',  
  entry: path.join(__dirname,'./src/index.js'),
  output: {
    filename: 'bundle[hash].js'
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".sass", ".ttf"],
    alias: {
      process: "process/browser",
    },
    fallback: { "process/browser": require.resolve("process/browser") },
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(css|s[ac]ss|sass)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve("@svgr/webpack"),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve("file-loader"),
            options: {
              name: "images/svg/[name].[hash].[ext]",
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        loader: "file-loader",
        options: {
          outputPath: "images",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "Raj-app",
      filename: "index.html",
      inject: true,
      favicon: "public/favicon.ico",
      manifest: "public/manifest.json",
    }),

    new webpack.ProvidePlugin({
      process: "process/browser",
      React: "react",
    }),
    // new Dotenv({
    //   path: `./.env`,
    // }),
    // new WebpackManifestPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  devServer: {
    host: 'localhost',
    port: 3100,
    historyApiFallback: true,
    open: true,
    hot:true
  }
};