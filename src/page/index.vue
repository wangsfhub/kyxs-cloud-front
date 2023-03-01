<template>
  <div class="admin-container">
    <el-container v-if="mode === 'vertical'" class="container" :style="{ left: isCollapse ? '65px' : '240px' }">
      <el-header
          class="header"
          :class="{ fixed: fixedHead, notag: !tag }"
          height="60px"
      >
        <NavBar @handleCollapse="handleCollapse" />
        <template v-if="tag">
          <TabBar />
        </template>
      </el-header>
      <Menu :isCollapse="isCollapse" class="hidden-xs-only" />
      <el-main class="main" :class="{ fixed: fixedHead, notag: !tag }">
        <AppMain />
      </el-main>
    </el-container>
    <Horizontal v-if="mode === 'horizontal'" />
<!--      <el-backtop />-->
  </div>
</template>

<script setup>
import Menu from "./layout/Menu/index.vue";
import NavBar from "./layout/NavBar/index.vue";
import TabBar from "./layout/TabBar/index.vue";
import AppMain from "./layout/AppMain/index.vue";
import Horizontal from "./layout/Horizontal/index.vue";
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const isMobile = computed(() => {
  return store.getters['setting/isMobile'];
});

const fixedHead = computed(() => {
  return store.getters['setting/fixedHead'];
});

const tag = computed(() => {
  return store.getters['setting/tag'];
});

const isCollapse = computed(() => {
  return store.getters.collapse;
});

const mode = computed(() => {
  return store.getters['setting/mode'];
});

const handleCollapse = () => {
  store.dispatch('setting/changeCollapse');
};
</script>

<style lang="scss" scoped>
.admin-container {
  position: relative;
  background-color: $base-content-bg-color;
  .container {
    position: absolute;
    right: 0;
    transition: all $base-transition-time-4;
  }
  .header {
    padding: 0;
    transition: all $base-transition-time-4;
    &.fixed {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      z-index: $base-z-index-999;
    }
  }
  .main {
    position: relative;
    top: $base-main-vertical-top;
    overflow-y: auto;
    padding: 10px;
    &.fixed {
      top: $base-main-fixed-top;
    }
    &[class='el-main main fixed notag'] {
      top: $base-main-vertical-fixed-notag-top;
    }
    &[class='el-main main notag'] {
      top: $base-main-notag-top;
    }
    background-color: $base-content-bg-color;
  }
}
</style>
