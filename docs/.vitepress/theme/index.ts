import Theme from 'vitepress/dist/client/theme-default'
import Button from '@/button/index';
import Test from '@/components/Test';

console.log(Button);

import 'vitepress-theme-demoblock/theme/styles/index.css'
import DemoBlock  from 'vitepress-theme-demoblock/components/DemoBlock.vue'
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
export default {
    ...Theme,
    enhanceApp({app}){
        app.component('Button',Button)
        app.component('Test',Test)
        app.component('DemoBlock',DemoBlock)
        app.component('Demo',Demo)
    }
}