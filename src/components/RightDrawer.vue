<template>
  <el-drawer
      v-model="drawer"
      :direction="direction"
      :before-close="handleClose"
      :size="size"
      :destroy-on-close="true"
      custom-class="drawer-box"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass" style="text-align: left"><span>{{title}}</span></h4>
    </template>
    <template #default>
      <div>
        <slot name="default"></slot>
      </div>
    </template>
    <template #footer>
      <div style="display: flex;justify-content: center">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
  import {reactive, ref} from 'vue'
defineProps({
  title: {
    type: String,
    default: ''
  },
  size:{
    type: String,
    default: '30%'
  }
})
const direction = ref('rtl')
const drawer = ref(false)
const emit = defineEmits(['submit'])
const isOpen = () => {
  drawer.value = true
}
const isClose = () => {
  drawer.value = false
}
/*
vue3中规定，使用了 <script setup> 的组件是默认私有的：
一个父组件无法访问到一个使用了 <script setup> 的子组件中的任何东西，
除非子组件在其中通过 defineExpose 宏显式暴露
*/
defineExpose({
  isOpen,
  isClose
})

const confirm = () => {
  emit('submit', '')
}
const handleClose = (done) => {
  isClose()
  emit('close', '')
}
</script>
<style scoped>
.el-drawer__header{
  text-align: left;
  font-weight: 500;
}
</style>
