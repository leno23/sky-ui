# Vue 3 + TypeScript + Vite

- 初始化

```
npm create vite@latest sky-ui -- --template vue-ts
```

- 支持jsx
yarn add -D @vitejs/plugin-vue-jsx

vite.config.ts修改
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJSX({})]
})

```

- 代码规范
```
npx eslint --init
```
package.json添加配置
含义是对以js、ts、tsx、vue为后缀的文件做检查

```json
{
    "lint":"eslint . --ext .js,.ts,.tsx,.vue"
}
```

- 安装eslint prettier插件

  -  将代码规范交给prettier来处理，出了问题由eslint来承接
```
yarn add -D prettier eslint-plugin-prettier eslint-config--prettier
```

- 代码提交规范
```
npx mrm@2 lint-staged 
```

- 文档系统
```
yarn add vitepress -D
yarn add vitepress-theme-demoblock
```

- 样式体系
```
npm i -D sass tailwindcss postcss autoprefixer
```