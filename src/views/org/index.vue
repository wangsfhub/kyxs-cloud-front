<template>
  <div>
    <PageHeader>
      <template #left>
        <OrgTree @getOrgId="setOrgId"/>
      </template>
      <template #right>
        <el-button type="primary" @click="add">新增组织</el-button>
        <el-button type="primary">组织变更</el-button>
        <el-dropdown @click="handleClick" class="mar-l-10">
          <el-button type="primary" plain>
            更多<el-icon class="el-icon--right"><i-ep-arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>排序</el-dropdown-item>
              <el-dropdown-item>导出</el-dropdown-item>
              <el-dropdown-item>变更日志</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </PageHeader>
    <el-table
        :data="tableData"
        style="width: 100%;
        margin-bottom: 20px"
        row-key="id"
        border
    >
      <el-table-column prop="date" label="Date"/>
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="address" label="Address" />
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
import {getOrgList} from "../../api/org";

const setOrgId = (orgId)=>{
  getOrgList(orgId).then((res)=>{
    tableData.value = res.data
  })
}
const handleClick = ()=>{

}
const tableData = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
    children: [
      {
        id: 31,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 32,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ],
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
