const merge = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common");

const config = {
  plugins: [
    new CssMinimizerPlugin({
      test: /\.css$/g,
      minimizerOptions: {
        preset: [
          "default",
          {
            discardComments: { removeAll: true },
          },
        ],
      },
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "venders",
          chunks: "all",
        },
      },
    },
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
  },
  mode: "production",
};

module.exports = merge.merge(common, config);
