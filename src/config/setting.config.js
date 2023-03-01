/**
 * @description 导出默认通用配置
 */
export const setting = {
    //项目部署的基础路径
    base: './',
    //开发以及部署时的URL，hash模式时在不确定二级目录名称的情况下建议使用""代表相对路径或者"/二级目录/"，history模式默认使用"/"或者"/二级目录/"
    publicPath: '',
    // 存储缓存文件的目录
    cacheDir: 'node_modules/.vite',
    // 输出路径
    outDir: 'dist',
    // 生成静态资源的存放路径
    assetsDir: 'static/',
    // 构建后是否生成 source map 文件
    sourcemap: false,
    // chunk 大小警告的限制
    chunkSizeWarningLimit: 2000,
    // 启用/禁用 CSS 代码拆分
    // 压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    cssCodeSplit: true,
    // 启用/禁用 brotli 压缩大小报告
    brotliSize: false,
    // 指定服务器应该监听哪个 IP 地址
    host: '0.0.0.0',
    // 指定开发服务器端口
    port: '3000',
    // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    // 服务器启动时自动在浏览器中打开应用程序 此值为字符串时，会被用作 URL 的路径名
    open: true,
    //是否显示顶部进度条
    progressBar: true,
    //开发环境每次保存时是否输出为eslint编译警告
    lintOnSave: true,
    //进行编译的依赖
    transpileDependencies: ['vue-echarts', 'resize-detector'],
    //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
    title: '昆云薪事',
    //标题分隔符
    titleSeparator: ' - ',
    //标题是否反转 如果为false:"page - title"，如果为ture:"title - page"
    titleReverse: false,
    //简写
    abbreviation: 'vab-pro',
    //开发环境端口号
    devPort: '9999',
    //版本号
    version: process.env.VUE_APP_VERSION,
    //pro版本copyright可随意修改
    copyright: 'wangsf 13988430117@163.com',
    //缓存路由的最大数量
    keepAliveMaxNum: 99,
    //路由模式，可选值为 history 或 hash
    routerMode: 'hash',
    //不经过token校验的路由
    routesWhiteList: ['/login', '/register', '/callback', '/404', '/403'],
    //加载时显示文字
    loadingText: '正在加载中...',
    //token名称
    tokenName: 'accessToken',
    //token在localStorage、sessionStorage、cookie存储的key的名称
    tokenTableName: 'accessToken',
    //token存储位置localStorage sessionStorage cookie
    storage: 'localStorage',
    //token失效回退到登录页时是否记录本次的路由
    recordRoute: true,
    //是否显示logo，不显示时设置false，显示时请填写remixIcon图标名称，暂时只支持设置remixIcon
    logo: 'vuejs-fill',
    //语言类型zh、en
    i18n: 'zh',
    //在哪些环境下显示高亮错误
    errorLog: ['development', 'production'],
    //是否开启登录拦截
    loginInterception: true,
    //是否开启登录RSA加密
    loginRSA: false,
    //intelligence（前端导出路由）和all（后端导出路由）两种方式
    authentication: 'intelligence',
    //是否开启roles字段进行角色权限控制（如果是all模式后端完全处理角色并进行json组装，可设置false不处理路由中的roles字段）
    rolesControl: true,
    //vertical gallery comprehensive common布局时是否只保持一个子菜单的展开
    uniqueOpened: true,
    //vertical布局时默认展开的菜单path，使用逗号隔开建议只展开一个
    defaultOpeneds: ['/vab'],
    //需要加loading层的请求，防止重复提交
    debounce: ['doEdit'],
    //需要自动注入并加载的模块
    providePlugin: {},
    //npm run build时是否自动生成7z压缩包
    build7z: false,
    //代码生成机生成在view下的文件夹名称
    templateFolder: 'project',
    //是否显示终端donation打印
    donation: false,
    //画廊布局和综合布局时，是否点击一级菜单默认开启第一个二级菜单
    openFirstMenu: true,
    // 调整控制台输出的级别 'info' | 'warn' | 'error' | 'silent'
    logLevel: 'info',
    // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
    clearScreen: false,
    // 是否删除生产环境console
    drop_console: true,
    // 是否删除生产环境debugger
    drop_debugger: true,
}
