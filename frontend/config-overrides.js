const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@base-color': '#F5A837',
        '@body-bg': '#FFFEFB',
        '@text-color': '#302E28',
        '@btn-primary-color': '#302E28',
      }
    }
  })
);
