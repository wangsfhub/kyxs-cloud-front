<template>
    <el-dialog
            ref="personDialog"
            v-model="dialogVisible"
            title="Tips"
            width="30%"
            :before-close="handleClose"
    >
        <span>This is a message</span>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
        </template>
    </el-dialog>
</template>

<script setup>
    import { ref } from 'vue'
    import { ElMessageBox } from 'element-plus'
    const props = defineProps({
        visible:{
            type: Boolean,
            default: false
        }
    })
    const dialogVisible = ref(false)
    watch(() => props.visible, (newVal, oldVal) => {
        dialogVisible.value =newVal;
    })

    const handleClose = (done) => {
        ElMessageBox.confirm('Are you sure to close this dialog?')
            .then(() => {
                done()
            })
            .catch(() => {
                // catch error
            })
    }
    const emit = defineEmits(['submit'])
    const isOpen = () => {
        dialogVisible.value = true
    }
    const isClose = () => {
        dialogVisible.value = false
    }
    defineExpose({
        isOpen,
        isClose
    })
</script>
<style scoped>
    .dialog-footer button:first-child {
        margin-right: 10px;
    }
</style>
