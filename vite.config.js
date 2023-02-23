import { defineConfig } from 'vite'
import vue  from '@vitejs/plugin-vue'
import path from "path";
const {
    setting
} = require('./src/config/setting.config')
const { version, author } = require('./package.json')
const dayjs = require('dayjs')
const date = dayjs().format('YYYY_M_D')
const time = dayjs().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_TITLE = setting.title || 'Cloud Wboot'
process.env.VUE_APP_AUTHOR = author || 'wangsf'
process.env.VUE_APP_UPDATE_TIME = time
process.env.VUE_APP_VERSION = version

// https://vitejs.dev/config/
export default defineConfig({
    root:'./', // 项目根目录（index.html 文件所在的位置）可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
    publicDir: 'public', // 作为静态资源服务的文件夹.该值可以是文件系统的绝对路径，也可以是相对于项目的根目录的相对路径。
    base: './', // 公共基础路径。改值可以是绝对路径或空字符串
    define: {
        'process.env': process.env
    },
    // 插件配置
    plugins: [vue()],
    //设置的别名
    resolve: {
        // 如果报错__dirname找不到，需要安装node,
        // 执行npm i @types/node --save-dev
        alias: {
            // 设置路径
            '~': path.resolve(__dirname, './'),
            '@': path.resolve(__dirname, "./src"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@common": path.resolve(__dirname, "./src/common"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@views": path.resolve(__dirname, "./src/views"),
            "@styles": path.resolve(__dirname, "./src/styles"),
            "@page": path.resolve(__dirname, "./src/page"),
        },
    },
    // 服务配置
    server:{
        hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
        port:3000,// 端口号
        open:true,// 自动在浏览器打开
        https:false,// 是否开启 https
    },
    // css 处理
    css: {
        //控制台不出现css原路径
        devSourcemap: true,
        loaderOptions: {
            scss: {
                additionalData: '@import "./src/styles/global.scss";',
            },
        },
    },
    //  生产环境
    build: {
        //指定输出路径
        assetsDir: "./",
        // 指定输出文件路径
        outDir: "dist",
        // 代码压缩配置
        terserOptions: {
            // 生产环境移除console
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
});