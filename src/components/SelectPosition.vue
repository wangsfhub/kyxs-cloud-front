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
          :disabled="item.postStatus=='0'?true:false"
          :label="item.postName"
          :value="item.id"
      />
    </template>
  </el-select>
</template>

<script>
import {ref,reactive, toRefs} from 'vue'
import {getPostAllList} from "../api/org/position";
export default {
  name: "SelectPosition",
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
      multiple: props.multiple,
      disabled: props.disabled,
      placeholder: props.placeholder,
      options:[]
    });
    const getValue = (data)=>{
      emit('getValue',data)
    }
    onMounted(()=>{
      getPostAllList().then(res=>{
        if(res.code==0){
          data.options = res.data
        }
      })
    })
    return {
      ...toRefs(data),
      getValue
    };
  },
}
</script>
