<template>
    <el-dialog
            ref="personDialog"
            v-model="dialogVisible"
            title="选择角色"
            width="600px"
            append-to-body
            class="promoter_person"
            custom-class="selperson_dialog"
    >
      <div class="person_body clear">
        <div class="person_tree l">
          <el-input type="text" placeholder="搜索角色" v-model="searchVal" @input="getDebounceData($event,2)"/>
          <selectBox :list="list" />
        </div>
        <selectResult :total="total" @del="delList" :list="resList"/>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </template>
    </el-dialog>
</template>

<script setup>
    import { ref,reactive,computed,getCurrentInstance } from 'vue'
    import { ElMessage } from 'element-plus'
    import mixins from './SelectPerson/mixins.js'
    let {  getRoleList, getDebounceData } = mixins()
    const context = getCurrentInstance()?.appContext.config.globalProperties;
    const func = context?.$func;
    const searchVal = ref("")
    const roles = ref([])
    const checkedRoleList = ref([])
    const dialogVisible = ref(false)
    const list = computed(()=> {
        return [{
          type: 'role',
          not: true,
          data: roles.value,
          isActive: (item) => func.toggleClass(checkedRoleList.value, item, 'id'),
          change: (item) => checkedRoleList.value = [item]
        }]
    })
    const resList = computed(()=> {
      return [{
        type: 'role',
        data: checkedRoleList.value,
        cancel: (item) => func.removeEle(checkedRoleList.value, item, 'id')
      }]
    })
    const delList = computed(()=> {
      return ()=>{
        checkedRoleList.value = [];
      }
    })
    const total = computed(()=> {
      return checkedRoleList.value.length
    })
    const emit = defineEmits(['submit'])
    const isOpen = async () => {
      dialogVisible.value = true
      //加载所有角色
      roles.value = await getRoleList()
    }
    const isClose = () => {
      dialogVisible.value = false
    }
    const submit = ()=>{
      emit('submit','')
      ElMessage.success('选中的数据是：'+JSON.stringify(checkedRoleList.value));
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
.person_body {
  border: 1px solid #f5f5f5;
  height: 400px;
}
.tree_nav span {
  display: inline-block;
  padding-right: 10px;
  margin-right: 5px;
  max-width: 6em;
  color: #38adff;
  font-size: 12px;
  cursor: pointer;
  background: url(../assets/images/jiaojiao.png) no-repeat right center;
}
.tree_nav span:last-of-type {
  background: none;
}
.person_tree {
  padding: 10px 12px 0 8px;
  width: 280px;
  height: 390px;
  border-right: 1px solid #f5f5f5;
  float: left;
}
.person_tree input {
  padding-left: 22px;
  width: 210px;
  height: 30px;
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid #d5dadf;
  background: url(../assets/images/list_search.png) no-repeat 10px center;
  background-size: 14px 14px;
}

.person_tree img {
  width: 14px;
  vertical-align: middle;
  margin-right: 5px;
}
</style>
