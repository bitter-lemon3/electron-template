import { createApp } from 'vue'
import status2 from './status2.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'uno.css'


// 将第三个组件挂载到HTML上
const thirdApp = createApp(status2);
thirdApp.use(ElementPlus)
thirdApp.mount('#status2');