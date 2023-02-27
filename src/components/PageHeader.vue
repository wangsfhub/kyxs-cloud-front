<template>
  <div class="page-header" id="pageHeader">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex';
  const store = useStore();
  onMounted(()=>{
    let height = document.getElementById("pageHeader").clientHeight
    store.commit('user/setPageHeaderHeight',height);
  });
</script>

<style scoped>
  .page-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
  }
</style>