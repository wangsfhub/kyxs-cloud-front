<template>
  <div>
    <PageHeader>
      <template #left>
        <OrgTree @getOrgId="setOrgId"/>
      </template>
      <template #right>
        <el-button type="primary" @click="add">新增</el-button>
        <el-button type="primary">组织变更</el-button>
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
    >
      <el-table-column prop="orgName" label="组织名称" width="200" filter>
        <template #header="{ column, $index }">
              <table-header-filter :column="column" @filterChange="filterChange"/>
        </template>
      </el-table-column>
      <el-table-column prop="orgNo" label="组织编号" align="center"/>
      <el-table-column prop="orgType" label="组织类别" align="center"/>
      <el-table-column prop="chargePerson" label="负责人" align="center"/>
      <el-table-column prop="headCount" label="人员编制" width="110" align="center" sortable/>
      <el-table-column prop="currentCount" label="当前人数" width="110" align="center" sortable/>
      <el-table-column label="是否超编" align="center">
        <template #default="{row}">
          <el-tag type="danger" v-if="row.currentCount>row.headCount">超编</el-tag>
          <el-tag type="success" v-else-if="row.currentCount==row.headCount">满编</el-tag>
          <el-tag type="warning" v-else>缺编</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160" align="center" sortable/>
      <el-table-column fixed="right" prop="operates" label="操作" align="center" width="120">
          <template #default="{row}">
            <el-button link type="primary" size="small" @click="handleEdit">编辑</el-button>
            <el-button link type="primary" size="small">添加下级</el-button>
          </template>
      </el-table-column>
    </el-table>
    <RightDrawer ref="drawer" title="新增" @submit=""></RightDrawer>
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
import { ElMessage } from "element-plus";
import {getOrgList} from "../../api/org";
import {ref,nextTick} from "vue";
const drawer = ref(null)
const add = () =>{
  nextTick(() => {
    drawer.value.isOpen()
  })
}
const setOrgId = (orgId)=>{
  getOrgList(orgId).then((res)=>{
    tableData.value = res.data
  })
}
const handleCommand = (command) => {
  switch (command) {
    case 'sort':
      ElMessage.success('排序');
      break;
    case 'chart':
      ElMessage.success('组织架构图');
      break;
    case 'change':
      ElMessage.success('组织变更');
      break;
    case 'export':
      ElMessage.success('导出');
      break;
    default:
      break;
  }
};
const handleEdit = ()=>{

}
//自定义搜索回调
const filterChange = (val)=>{
  ElMessage.success(val)
}
const tableData = [
  {
    id: 1,
    orgName: '阿里巴巴中国',
    orgNo: 'A001',
    orgType: '公司',
    chargePerson: '张三',
    headCount: '20',
    currentCount: '10',
    createTime:"2023-11-11 12:30:11"
  },
  {
    id: 2,
    orgName: '研发部',
    orgNo: 'A002',
    orgType: '部门',
    chargePerson: '张三',
    headCount: '20',
    currentCount: '20',
    createTime:"2023-11-11 12:30:11"
  },
  {
    id: 3,
    orgName: '销售部',
    orgNo: 'A003',
    orgType: '部门',
    chargePerson: '张三',
    headCount: '20',
    currentCount: '30',
    createTime:"2023-11-11 12:30:11",
    children: [
      {
        id: 31,
        orgName: '销售部1',
        orgNo: 'A003',
        orgType: '部门',
        chargePerson: '张三',
        headCount: '20',
        currentCount: '30',
        createTime:"2023-11-11 12:30:11",
      },
      {
        id: 32,
        orgName: '销售部2',
        orgNo: 'A003',
        orgType: '部门',
        chargePerson: '张三',
        headCount: '20',
        currentCount: '30',
        createTime:"2023-11-11 12:30:11",
      },
    ],
  }
]
</script>
