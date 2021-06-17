process.env.NODE_ENV = 'production'

import { terser } from "rollup-plugin-terser"
import configList from './rollup.config'

const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

configList.map((config, index) => {

  config.output.sourcemap = false
  config.plugins = [
    ...config.plugins,
    ...[
      terser({ compress: { drop_console: true } })
    ]
  ]

  return config
})

export default configList