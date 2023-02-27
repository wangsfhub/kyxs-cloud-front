<template>
    <div class="top">
        <div class="top-button is-left">
            <div class="logo" ref="logo" style="width:200px">
               <h4>{{appTitle}}</h4>
            </div>
            <div class="tags-breadcrumb ciic-cursor-pointer "  @click="showCollapse">
                <icon-menu-fold-one v-if="isCollapse"/>
                <icon-menu-unfold-one v-else/>
            </div>
        </div>
        <div class="is-right">
          <div class="top-menu">
            <a class="active">首页</a>
            <a>人事管理</a>
            <a>考勤休假</a>
            <a>薪酬个税</a>
            <a>费控报销</a>
            <a>企业招聘</a>
            <a>使用指南</a>
            <a>建议反馈</a>
          </div>
          <el-popover v-if="settings.notice" placement="bottom" :width="320" trigger="hover">
            <template #reference>
              <icon-remind
                  class="icon-hover top-icon"
                  theme="outline"
                  size="16"
                  :fill="color"
                  :strokeWidth="3"
              />
            </template>
            <div class="message-box">
              <el-tabs v-model="activeName" stretch>
                <el-tab-pane :label="`通知 (5)`" name="first">
                  <Cell :list="noticeList" />
                </el-tab-pane>
                <el-tab-pane :label="`消息 (0)`" name="second">暂无消息</el-tab-pane>
                <el-tab-pane :label="`邮箱 (0)`" name="third">暂无邮件</el-tab-pane>
              </el-tabs>
            </div>
          </el-popover>
          <el-dropdown @command="handleCommand">
              <span class="avatar-dropdown el-dropdown-link">
                <img class="user-avatar" src="@assets/user-avatar.gif">
                <span class="user-name">张三</span>
                <icon-down
                   class="icon-hover top-icon"
                   theme="outline"
                   size="16"
                   :fill="color"
                   :strokeWidth="3"
                />
              </span>
              <template #dropdown>
                  <el-dropdown-menu>
                      <el-dropdown-item command="github">基本信息设置</el-dropdown-item>
                      <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
              </template>
          </el-dropdown>
        </div>
    </div>
</template>
<script setup>
    import Cell from '@/components/Cell/index.vue';
    import { noticeList } from './data';
    import { computed, ref } from 'vue'
    import { ElMessageBox } from 'element-plus'
    import { setting } from '@/config/setting.config';
    const { title, recordRoute } = setting;
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    const  router = useRouter();
    defineProps({
      isCollapse: {
        type: Boolean,
      },
      color: {
        type: String,
        default: '#666',
      },
    });
    let appTitle = process.env.VUE_APP_TITLE;
    const store = useStore();
    let activeName = ref('first');

    const settings = computed(() => {
      return store.getters['setting/settings'];
    });
    const emit = defineEmits(['switchCollapse']);

    const showCollapse = () =>{
      emit('switchCollapse');
    };
    const handleCommand = (command) =>{
      switch (command) {
        case 'logout':
          handleLogout();
          break;
        case 'github':
          window.open('https://github.com/hu-snail/vue3-admin-element-template');
          break;
        default:
          break;
      }
    }
    const handleLogout = () => {
      ElMessageBox.confirm(`您确定要退出登录吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        type: 'warning',
      })
          .then(async () => {
            await store.dispatch('user/logout');
            if (recordRoute) {
              const { fullPath } = router.currentRoute._value;
              location.replace('/login');
            } else {
              router.push('/login');
            }
          })
          .catch(() => {});
    };
</script>
<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px !important;
    }
</style>
<style lang="scss" scoped>
    .is-right{
      display: flex;
      justify-content: center;
      align-items: center;
      a{
        font-size: 14px;
        margin: 0 16px;
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        font-weight: 500;
      }
      a:hover{
        color: #7e9cff;
      }
      .active{
        color: #7e9cff;
      }
      .top-icon{
        padding: 20px 10px;
        cursor: pointer;
      }

    }
    .avatar-dropdown {
        margin-right: 30px;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        justify-items: center;
        .user-avatar{
            flex-shrink: 0;
            width: 40px;
            height: 40px;
            margin-left: 15px;
            cursor: pointer;
            border-radius: 50%;
        }
        .user-name{
            position: relative;
            display: flex;
            flex-shrink: 0;
            align-content: center;
            align-items: center;
            height: 40px;
            margin-left: 6px;
            line-height: 40px;
            cursor: pointer;
        }
    }
    .avatar-dropdown:hover{
      border: none;
    }
    .collapse{
        opacity: 0.5;
    }
    .el-dropdown{
        margin-right: 20px;
    }
    .el-tooltip{
        margin-right: 10px;
    }
    span+.xiala{
        margin-left: 0;
        font-size: 12px;
    }
    .top-item{
        margin-right: 20px;
    }
    .user-logo {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-top: 2px;
        margin-right: 6px
    }
</style>

