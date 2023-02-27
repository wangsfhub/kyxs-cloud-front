<template>
  <span ref="buttonRef" v-click-outside="onClickOutside">
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
      <el-button style="margin-right: 16px">Click to activate</el-button>
    </template>
    <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" />
  </el-popover>
</template>

<script>
import {ref,reactive, unref, toRefs} from 'vue'
import { getOrgTree } from "../api/org";
export default {
  name: "orgTree",
  props: {
    selValue: {
      type: String,
      required: true,
    }
  },
  setup(props, {emit}) {
    const data = reactive({
      treeData: [],
      checkedName: '',
      selValue: ''
    });
    data.selValue = data.selValue
    const buttonRef = ref()
    const popoverRef = ref()
    const onClickOutside = () => {
      unref(popoverRef).popperRef?.delayHide?.()
    }
    const handleNodeClick = (node) => {
      data.checkedName = node.label
      emit('getOrgId',node.value);
      console.log(node)
    }
    const defaultProps = {
      children: 'children',
      label: 'label',
    }
    onMounted(()=>{
      getOrgTree().then((res) => {
        data.treeData = res.data;
        if(data.selValue==''){
          data.checkedName = res.data[0].label
        }
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

</style>