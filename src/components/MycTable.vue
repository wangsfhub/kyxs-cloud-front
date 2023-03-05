<!--
 表格封装
 -->
<template>
    <div>
      <el-table size="medium" :data="tableData" :stripe="false" :border="false" :fit="true" :show-header="true"
                :highlight-current-row="true" v-loading="columObj.loading" :row-class-name="tableRowClassName"
                @row-click="rowClick" :style="'height: calc(100vh - 60px - '+(tag?55:0)+'px - 20px - 62px - '+topHeight+'px)'">
          <!-- 选择框是否开启，selectable控制是否单行禁用 -->
          <el-table-column v-if="columObj.selection" type="selection" :selectable="columObj.selectable" width="50px"/>
          <!-- 普通列 -->
          <el-table-column v-for="(curColumn,columIndex) in columObj.columnData" :key="columIndex" :prop="curColumn.prop"
                           :label="curColumn.label" :width="curColumn.width" :fixed="curColumn.fixed" :align="curColumn.align || 'center'"
                           :sortable="curColumn.sortable" :index="columIndex" show-overflow-tooltip>
            <template v-if="curColumn.filter" #header="{ column, $index }">
              <table-header-filter :column="column" :filterObj="curColumn.filter" @filterChange="filterChange"/>
            </template>
            <template #default="{row,$index}">
                  <!-- 默认展示 -->
                  <span v-if="curColumn.text && curColumn.editRow != $index">{{row[curColumn.prop]}}</span>
                  <!-- 代码展示 -->
                  <span v-if="curColumn.code && curColumn.editRow != $index">{{translateCode(curColumn.setId,row[curColumn.prop])}}</span>
                  <!-- 状态对象展示 -->
                  <span v-if="curColumn.status && row[curColumn.prop]">{{row[curColumn.prop].msg}}</span>
                  <!-- 自定义内容 -->
                  <template v-if="curColumn.ownDefined">
                    <template v-if="curColumn.definedType == 'tag'">
                      <el-tag v-if="curColumn.ownDefinedReturn(row,$index)" :type="curColumn.ownDefinedReturn(row,$index).type">{{curColumn.ownDefinedReturn(row,$index).value}}</el-tag>
                      <span v-else>—</span>
                    </template>
                    <span v-else>{{curColumn.ownDefinedReturn(row,$index)}}</span>
                  </template>
                  <!-- switch开关 -->
                  <el-switch v-if="curColumn.switch" v-model="row[curColumn.prop]" :active-value="curColumn.activeValue" :inactive-value="curColumn.inactiveValue" @change="switchChange(row,$index,curColumn.prop)"/>
                  <!-- 可编辑input，仅在text默认展示类型才可编辑-->
                  <el-input v-focus v-if="curColumn.editRow == $index" v-model="row[curColumn.prop]" @blur="editInputBlur(row,$index,curColumn.prop,columIndex)"/>
                  <!-- 操作按钮 -->
                  <span v-if="curColumn.isOperation" v-for="(operations, index) in curColumn.operation" :key="index">
                    <el-button link v-if="operations.isShow(row,$index)" :icon="operations.icon" :type="operations.type" @click="operations.buttonClick(row,$index)" size="small">{{operations.label}}</el-button>
                  </span>
              </template>
          </el-table-column>

        <template #empty>
          <el-empty :image-size="150" class="empty"/>
        </template>
      </el-table>
      <!-- 分页 -->
      <div class="page_div" :style="{textAlign: pageObj.position || 'center'}">
         <el-pagination background :style="{justifyContent: pageObj.position || 'center'}"
           @size-change="handleSizeChange" @current-change="handleCurrentChange"
           :hide-on-single-page="false" :current-page="pageObj.pageData.current"
           :page-sizes="[10, 15, 20, 30,50]" :page-size="pageObj.pageData.size"
           layout="total,sizes,prev, pager, next" :total="pageObj.pageData.total">
         </el-pagination>
      </div>
    </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {translateCode} from "@/utils/codeItem";
import { useStore } from 'vuex';
const store = useStore();
const props = defineProps({
  tableData: {
    type: Array,
    required: true
  },
  columObj: {
    type: Object,
    required: true
  },
  //columObj.type(如果为""空，就不会加载多选框，或者index编号),lazy(是否支持懒加载)
  //columnData.columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
  //prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
  //如果为操作列,则需要填写需要的操作按钮,类型为Object。type(按钮样式,参考el—botton类型),label(按钮文字)icon(参考el-icon),color(字体颜色),buttonClick为点击后调用的方法名称
  pageObj: {
    type: Object,
    required: true
  },
  topHeight:{
    type: Number,
    default: 0
  },
  autoHeight:{
    type: Boolean,
    default: true
  }
});
let autoHeight = ref(true)
watch(() => props.autoHeight, (newVal, oldVal) => {
  autoHeight.value = newVal;
})
const topHeight = ref(0)
watch(() => props.topHeight, (newVal, oldVal) => {
  topHeight.value = props.topHeight;
})
//是否显示页签
const tag = computed(() => {
  return store.getters['setting/tag'];
});
onMounted(()=>{
  if(autoHeight.value){
    topHeight.value = store.getters['user/pageHeaderHeight']
  }
});
const emit = defineEmits(['filterChange','switchChange','rowClick','editInputBlur','handleSizeChange','handleCurrentChange']);
// switchChange调用
const  switchChange = (row, $index, prop) => {
  emit("switchChange", row, $index, prop);
};
//
const filterChange = (item)=>{
  emit("filterChange", item);
}
// 帮助点击行，获取点击的下标
const tableRowClassName= ({row, rowIndex}) => {
  row.rowIndex = rowIndex;
};
// 点击行
const rowClick = (row, column, event)=>{
  emit("rowClick", row, column, event);
};
// 可编辑input失去焦点
const editInputBlur = (row, $index, prop, columIndex)=> {
  emit('editInputBlur', row, $index, prop, columIndex);
};
// 条数变化
const handleSizeChange = (e) => {
  emit('handleSizeChange', e);
};
// 页码变化
const handleCurrentChange = (e) =>{
  emit('handleCurrentChange', e);
};
</script>
<style lang="scss" scoped>
    .el-button {
        margin: 0 6px;
    }

    :deep(.el-input__inner) {
        border: none;
    }

    :deep(.el-image__inner) {
        height: 50px;
    }

    // switch左边文字颜色
    :deep(.el-switch__label--left) {
        color: #606266;
    }

    .page_div {
        padding: 15px 15px;
    }
    .empty{
      margin-top: 20%;
    }
</style>
