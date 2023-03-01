<template>
  <el-config-provider :locale="locale">
    <el-scrollbar height="100vh" ref="scroll">
      <router-view></router-view>
    </el-scrollbar>
  </el-config-provider>
</template>

<script>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default {
  name: 'App',
  components: {
    ElConfigProvider
  },
  setup(props) {
    let locale = zhCn
    return {
      locale
    };
  },
}
</script>
