<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown" :style="{ color }">
      <!--<el-avatar class="user-avatar" :src="avatar"></el-avatar>-->
      <img class="user-avatar" src="@assets/user-avatar.gif" alt="" />
      <div class="user-name">
        {{ userName }}
        <el-icon class="el-icon--right"><i-ep-arrow-down /></el-icon>
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="github">基本信息</el-dropdown-item>
        <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
  export default {
    name: 'Avatar',
  };
</script>

<script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { ElMessageBox } from 'element-plus';
  import { setting } from '@/config/setting.config';
  import { useRouter } from 'vue-router';

  const { title, recordRoute } = setting;
  //const avatar = ref('@assets/user-avatar.gif');
  const userName = ref('wangsf');
  const store = useStore();
  const router = useRouter();

  defineProps({
    color: {
      type: String,
      default: '#666',
    },
  });

  const handleCommand = (command) => {
    switch (command) {
      case 'logout':
        handleLogout();
        break;
      case 'github':
        window.open('https://github.com/wangsfhub/kyxs-cloud-front');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    ElMessageBox.confirm('确定要退出登录吗？', '提示', {
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

<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    height: $base-avatar-dropdown-height;
    padding: $base-padding-10;
    .user-avatar {
      width: $base-avatar-widht;
      height: $base-avatar-height;
      cursor: pointer;
      border-radius: $base-border-radius-circle;
    }

    .user-name {
      display: flex;
      position: relative;
      margin-left: $base-margin-5;
      margin-left: $base-margin-5;
      cursor: pointer;
    }
  }
</style>
