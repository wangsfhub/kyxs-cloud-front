<template>
  <el-select
      v-model="value"
      :multiple="multiple"
      :disabled="disabled"
      filterable
      clearable
      :placeholder="placeholder"
      @change="getValue">
    <template v-for="item in options" :key="item.id">
      <el-option
          :disabled="item.codeStatus=='0'?true:false"
          :label="item.codeName"
          :value="item.id"
      />
    </template>
  </el-select>
</template>

<script>
import {ref,reactive, toRefs} from 'vue'
import {getCodeItemBySetId} from "../utils/codeItem";
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
    disabled: {
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
      disabled: props.disabled,
      placeholder: props.placeholder,
      options:[]
    });
    const getValue = (data)=>{
      emit('getValue',data)
    }
    onMounted(()=>{
      if(data.setId){
        data.options = getCodeItemBySetId(data.setId)
      }
    })
    return {
      ...toRefs(data),
      getValue
    };
  },
}
</script>
