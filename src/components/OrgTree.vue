<template>
  <span ref="buttonRef" v-click-outside="onClickOutside" class="current">
    {{checkedName}}
    <icon-down-one
        class="icon-hover"
        theme="filled"
        size="16"
        fill="#666"
        :strokeWidth="3"
    />
  </span>
  <el-popover
      ref="popoverRef"
      :virtual-ref="buttonRef"
      trigger="click"
      placement="bottom-start"
      :highlight-current="true"
      virtual-triggering
      :width="300"
  >
    <template #reference>

    </template>
    <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" />
  </el-popover>
</template>

<script>
import {ref,reactive, unref, toRefs} from 'vue'
import { getOrgTree } from "../api/org/dept";
export default {
  name: "orgTree",
  setup(props, {emit}) {
    const data = reactive({
      treeData: [],
      checkedName: '',
    });
    const buttonRef = ref()
    const popoverRef = ref()
    const onClickOutside = () => {
      unref(popoverRef).popperRef?.delayHide?.()
    }
    const handleNodeClick = (node) => {
      data.checkedName = node.deptName
      //由于筛选时，选择顶级公司意味着，不带条件查询，因此再选择顶级时，返回的机构ID为''
      emit('getOrgId',node.superId==-1?'':node.id);
      console.log(node)
    }
    const defaultProps = {
      value:'id',
      children: 'children',
      label: 'deptName',
    }
    onMounted(()=>{
      getOrgTree().then((res) => {
        data.treeData = res.data;
        data.checkedName = res.data[0].deptName
      });
    })
    return {
      ...toRefs(data),
      buttonRef,
      defaultProps,
      onClickOutside,
      handleNodeClick
    };
  },
}
</script>
<style lang="scss" scoped>
    .current{
      cursor: pointer;
      font-size: 14px;
    }
</style>