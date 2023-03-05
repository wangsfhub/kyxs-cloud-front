import { defineConfig,loadEnv } from 'vite'
import vue  from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock';
import path from "path";
import { setting } from './src/config/setting.config'
const {
    title,
    base,
    publicDir,
    outDir,
    assetsDir,
    sourcemap,
    cssCodeSplit,
    host,
    port,
    strictPort,
    open,
    cors,
    brotliSize,
    logLevel,
    clearScreen,
    drop_console,
    drop_debugger,
    chunkSizeWarningLimit,
} = setting;

import { svgBuilder } from './src/plugins/svgBuilder';
const { version, author } = require('./package.json')
const dayjs = require('dayjs')
const date = dayjs().format('YYYY_M_D')
const time = dayjs().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_TITLE = title || 'Cloud Wboot'
process.env.VUE_APP_AUTHOR = author || 'wangsf'
process.env.VUE_APP_UPDATE_TIME = time
process.env.VUE_APP_VERSION = version

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

const isDev = process.env.NODE_ENV === 'development';
// https://vitejs.dev/config/
export default ({ mode }) =>
    defineConfig({
        root: './', // 项目根目录（index.html 文件所在的位置）可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。
        base,
        publicDir,
        define: {
            'process.env': process.env
        },
        // 插件配置
        plugins: [
            vue(),
            AutoImport({
                // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
                imports: ['vue'],
                resolvers: [
                    ElementPlusResolver(),
                    // 自动导入图标组件
                    IconsResolver({
                        prefix: 'Icon',
                    }),
                ],
            }),
            Components({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass',
                        // directives: true,
                        // version: "2.1.5",
                    }),
                    // 自动注册图标组件
                    IconsResolver({
                        enabledCollections: ['ep'],
                    }),
                ],
            }),
            Icons({
                autoInstall: true,
            }),
            viteMockServe({
                mockPath: 'mock',
                supportTs: false,
                localEnabled: isDev,
                prodEnabled: !isDev,
                injectCode: `
                              import { setupProdMockServer } from './mockProdServer';
                              setupProdMockServer();
                            `,
            }),
            svgBuilder('./src/icons/svg/'),
        ],
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
        server: {
            //hmr: {overlay: false}, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
            host,
            port,
            cors,
            strictPort,
            open,
            fs: {
                strict: false,
            },
            proxy: {
                '/api': {
                    target: 'http://localhost:8888',
                    changeOrigin: true,//是否跨域
                    rewrite: (path) => path.replace(/^\/api/, ''),
                }
            }
        },
        // css 处理
        css: {
            preprocessorOptions: {
                // 引入公用的样式
                scss: {
                    additionalData: `@use "@/styles/global.scss" as *; @use "@/styles/element/index.scss" as *;`,
                    charset: false,
                },
            },
        },
        //  生产环境
        build: {
            outDir,
            assetsDir,
            sourcemap,
            cssCodeSplit,
            brotliSize,
            // 代码压缩配置
            terserOptions: {
                // 生产环境移除console
                compress: {
                    drop_console,
                    drop_debugger,
                },
            },
        },
});