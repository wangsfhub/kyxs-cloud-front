import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import NProgress from 'nprogress';
import 'element-plus/theme-chalk/src/index.scss'
import 'nprogress/nprogress.css';
import {ElMessage,ElLoading} from 'element-plus'
import App from './App.vue'
import './index.css'
import './styles/global.scss'
import './styles/theme/light.scss'
import './styles/theme/dark.scss'
import './permission'; // 权限
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
NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})

