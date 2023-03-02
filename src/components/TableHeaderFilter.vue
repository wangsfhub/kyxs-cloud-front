<!--自定义表头筛选组件-->
<template>
    <span style="display:flex;align-items:center;">
      <span :style="filterValue!=''?'color:var(--them-color)':''">{{column.label}}</span>
      <el-popover
          placement="bottom"
          :width="200"
          trigger="click"
      >
        <template #reference>
          <el-icon class="el-icon--right"><i-ep-arrow-down/></el-icon>
        </template>
        <template #default>
          <div style="display: flex;justify-content: center;flex-direction: column">
            <div style="margin-top:20px;text-align: center">
              <select-code v-if="filterObj.type=='select'" :setId="filterObj.setId" placeholder="选择内容筛选" v-model="filterValue" @change="confirm"/>
              <el-input v-else placeholder="输入内容筛选" v-model="filterValue"></el-input>
            </div>
            <el-divider border-style="dashed"/>
            <div style="text-align: center">
              <el-button size="small" type="primary" @click="confirm">筛选</el-button>
              <el-button size="small" @click="reset">重置</el-button>
            </div>
          </div>
        </template>
      </el-popover>
    </span>
</template>

<script setup>
  import { ref } from 'vue'
  const props = defineProps({
    column:{
      type:Object,
      default: {}
    },
    //filter 对象，包括类型、操作符
  // {type:'input',operator:'like'}
  // {type:'select',operator:'=',setId:'9011'}
    filterObj:{
      type:Object,
      default: {}
    },
    //filters 所有筛选数据存储，用于父页面搜索过滤
    filters:{
      type:Array,
      default: []
    }
  })
  const emit = defineEmits(['filterChange'])
  const filterValue = ref('')
  const filterItem = reactive(props.filterObj)
  const column = reactive(props.column)
  const confirm = ()=>{
    filterItem['value'] = filterValue.value;
    filterItem['column'] = column.property;
    emit('filterChange',filterItem);
  }
  const reset = ()=>{
    filterValue.value = ''
    filterItem['value'] = filterValue.value;
    filterItem['column'] = column.property;
    //移除当前对象
    emit('filterChange',filterItem);
  }
</script>

<style scoped>

</style>