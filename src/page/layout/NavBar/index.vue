<template>
  <div class="nav-bar-container">
    <el-row :gutter="15">
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" v-if="settings.mode !== ''">
        <div class="left-panel">
          <Logo v-if="isLogo" style="width: 240px;"/>
          <component
            :title="collapse ? 'unfold':'收起'"
            class="icon-hover fold"
            :is="collapse ? 'icon-menu-fold-one' : 'icon-menu-unfold-one'"
            theme="filled"
            size="16"
            :strokeWidth="4"
            fill="#666"
            @click="handleCollapse"
          />
          <template v-if="isBreadcrumb">
            <Breadcrumb class="hidden-xs-only" />
          </template>
          <div class="nav-box">
            <a :class="currentNav==1?'active':''" @click="handleNav(1)">首页</a>
            <a :class="currentNav==2?'active':''" @click="handleNav(2)">人事管理</a>
            <a :class="currentNav==3?'active':''" @click="handleNav(3)">考勤休假</a>
            <a :class="currentNav==4?'active':''" @click="handleNav(4)">薪酬个税</a>
            <a :class="currentNav==5?'active':''" @click="handleNav(5)">费控报销</a>
            <a :class="currentNav==6?'active':''" @click="handleNav(6)">企业招聘</a>
            <a :class="currentNav==7?'active':''" @click="handleNav(7)">使用指南</a>
            <a :class="currentNav==8?'active':''" @click="handleNav(8)">建议反馈</a>
          </div>
        </div>
      </el-col>
      <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
        <RightPanel />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
  };
</script>

<script setup>
  import Logo from "../Logo/index.vue";
  import Breadcrumb from "../Breadcrumb/index.vue";
  import RightPanel from "./RightPanel.vue";
  import { ref,computed } from 'vue';
  import { useStore } from 'vuex';
  const store = useStore();
  const currentNav = ref(1);
  const handleNav = (sel)=>{
    currentNav.value = sel
  }
  const collapse = computed(() => {
    return store.getters.collapse;
  });

  const isBreadcrumb = computed(() => {
    return store.getters['setting/isBreadcrumb'];
  });

  const settings = computed(() => {
    return store.getters['setting/settings'];
  });
  const isLogo = computed(() => {
    return store.getters['setting/isLogo'];
  });
  const emit = defineEmits(['handleCollapse']);

  const handleCollapse = () => {
    emit('handleCollapse');
  };
</script>

<style lang="scss" scoped>
  .nav-bar-container {
    position: relative;
    height: $base-nav-bar-height;
    padding-right: $base-padding;
    overflow: hidden;
    user-select: none;
    background: $base-color-white;
    box-shadow: $base-box-shadow;
    .left-panel {
      display: flex;
      align-items: center;
      justify-items: center;
      height: $base-nav-bar-height;
      .nav-box{
        margin-left: 30px;
        a{
          padding: 10px  20px;
          margin: 0px 10px;
          border-radius: 15px;
          padding: 3px 10px;
        }
        a:hover{
          background: var(--them-color);
          color: #fff;
        }
        a.active{
          background: var(--them-color);
          color: #fff;
        }
      }
      .fold-unfold {
        color: $base-color-gray;
        cursor: pointer;
      }
      .fold {
        padding: $base-padding-20-10;
      }
      :deep(.breadcrumb-container) {
        margin-left: $base-margin-10;
      }
    }
  }
</style>
