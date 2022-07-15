import { createApp } from 'vue'
import App from './App.vue'

import './index.scss'
import SkyUi from '../build/'
// import Button from './button'

createApp(App).use(SkyUi).mount('#app')
