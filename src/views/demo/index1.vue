<template>
  <span ref="buttonRef" v-click-outside="onClickOutside">
    阿里巴巴
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

<script setup>
import { ref,unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
const props = defineProps({
  selValue: {
    type: String,
    required: true,
  }
});
let selValue = ref('')
watch(() => props.selValue, (newVal, oldVal) => {
  selValue = props.selValue;
})

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
const handleNodeClick = (data) => {
  console.log(data)
}
const defaultProps = {
  children: 'children',
  label: 'label',
}
const treeData =  [
  {
    value: '1',
    label: '阿里巴巴',
    children: [
      {
        value: '1-1',
        label: '信息采集部',
        children: [
          {
            value: '1-1-1',
            label: '销售部',
          },
        ],
      },
    ],
  }
];

</script>
