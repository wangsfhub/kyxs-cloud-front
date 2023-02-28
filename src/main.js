import { createApp } from 'vue'
import 'element-plus/theme-chalk/src/index.scss'
import App from './App.vue'
import './index.css'
import './permission'; // 权限
const app = createApp(App)
import vuex from './store/index'
import router from './router/index'
import func from './plugins/preload.js'
app.config.globalProperties.$func = func;

//app.use(ElementPlus)
app.use(vuex)
app.use(router)
// 按需注册方式
import elementPlus from './plugins/el-comp';
//注册 elementPlus组件/插件
elementPlus(app);
// 注册字节跳动图标
import iconPark from './plugins/icon-park';
iconPark(app)

app.mount('#app')


