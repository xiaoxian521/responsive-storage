import path from 'path'
import json from 'rollup-plugin-json'
import commonjs from "rollup-plugin-commonjs"
import nodeResolve from 'rollup-plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import filesize from 'rollup-plugin-filesize'
import babel from "@rollup/plugin-babel"

const extensions = [".ts"]

const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

const config = {
  input: resolveFile('src/index.ts'),
  plugins: [
    json(),
    nodeResolve({ extensions }),
    nodePolyfills(),
    filesize(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      extensions,
      babelHelpers: 'bundled',
      presets: [
        "@babel/preset-typescript",
        ["@babel/preset-env", { modules: false }],
      ]
    }),
  ],
  // 指出应将哪些模块视为外部模块，否则会被打包进最终的代码里
  external: ["vue"],
}

export default [
  // ESModule
  {
    ...config,
    output: {
      file: resolveFile('dist/index.esm.js'),
      format: "es",
    },
  },
]