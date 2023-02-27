<template>
  <div class="page-header" ref="pageHeader">
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
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  const store = useStore();
  const pageHeader = ref(null);
  onMounted(()=>{
    console.log('获取dom元素',pageHeader)
    //let height = document.getElementById("pageHeader").clientHeight
    //store.commit('user/setPageHeaderHeight',height);
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