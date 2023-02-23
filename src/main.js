import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/src/index.scss'
import {ElMessage,ElLoading} from 'element-plus'
import App from './App.vue'
import './index.css'
import './styles/global.scss'
import './styles/theme/light.scss'
import './styles/theme/dark.scss'
//import './permission'; // 权限
const app = createApp(App)
import vuex from './store/index'
import router from './router/index'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

app.use(ElementPlus)
app.use(vuex)
app.use(router)
app.provide('$message', ElMessage)
app.provide('$loading', ElLoading)
//注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')

