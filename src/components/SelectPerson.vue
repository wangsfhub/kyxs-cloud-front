<template>
    <el-dialog
            ref="personDialog"
            v-model="dialogVisible"
            title="选择成员"
            width="600px"
            append-to-body
            class="promoter_person"
            custom-class="selperson_dialog"
    >
      <div class="person_body clear">
        <div class="person_tree l">
          <input type="text" placeholder="搜索成员" style="padding-left:30px;" v-model="searchVal" @input="getDebounceData($event)">
          <p class="ellipsis tree_nav" v-if="!searchVal">
            <span @click="getDepartmentList(0)" class="ellipsis">全部</span>
            <span v-for="(item,index) in departments.titleDepartments" class="ellipsis"
                  :key="index+'a'" @click="getDepartmentList(item.id)">{{item.departmentName}}</span>
          </p>
          <selectBox :list="list"/>
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
    import mixins from './SelectPerson/mixins.js'
    let {  getDepartmentList, getDebounceData }=mixins()
    const context = getCurrentInstance()?.appContext.config.globalProperties;
    const func = context?.$func;
    const props = defineProps({
        data:{
          type: Array,
          default: []
        },
        isDepartment:{
          type:Boolean,
          default: false
        }
    })
    const searchVal = ref("")
    const dialogVisible = ref(false)
    const checkedDepartmentList = ref([])
    const checkedEmployessList= ref([])
    const isDepartment = ref(false)
    const departments = reactive({})
    watch(props.data,(newVal,oldVal)=>{
      checkedDepartmentList.value = newVal.filter(item => item.type === 1).map(({ name, targetId }) => ({
        employeeName: name,
        id: targetId
      }));
      checkedEmployessList.value = newVal.filter(item => item.type === 3).map(({ name, targetId }) => ({
        departmentName: name,
        id: targetId
      }));
    })
    const list = computed(()=> {
        return [{
          isDepartment: isDepartment.value,
          type: 'department',
          data: departments.childDepartments,
          isActive: (item) => func.toggleClass(checkedDepartmentList.value, item),
          change: (item) => func.toChecked(checkedDepartmentList.value, item),
          next: (item) => getDepartmentList(item.id)
        }, {
          type: 'employee',
          data: departments.employees,
          isActive: (item) => func.toggleClass(checkedEmployessList.value, item),
          change: (item) => func.toChecked(checkedEmployessList.value, item),
        }]
    })
    const resList = computed(()=> {
        let data = [{
          type: 'employee',
          data: checkedEmployessList.value,
          cancel: (item) => func.removeEle(checkedEmployessList.value, item)
        }]
        if (isDepartment.value) {
          data.unshift({
            type: 'department',
            data: checkedDepartmentList.value,
            cancel: (item) => func.removeEle(checkedDepartmentList.value, item)
          })
        }
        return data
    })
    const delList = computed(()=> {
      return ()=>{
        checkedDepartmentList.value = [];
        checkedEmployessList.value = []
      }
    })
    const total = computed(()=> {
      return checkedDepartmentList.value.length + checkedEmployessList.value.length
    })
    const emit = defineEmits(['submit'])
    const isOpen = async () => {
        dialogVisible.value = true
        //加载数据
        let {childDepartments,employees,titleDepartments} = await getDepartmentList()
        departments.childDepartments= childDepartments
        departments.employees= employees
        departments.titleDepartments= titleDepartments
    }
    const isClose = () => {
        dialogVisible.value = false
    }
    const submit = ()=>{
      emit('submit','')
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
