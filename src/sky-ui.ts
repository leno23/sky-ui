import type { App, Plugin } from 'vue'
import * as components from './components'

const SkyUI = {
  version:'0.0.2',
  install(app: App) {
    Object.keys(components).forEach(key => {
      const Component = components[key as keyof typeof components]
      // 遍历可能有别的对象，只对插件执行use方法
      if ('install' in Component || typeof Component === 'function') {
        app.use(Component as Plugin)
      }
    })
  }
}

export default SkyUI