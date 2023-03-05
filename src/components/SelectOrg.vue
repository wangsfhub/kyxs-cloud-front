<template>
  <el-tree-select
      v-model="value"
      :data="treeData"
      check-strictly
      :render-after-expand="false"
      :multiple="multiple"
      filterable
      clearable
      :props="defaultProps"
      :placeholder="placeholder"
      @change="getValue"/>
</template>

<script>
import {reactive, toRefs} from 'vue'
import { getOrgTree } from "../api/org/dept";
export default {
  name: "orgTree",
  props: {
    selValue: {
      type: String,
      default: '',
    },
    placeholder:{
      type: String,
      default: '请选择'
    },
    multiple: {
      type: Boolean,
      default: false
    },
  },
  setup(props, {emit}) {
    const data = reactive({
      treeData: [],
      value: props.selValue,
      multiple: props.multiple,
      placeholder: props.placeholder,
    });
    const getValue = (val) => {
      emit('getOrgId',val);
      console.log(val)
    }
    const defaultProps = {
      value:'id',
      children: 'children',
      label: 'deptName',
    }
    onMounted(()=>{
      getOrgTree().then((res) => {
        data.treeData = res.data;
      });
    })
    return {
      ...toRefs(data),
      getValue,
      defaultProps
    };
  },
}
</script>

<style scoped>

</style>