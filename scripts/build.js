const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const path = require('path')
const fsExtra = require('fs-extra')
const entryFile = path.resolve(__dirname, './entry.ts')
const outputDir = path.resolve(__dirname, '../build')
const version = require('../package.json').version

const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})
// rollup配置
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: { vue: 'Vue' }
  }
}

// 生成package.json
const createPackageJson = name => {
    // 预设
    const fileStr = `{
      "name": "${name ? name : 'sky-ui'}",
      "version": "${version}",
      "main": "${name ? 'index.umd.js' : 'sky-ui.umd.js'}",
      "module": "${name ? 'index.umd.js' : 'sky-ui.es.js'}",
      "author": "leno23",
      "description": "a simple vue components library！",
      "repository": {
        "type": "git",
        "url": "git+https://github.com/leno23/sky-ui.git"
      },
      "keywords": ["vue3", "组件库", "tsx", "UI"],
      "license": "ISC",
      "bugs": {
        "url": "https://github.com/leno23/sky-ui/issues"
      }
    }`
  
    if (name) {
      // 单个组件，输出对应的package.json
      fsExtra.outputFile(
        path.resolve(outputDir, `${name}/package.json`),
        fileStr,
        'utf-8'
      )
    } else {
      // 全量
      fsExtra.outputFile(
        path.resolve(outputDir, 'package.json'),
        fileStr,
        'utf-8'
      )
    }
  }

// 全量构建
const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: entryFile,
          name: 'sky-ui',
          fileName: 'sky-ui',
          formats: ['es', 'umd']
        },
        outDir: outputDir
      }
    })
  )
}

const buildLib = async () => {
    await buildAll()
    createPackageJson()
}

buildLib()