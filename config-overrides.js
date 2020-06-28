const path = require("path");
module.exports = function override(config, env) {
  config.externals = [
    function (context, request, callback) {
      if (/xlsx|canvg|pdfmake/.test(request)) {
        return callback(null, "commonjs " + request);
      }
      callback();
    },
  ];

  if (!config.resolve) {
    config.resolve = {};
  }
  if (!config.resolve.alias) {
    config.resolve.alias = {};
  }
  const alias = {
    lodash: path.resolve(__dirname, "node_modules/lodash"),
    "bn.js": path.resolve(__dirname, "node_modules/bn.js"),
  };
  Object.assign(config.resolve.alias, alias);

  return config;
};
