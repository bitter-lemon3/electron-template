import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import status1 from './status1.vue'
import 'element-plus/dist/index.css'
import 'uno.css'



// 将第二个组件挂载到HTML上
const status1App = createApp(status1);
status1App.use(ElementPlus)
status1App.mount('#status1');

