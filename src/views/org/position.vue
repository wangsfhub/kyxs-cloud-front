<template>
    <div>
        <PageHeader>
            <template #left>
                <OrgTree @getOrgId="setOrgId"/>
            </template>
            <template #right>
                <el-button type="primary" @click="add">新增</el-button>
                <el-button type="primary">岗位架构图</el-button>
                <el-button type="primary">导出</el-button>
            </template>
        </PageHeader>
        <MycTable :tableData="tableData" :columObj="columObj" :pageObj="pageObj" @filterChange="filterChange" @switchChange="switchChange" @editInputBlur="editInputBlur" @rowClick="rowClick"
                  @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
        </MycTable>
        <PostEdit ref="postEdit"  @refresh="query"></PostEdit>
    </div>
</template>
<script setup>
    import PostEdit from './drawer/PostEdit.vue'
    import {ref, reactive, getCurrentInstance, nextTick} from 'vue'
    import PageHeader from "@components/PageHeader.vue";
    import MycTable from "@components/MycTable.vue";
    import OrgTree from "@components/OrgTree.vue";
    import { ElLoading,ElMessage } from "element-plus"
    import {getPostList,updatePostStatus,deleteById} from "../../api/org/position";
    const context = getCurrentInstance()?.appContext.config.globalProperties;
    const func = context?.$func;
    const postEdit = ref(null)
    let { proxy } = getCurrentInstance();
    let pageObj = reactive({ //分页对象
        position: "right", //分页组件位置  center/right/left
        pageData: {
            total: 0,
            current: 1,
            size: 20,
            filterItems:[]
        }
    });
    //加载表哥数据
    let tableData = ref([]);
    onMounted(()=>{
      query()
    })
    const query = ()=>{
      getPostList(pageObj.pageData).then((res)=>{
        tableData.value = res.data.records;
        pageObj.pageData.total = res.data.total
      })
    }
    let columObj = reactive({
        // 选择框
        selection: false,
        lazy: "true",
        //column列,columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
        //prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
        columnData: [{
            text: true,
            filter: {type:'input',operator:'like'},
            prop: "postName",
            label: "岗位名称",
            width: "",
            align: "center"
        }, {
            text: true,
            prop: "deptName",
            label: "所属部门",
            width: "",
            align: "center",
        },
          {
              code: true,
              setId:'6',
              prop: "postType",
              label: "岗位类别",
              width: "",
              align: "center",
              sortable: false,
          },
          {
              text: true,
              prop: "headCount",
              label: "人员编制",
              width: "110",
              align: "center",
              sortable: true,
          },
          {
              text: true,
              prop: "currentCount",
              label: "当前人数",
              width: "110",
              align: "center",
              sortable: true,
          },
          {
              ownDefined: true,
              definedType:'tag',
              prop: "",
              label: "是否超编",
              width: "",
              align: "center",
              sortable: false,
              ownDefinedReturn: (row, $index) => {
                if(row.headCount==0){
                  return null;
                }
                else if(row.headCount<row.currentCount){
                  return {value:'超编',type:'danger'};
                }
                else if(row.headCount==row.currentCount){
                  return {value:'满编',type:'success'}
                }
                else{
                  return {value:'缺编',type:'warning'}
                }
              }
          },
          {
              switch: true,
              activeValue:"1",
              inactiveValue:"0",
              prop: "postStatus",
              label: "岗位状态",
              width: "",
              align: "center",
              sortable: false,
          },
        {
          text: true,
          prop: "postSalary",
          label: "岗位工资",
          width: "",
          align: "center",
          sortable: false,
        },
        {
          text: true,
          prop: "postDesc",
          label: "岗位描述",
          width: "",
          align: "center",
          sortable: false,
        },
        {
          text: true,
          prop: "createTime",
          label: "创建时间",
          width: "",
          align: "center",
          sortable: false,
        },
          //如果为操作列,则需要填写需要的操作按钮,类型为Object。operation(操作类型,可选edit,delete,see),type(按钮样式,参考el—botton类型),label(按钮文字)icon(参考el-icon),color(字体颜色)
          {
              isOperation: true,
              label: "操作",
              width: "120",
              align: "center",
              sortable: false,
              fixed: 'right',
              operation: [{
                  type: "primary",
                  label: "编辑",
                  icon: "",
                  buttonClick: (row, $index) => {
                    edit(row,$index)
                  },
                  isShow: (row, $index) => {
                    return true;
                  }
              }, {
                  type: "primary",
                  label: "删除",
                  icon: "",
                  buttonClick:(row, $index) => {
                    del(row,$index)
                  },
                  isShow: (row, $index) => {
                    return true;
                  }
              }]
          },
        ],
    });
    const setOrgId = (orgId)=>{
        pageObj.pageData.current = 1;
        let currentFilterItem = {column:'deptId',operator:'=',value:orgId};
        func.filteItemsChecked(pageObj.pageData.filterItems, currentFilterItem)
        query()
    }
    //自定义搜索回调
    const filterChange = (item)=>{
      //格式化数据
      func.filteItemsChecked(pageObj.pageData.filterItems, item)
      pageObj.pageData.current = 1;
      query()
    }
    const add = () =>{
        nextTick(() => {
            postEdit.value.init()
        })
    }
    //编辑
    const edit = (row, $index) =>{
        console.log(row, $index)
        postEdit.value.init(row)
    }
    //删除
    const del = (row, $index) =>{
      deleteById(row.id).then((res)=>{
        if(res.code==0){
          ElMessage.success('删除成功')
          pageObj.pageData.current = 1;
          query();
        }
      })
    }
    //修改启用禁用状态
    const switchChange = (row, $index, prop) => {
        console.log(row, $index, prop);
        let update = {};
        update[prop] = row[prop]
        update['id'] = row['id']
        updatePostStatus(update).then((res)=>{
          if(res.code==0){
            if(row[prop]=='1'){
              ElMessage.success('启用成功')
            }else if(row[prop]=='0'){
              ElMessage.success('禁用成功')
            }
          }
        })
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
        pageObj.pageData.current = e;
        query();
    };
    //条数变化
    const handleSizeChange = (e)=>{
        pageObj.pageData.size = e;
        pageObj.pageData.current = 1;
        query();
    }
</script>
<style lang="scss">
</style>
