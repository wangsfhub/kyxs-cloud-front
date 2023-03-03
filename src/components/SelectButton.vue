<template>
  <div style="display:flex;">
    <el-button type="primary" size="small" round @click="add" style="width:50px;"><el-icon><i-ep-plus/></el-icon></el-button>
    <span class="selected">
      <template v-for="(item,index) in selecteds">
        <el-tag v-if="index<3">{{item.employeeName}}</el-tag>
      </template>
      <span v-if="selecteds.length>3"> 等 </span>
    </span>
    <SelectPerson ref="personDialog" :data.sync="selecteds" @submit="submit"></SelectPerson>
  </div>
</template>

<script setup>
  import SelectPerson from "@components/SelectPerson.vue"
  import {ref} from 'vue'
  const props = defineProps({
    selecteds: {
      type:Array,
      default:[]
    }
  })
  const emit = defineEmits(['change'])
  const selecteds = ref(props.selecteds);
  const personDialog = ref(null)
  const add = ()=>{
    personDialog.value.isOpen();
  }
  const submit = (data)=>{
    selecteds.value = data
    emit('change',data);
    console.log('selecteds',selecteds.value)
  }
</script>
<style lang="scss" scoped>
  .selected{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .el-tag{
      margin-left: 10px;
    }
  }
</style>
