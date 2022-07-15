import Theme from 'vitepress/dist/client/theme-default'
import SkyUi from '../../../src/index'
import Test from '../../../src/components/Test';
import '../../../src/index.scss'

import 'vitepress-theme-demoblock/theme/styles/index.css'
import DemoBlock  from 'vitepress-theme-demoblock/components/DemoBlock.vue'
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
export default {
    ...Theme,
    enhanceApp({app}){
        app.use(SkyUi)
        app.component('Test',Test)
        app.component('DemoBlock',DemoBlock)
        app.component('Demo',Demo)
    }
}