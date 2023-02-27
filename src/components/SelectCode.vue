<template>
  <el-select v-model="selectValue" :multiple="multiple" filterable clearable :placeholder="placeholder">
    <el-option
        v-for="item in options"
        :key="item.codeId"
        :label="item.codeName"
        :value="item.codeId"
    />
  </el-select>
</template>

<script>
import {ref,reactive, toRefs} from 'vue'
import {getAllCodes} from "../api/code";
export default {
  name: "orgTree",
  props: {
    setId: {
      type: String,
      required: true,
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
  setup(props) {
    const data = reactive({
      selectValue: '',
      setId: props.setId,
      codeId: [],
      codeName: '',
      multiple: props.multiple,
      placeholder: props.placeholder,
      options:[]
    });
    data.setId = props.setId;
    onMounted(()=>{
      getAllCodes().then((res) => {
        if(data.setId){
          data.options = res.data[data.setId]
        }
      });
    })
    return {
      ...toRefs(data),
    };
  },
}
</script>
