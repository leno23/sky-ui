import { App } from 'vue';
import Button from './src/button';

export default {
    install(app:App){
        app.component(Button.name,Button)
    }
}