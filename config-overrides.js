// config-overrides.js
module.exports = {
    webpack: (config, env) => {
      config.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules\/(?!apexcharts)/,  // Exclude apexcharts package
        loader: 'source-map-loader',
      });
      return config;
    },
  };
  