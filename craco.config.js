const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#55b2e0",
              "@text-color": "#323232",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
