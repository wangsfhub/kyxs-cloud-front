<!--自定义表头筛选组件-->
<template>
    <span style="display:flex;align-items:center;">
      <span :style="filterValue!=''?'color:var(--them-color)':''">{{column.label}}</span>
      <el-popover
          :visible="visible"
          placement="bottom"
          :width="200"
          trigger="click"
      >
        <template #reference>
          <el-icon class="el-icon--right" @click="visible = true"><i-ep-arrow-down/></el-icon>
        </template>
        <template #default>
          <div style="display: flex;justify-content: center;flex-direction: column">
            <div style="margin-top:20px;text-align: center">
              <el-input placeholder="输入内容搜索" v-model="filterValue"></el-input>
            </div>
            <el-divider border-style="dashed"/>
            <div style="text-align: center">
              <el-button size="small" type="primary" @click="confirm">确定</el-button>
              <el-button size="small" @click="reset">重置</el-button>
            </div>
          </div>
        </template>
      </el-popover>
    </span>
</template>

<script setup>
  import { ref } from 'vue'
  defineProps({
    column:{
      type:Object,
      default: {}
    }
  })
  const emit = defineEmits(['filterChange'])
  const filterValue = ref('')
  const visible = ref(false)
  const confirm = ()=>{
    emit('filterChange',filterValue.value);
    visible.value = false
  }
  const reset = ()=>{
    filterValue.value = ''
    emit('filterChange',filterValue.value);
    visible.value = false
  }
</script>

<style scoped>

</style>