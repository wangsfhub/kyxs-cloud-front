<template>
  <el-dialog
      ref="customHeaderDialog"
      v-model="dialogVisible"
      title="自定义表头"
      width="600px"
      append-to-body
      class="promoter_person"
      custom-class="selperson_dialog"
  >
    <el-divider content-position="left">已选项目</el-divider>
    <div class="checked-box">
      <el-tag
          v-for="item in headers.checkedList"
          :key="item.itemCode"
          class="mar-r-10 mar-b-10"
          effect="plain"
          type="success"
          closable
          @close="removeChecked(item)"
      >
        {{ item.itemName }}
      </el-tag>
    </div>
    <el-divider content-position="left">全部项目</el-divider>
    <div class="all-box">
      <el-check-tag
          v-for="item in headers.allList"
          type="warning"
          :key="item.itemCode"
          class="mar-r-10 mar-b-10"
          :checked="item.checked" @click="onChange(item)">
        {{ item.itemName }}
      </el-check-tag>
    </div>
    <template #footer>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref, reactive, getCurrentInstance} from 'vue'
const context = getCurrentInstance()?.appContext.config.globalProperties;
const func = context?.$func;
  const dialogVisible = ref(false)
  const headers = reactive({
    allList:[],
    checkedList:[],
    unCheckedList:[]
  })
  const isOpen = async (item) => {
    if(item){
      headers.checkedList = item.checkedList;
      headers.unCheckedList = item.unCheckedList;
      item.allList.forEach(obj=>{
        if(func.toggleClass(headers.checkedList,obj,'itemCode')){
          obj.checked = true
        }else{
          obj.checked = false
        }
      })
      headers.allList = item.allList;
    }
    dialogVisible.value = true
  }
  const isClose = () => {
    dialogVisible.value = false
  }
  const onChange = (item)=>{
    item.checked = !item.checked
    if(item.checked==true&&!func.toggleClass(headers.checkedList,item,'itemCode')){
      headers.checkedList.push(item)
    }else{
      func.removeEle(headers.checkedList,item,'itemCode')
    }
  }
  const removeChecked = (item)=>{
    headers.allList.forEach(obj=>{
      if(item.itemCode == obj.itemCode){
        obj.checked = false
      }
    })
    func.removeEle(headers.checkedList,item,'itemCode')
  }
  const emit = defineEmits(['change'])
  const submit = ()=>{
    let checkedHeaders = [];
    if(headers.checkedList){
      headers.checkedList.forEach(obj=>{
        checkedHeaders.push(obj.itemCode)
      })
    }
    emit('change',checkedHeaders.join(","))
  }
  defineExpose({
    isOpen,
    isClose
  })
</script>
<style lang="scss">
  .selperson_dialog .el-dialog__body{
    padding-top: 0px;
    padding-bottom: 0px;
  }
</style>
<style scoped>
  .checked-box{
    min-height: 50px;
    background: #f1f0f0;
    padding: 10px;
  }
  .all-box{
    min-height: 100px;
  }
</style>