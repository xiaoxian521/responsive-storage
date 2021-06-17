process.env.NODE_ENV = 'development'

import path from 'path'
import serve from 'rollup-plugin-serve'
import configList from './rollup.config'

const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

const PORT = 3000

const devSite = `http://127.0.0.1:${PORT}`
const devPath = path.join('example', 'index.html')
const devUrl = `${devSite}/${devPath}`

setTimeout(() => {
  console.log(`[dev]: ${devUrl}`)
}, 1000)

configList.map((config, index) => {

  config.output.sourcemap = true

  if (index === 0) {
    config.plugins = [
      ...config.plugins,
      ...[
        serve({
          port: PORT,
          contentBase: [resolveFile('')]
        })
      ]
    ]
  }

  return config
})


export default configList