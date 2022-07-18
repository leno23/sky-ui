const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const { resolve } = require('path')
const fs = require('fs')
const { exec, spawn, spawnSync } = require('child_process')
const fsExtra = require('fs-extra')
// 入口文件 出口文件
const entryFile = resolve(__dirname, './entry.ts')
const outputDir = resolve(__dirname, '../build')
// 组件目录
const componentsDir = resolve(__dirname, '../src')

const { version } = require('../package.json')

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

// 用户可以直接引入根目录使用
// 为特定组件生成package.json
const createPackageJson = name => {
  // 预设
  const fileStr = `{
      "name": "${name ? name : 'vue3-sky-ui'}",
      "version": "${version}",
      "main": "${name ? 'index.umd.js' : 'vue3-sky-ui.umd.js'}",
      "module": "${name ? 'index.umd.js' : 'vue3-sky-ui.es.js'}",
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
      resolve(outputDir, `${name}/package.json`),
      fileStr,
      'utf-8'
    )
  } else {
    // 全量
    fsExtra.outputFile(resolve(outputDir, 'package.json'), fileStr, 'utf-8')
  }
}

// 单个组件构建
const buildSingle = async name => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: resolve(componentsDir, name),
          name: 'index',
          fileName: 'index',
          formats: ['es', 'umd']
        },
        outDir: resolve(outputDir, name)
      }
    })
  )
  createPackageJson(name)
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
          name: 'vue3-sky-ui',
          fileName: 'vue3-sky-ui',
          formats: ['es', 'umd']
        },
        outDir: outputDir
      }
    })
  )
  createPackageJson()
}

function cp(from, to) {
  let read = fs.createReadStream(resolve(__dirname, from))
  let out = fs.createWriteStream(resolve(__dirname, to))
  read.pipe(out)
}
const buildLib = async () => {
  let childProcess = spawn('sh', [
    '-c',
    `sass ./src/index.scss ./src/indexTmp.css &&
     tailwindcss -i ./src/indexTmp.css -o ./src/index.css &&
     rm -rf ./src/indexTmp.css ./src/index.css.map ./src/indexTmp.css.map`
  ])

  setTimeout(() => {
    childProcess.kill()
    cp('../src/index.css', '../build/index.css')
    cp('../README.md', '../build/README.md')
  }, 1000)
  // })

  await buildAll()
  //   按需打包
  fs.readdirSync(componentsDir)
    .filter(name => {
      const componentDir = resolve(componentsDir, name)
      const isDir = fs.lstatSync(componentDir).isDirectory()
      return isDir && fs.readdirSync(componentDir).includes('index.ts')
    })
    .forEach(async name => {
      await buildSingle(name)
    })
}
buildLib()
