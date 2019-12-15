const postcssPresetEnv = require('postcss-preset-env');
const stylelint = require('stylelint');
// TODO: webpack-merge

module.exports = ({ config }) => {
  config.resolve.extensions.push('.ts', '.tsx');
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: require.resolve('ts-loader'),
            },
            {
              loader: require.resolve('react-docgen-typescript-loader'),
            },
          ],
        },
        {
          test: /\.module\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: '[path][name]__[local]--[hash:base64:5]',
                },
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                parser: 'postcss-scss',
                ident: 'postcss',
                plugins: () => [
                  stylelint(),
                  postcssPresetEnv({
                    stage: 1,
                    features: { 'nesting-rules': true },
                    browsers: 'last 2 versions',
                    // With "no-2009" value Autoprefixer will add prefixes only for final and IE 10 versions of specification
                    autoprefixer: { flexbox: 'no-2009' }
                  })
                ]
              }
            }
          ]
        }
      ]
    }
  }
};

