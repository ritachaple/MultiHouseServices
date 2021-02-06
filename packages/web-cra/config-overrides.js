const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

// our packages that will now be included in the CRA build step
const appIncludes = [
  resolveApp('src'),
  resolveApp('../components/src'),
  resolveApp('../../node_modules/@react-navigation'),
  resolveApp('../../node_modules/react-navigation'),
  resolveApp('../../node_modules/react-native-gesture-handler'),
  resolveApp('../../node_modules/react-native-reanimated'),
  resolveApp('../../node_modules/react-native-screens'),
  resolveApp('../../node_modules/react-native-ratings'),
  resolveApp('../../node_modules/react-navigation-drawer'),
  resolveApp('../../node_modules/react-navigation-stack'),
  resolveApp('../../node_modules/react-navigation-tabs'),
  resolveApp('../../node_modules/react-native-elements'),
  resolveApp('../../node_modules/react-native-vector-icons'),
]

module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => plugin.constructor.name !== 'ModuleScopePlugin',
  )

  config.module.rules[0].include = appIncludes
  config.module.rules[1].oneOf[2].include = appIncludes
  config.module.rules[1].oneOf[2].options.plugins.push(
    require.resolve('babel-plugin-react-native-web'),
    require.resolve('@babel/plugin-proposal-class-properties'),
  )

  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' }),
  )

  // config.resolve = {
  //   alias: {
  // 'react-native$': 'react-native-web',
  // 'react-native-webview$': 'react-native-web-webview',
  //     'react-native-web': 'react-native-web-webview',
  //     'react-native': 'react-native-webview',
  //   },
  // }

  // config.resolve.alias = {
  //   // ...(config.resolve.alias || {}),
  //   // Transform all direct `react-native` imports to `react-native-web`
  //   'react-native$': 'react-native-web',
  //   'react-native-webview$': 'react-native-web-webview',
  // }

  // config.module.strictExportPresence = false

  return config
}
