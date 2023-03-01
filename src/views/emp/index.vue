<template>
  <div>
    <PageHeader>
      <template #left>
        <OrgTree @getOrgId="setOrgId"/>
        <SelectCode setId="9001" @getValue="getValue" :multiple="false" placeholder="请选择状态"/>
        <SelectOrg :multiple="false" @getOrgId="getDeptId" placeholder="请选择部门"/>
        <el-button type="primary" @click="selectPerson">选择人员</el-button>
        <el-button type="primary" @click="selectRole">选择角色</el-button>
      </template>
      <template #right>
        <el-button type="primary" @click="add">新增</el-button>
        <el-button>导出</el-button>
      </template>
    </PageHeader>
    <MycTable :tableData="tableData" :columObj="columObj" :pageObj="pageObj" @switchChange="switchChange" @editInputBlur="editInputBlur" @rowClick="rowClick"
              @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
    </MycTable>
  </div>
  <RightDrawer ref="drawer" title="新增" @submit="submit"></RightDrawer>
  <SelectPerson ref="personDialog" :data.sync="checkedList" @submit="submit"></SelectPerson>
  <SelectRole ref="roleDialog" :data.sync="checkedList" @submit="submit"></SelectRole>
</template>
<script setup>
import { ref,reactive,getCurrentInstance } from 'vue'
import PageHeader from "@components/PageHeader.vue";
import MycTable from "@components/MycTable.vue";
import OrgTree from "@components/OrgTree.vue";
import RightDrawer from "@components/RightDrawer.vue";
import SelectCode from "@components/SelectCode.vue"
import SelectOrg from "@components/SelectOrg.vue"
import SelectPerson from "@components/SelectPerson.vue"
import SelectRole from "@components/SelectRole.vue"
import { ElLoading,ElMessage } from "element-plus"
import {getOrgList} from "../../api/org";
const drawer = ref(null)
const personDialog = ref(null)
const roleDialog = ref(null)
let { proxy } = getCurrentInstance();
let pageObj = reactive({ //分页对象
  position: "right", //分页组件位置  center/right/left
  total: 100,
  pageData: {
    page: 1,
    size: 10,
    superId: ''
  }
});
//加载表哥数据
let tableData = ref([]);
onMounted(()=>{
  getOrgList(pageObj.pageData).then((res)=>{
    tableData.value = res.data
  })
})

let columObj = reactive({
  // 选择框
  selection: true,
  // 选择框根据条件是否可选
  selectable: (row, index) => {
    if (row.switchs) {
      return true;
    }
  },
  lazy: "true",
  //column列,columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
  //prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
  columnData: [{
    text: true,
    prop: "date",
    label: "默认样式",
    width: "",
    align: "center",
  }, {
    text: true,
    prop: "id",
    label: "可以排序",
    width: "",
    align: "center",
    sortable: true, //开启排序

  },
    {
      status: true,
      prop: "objmsg",
      label: "obj类型（mesage）",
      width: "",
      align: "center",
      sortable: false,
    },
    {
      ownDefined: true,
      prop: "address",
      label: "自定义返回内容",
      width: "",
      align: "center",
      sortable: false,
      ownDefinedReturn: (row, $index) => {
        return row.address
      }
    },
    {
      switch: true,
      prop: "switchs",
      label: "switch开关",
      width: "",
      align: "center",
      openText: "打开",
      closeText: "关闭",
      sortable: false,
    },
    {
      image: true,
      prop: "img",
      label: "图片",
      width: "",
      align: "center",
      sortable: false,
    },
    {
      text: true,
      editRow: null,
      prop: "name",
      label: "点击可编辑",
      width: "",
      align: "center",
      sortable: false,
    },
    //如果为操作列,则需要填写需要的操作按钮,类型为Object。operation(操作类型,可选edit,delete,see),type(按钮样式,参考el—botton类型),label(按钮文字)icon(参考el-icon),color(字体颜色)
    {
      isOperation: true,
      label: "操作",
      width: "180",
      align: "center",
      sortable: false,
      operation: [{
        type: "text",
        label: "编辑",
        icon: "",
        color: 'red',
        buttonClick: proxy.rowOperation,
        isShow: (row, $index) => {
          return true;
        }
      }, {
        type: "text",
        label: "删除",
        icon: "",
        color: 'blue',
        buttonClick:undefined,
        isShow: (row, $index) => {
          return true;
        }
      }, {
        type: "primary",
        label: "查看",
        icon: "",
        color: '',
        buttonClick:undefined,
        isShow: (row, $index) => {
          return true;
        }
      }]
    },

  ],
});
const setOrgId = (orgId)=>{
  pageObj.pageData.page = 1;
  pageObj.pageData.superId = orgId
  getOrgList(pageObj.pageData).then((res)=>{
    tableData.value = res.data
  })
}
const add = () =>{
  drawer.value.isOpen()
}
const rowOperation = (row, $index) =>{
  console.log(row, $index)
}
const switchChange = (row, $index, prop) => {
  console.log(row, $index, prop)
};
const rowClick = (row, column)=> {
  // 点击行触发，编辑点击的所在列，排除selection选择框
  if (column.type != 'selection' && columObj.columnData[column.index].editRow === null) {
    columObj.columnData[column.index].editRow = row.rowIndex;
  }
};
const editInputBlur = (row, $index, prop, columIndex) =>{
  columObj.columnData[columIndex].editRow = null;
};
//页码变化
const handleCurrentChange = (e)=> {
  pageObj.pageData.page = e;
};
//条数变化
const handleSizeChange = (e)=>{
  pageObj.pageData.size = e;
  pageObj.pageData.page = 1;
}
const submit = ()=>{
  // ElLoading.service({
  //   text:'提交中...'
  // })
}
const getValue = (val) =>{
  ElMessage.success("选中的值："+val);
}
const getDeptId = (val) =>{
  ElMessage.success("选中的值："+val);
}

const checkedList = ref([])
const selectPerson = ()=>{
  personDialog.value.isOpen()
}
const selectRole = ()=>{
  roleDialog.value.isOpen()
}
</script>
<style lang="scss">
</style>
