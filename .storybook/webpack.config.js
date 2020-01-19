const rules = require('../webpack.config').module.rules;

module.exports = ({ config }) => {
  config.resolve.extensions.push('.ts', '.tsx');
  return {
    ...config,
    module: {
      ...config.module,
      rules
    }
  }
};
