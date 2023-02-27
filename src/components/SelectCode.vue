<template>
  <el-select
      v-model="value"
      :multiple="multiple"
      filterable
      clearable
      :placeholder="placeholder"
      @change="getValue">
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
  name: "SelectCode",
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
  setup(props,{ emit }) {
    const data = reactive({
      value: '',
      setId: props.setId,
      codeId: [],
      codeName: '',
      multiple: props.multiple,
      placeholder: props.placeholder,
      options:[]
    });
    const getValue = (data)=>{
      emit('getValue',data)
    }
    onMounted(()=>{
      getAllCodes().then((res) => {
        if(data.setId){
          data.options = res.data[data.setId]
        }
      });
    })
    return {
      ...toRefs(data),
      getValue
    };
  },
}
</script>
