<template>
  <div class="menu-wrapper">
    <template v-for="item in menus">
      <el-menu-item v-if='!item.children||item.children.length==0' @click="openPage(item)" :key="item.id" :index="item.id">
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu :index="item.id" v-else>
        <template #title><span>{{ item.label }}</span></template>
        <sidebar-item :menuData="item.children" @toMenu="openPage"></sidebar-item>
      </el-sub-menu>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'SidebarItem',
    data() {
      return {
        menus: null,
      };
    },
    props: {
      menuData: {
        type: Array,
      },
      isCollapse: {
        type: Boolean,
      },
    },
    created() {
      this.menus = this.menuData;
      console.log('菜单',this.menuData)
    },
    mounted() {
    },
    computed: {

    },
    methods: {
      onlyOne(item) {
        if (!item.children || item.children.length === 0) {
          return true;
        }
        return false;
      },
      filterPath(id,path) {
        return path == null ? id : path;
      },
      openPage(item) {
        let params = "";
        let path = item.path;
        // 处理路由URL带参数的菜单
        if(typeof item.params === 'function') {
          params = item.params(this.$store);
          if(item.path && item.path.indexOf('/:') !== -1){
            const pathItemArr = item.path.split('/');
            pathItemArr.forEach((pathItem) => {
              if(pathItem.indexOf(':') === 0) {
                const paramName = pathItem.substring(1);
                path = path.replace(pathItem,params[paramName])
              }
            })
          }
        }
        console.log('我的路由',item.query, this.$route.query)
        if (item.path === this.$route.path) {
          if(item.query !=undefined ){
            this.$router.push({
              path: path,
              query: item.query,
            });
          }
        } else {
          this.$router.push({
            path: path,
            query: item.query,
          });
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .el-menu-item{
    background: #fafafa !important;
  }
  .el-menu-item.is-active {
    color: #409EFF !important;
  }
  .el-menu-item:hover{
    background: rgba(250,252,255,1) !important;
  }
  .el-menu-item{
    .icon{
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
      vertical-align: middle;
      color: #ffffff;
    }
  }
  .el-submenu{
    .icon{
      vertical-align: middle;
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
      color: #ffffff;
    }
  }
</style>
