<template>
  <div>
    <PageHeader>
      <template #left>
        <OrgTree @getOrgId="setOrgId"/>
      </template>
      <template #right>
        <el-button type="primary" @click="add">新增</el-button>
        <el-button type="primary" @click="change">组织变更</el-button>
        <el-dropdown ref="orgMoreBtn" class="mar-l-10" @command="handleCommand">
          <el-button type="primary" plain>
            更多<el-icon class="el-icon--right"><i-ep-arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="sort">组织排序</el-dropdown-item>
              <el-dropdown-item command="chart">组织架构图</el-dropdown-item>
              <el-dropdown-item command="change">变更日志</el-dropdown-item>
              <el-dropdown-item command="export">导出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </PageHeader>
    <el-table
        :data="tableData"
        style="width: 100%;"
        row-key="id"
        :stripe="false" :border="false" :fit="true" :show-header="true"
        :highlight-current-row="true"
        :style="'height: calc(100vh - 60px - '+(tag?55:0)+'px - 20px - '+topHeight+'px)'"
    >
      <el-table-column prop="deptName" label="组织名称" width="200" filter>
        <template #header="{ column, $index }">
              <table-header-filter :column="column" :filters.sync="filters" :filterObj="{type:'input',operator:'like'}" @filterChange="filterChange"/>
        </template>
      </el-table-column>
      <el-table-column prop="deptNo" label="组织编号" align="center"/>
      <el-table-column prop="deptType" label="组织类别"  align="center">
        <template #header="{ column, $index }">
          <table-header-filter :column="column" :filterObj="{type:'select',operator:'=',setId:'11'}" @filterChange="filterChange"/>
        </template>
        <template #default="{ row }">
            <span>{{translateCode('11',row.deptType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="leaderName" label="负责人" align="center"/>
      <el-table-column prop="headCount" label="人员编制" width="110" align="center" sortable/>
      <el-table-column prop="currentCount" label="当前人数" width="110" align="center" sortable/>
      <el-table-column label="是否超编" align="center">
        <template #default="{row}">
          <span v-if="row.headCount==0">—</span>
          <el-tag type="danger" v-else-if="row.currentCount>row.headCount">超编</el-tag>
          <el-tag type="success" v-else-if="row.currentCount==row.headCount">满编</el-tag>
          <el-tag type="warning" v-else>缺编</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160" align="center" sortable/>
      <el-table-column fixed="right" prop="operates" label="操作" align="center" width="120">
          <template #default="{row}">
            <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="primary" size="small" @click="handleAddNext(row)">添加下级</el-button>
          </template>
      </el-table-column>
    </el-table>
    <OrgEdit ref="orgEdit" @refresh="query"></OrgEdit>
    <OrgChange ref="orgChange" @refresh="query"></OrgChange>
  </div>
</template>
<script setup>
// interface User {
//   id: number
//   date: string
//   name: string
//   address: string
//   hasChildren?: boolean
//   children?: User[]
// }
//
import OrgEdit from './drawer/OrgEdit.vue'
import OrgChange from './drawer/OrgChange.vue'
import { ElMessage } from "element-plus";
import {getOrgList} from "../../api/org/dept";
import {translateCode} from "../../utils/codeItem";
import {ref, reactive,nextTick, getCurrentInstance, computed} from "vue";
import { useStore } from 'vuex';
const store = useStore();

const context = getCurrentInstance()?.appContext.config.globalProperties;
const func = context?.$func;

const orgEdit = ref(null)
const orgChange = ref(null)
const add = () =>{
  nextTick(() => {
    orgEdit.value.init({})
  })
}
const change = () =>{
  nextTick(() => {
    orgChange.value.init()
  })
}

//表头筛选数组对象
const filters = ref([]);
const filterObj = reactive({
  superId:-1,
  deptName:''
})
const setOrgId = (orgId)=>{
  filterObj.superId = orgId
  query()
}
const tableData = ref([])
onMounted(()=>{
  query();
})
//加载数据
const query = () =>{
  getOrgList(filterObj).then((res)=>{
    tableData.value = res.data
  })
}
//是否显示页签
const tag = computed(() => {
  return store.getters['setting/tag'];
});
const topHeight = computed(() => {
  return store.getters['user/pageHeaderHeight'];
});
const handleCommand = (command) => {
  switch (command) {
    case 'sort':
      ElMessage.success('排序');
      break;
    case 'chart':
      ElMessage.success('组织架构图');
      break;
    case 'change':
      ElMessage.success('变更日志');
      break;
    case 'export':
      ElMessage.success('导出');
      break;
    default:
      break;
  }
};
const handleEdit = (row)=>{
  nextTick(() => {
    orgEdit.value.init(row)
  })
}
const handleAddNext = (row)=>{
  nextTick(() => {
    orgEdit.value.addNext(row.id)
  })
}
//自定义搜索回调
const filterChange = (item)=>{
  //格式化数据
  func.filteItemsChecked(filters.value, item)
  if(filters.value){
    filters.value.forEach(dept =>{
      filterObj[dept['column']] = dept['value']
    })
    query()
  }
}

</script>
