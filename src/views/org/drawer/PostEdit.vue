<template>
    <RightDrawer ref="drawer" title="新增" @submit="submitForm(postFormRef)">
        <template #default>
            <el-form
                    ref="postFormRef"
                    :model="postForm"
                    :rules="rules"
                    label-width="80px"
            >
                <el-form-item label="岗位名称" prop="postName">
                    <el-input v-model="postForm.postName" style="width:220px"/>
                </el-form-item>
                <el-form-item label="所属部门" prop="deptId">
                    <select-org v-model="postForm.deptId"></select-org>
                </el-form-item>
                <el-form-item label="岗位类别" prop="postType">
                    <select-code v-model="postForm.postType" set-id="9001"></select-code>
                </el-form-item>
                <el-form-item label="编制人数">
                    <el-input v-model="postForm.headCount" style="width:220px"/>
                </el-form-item>
                <el-form-item label="岗位工资">
                    <el-input v-model="postForm.salary" style="width:220px"/>
                </el-form-item>
                <el-form-item label="岗位描述">
                    <el-input v-model="postForm.postDesc" type="textarea" style="width:220px"/>
                </el-form-item>
            </el-form>
        </template>
    </RightDrawer>
</template>

<script setup>
    import { ElMessage } from 'element-plus'
    import { reactive, ref } from 'vue'
    const postFormRef = ref(null)
    const drawer = ref(null)
    const init = ()=>{
        drawer.value.isOpen()
    };
    defineExpose({
        init
    })
    const postForm = reactive({
        id: '',
        deptId:'',
        postName: '',
        postType: '',
        salary: '',
        headCount: '',
        postDesc:''
    })
    const rules = reactive({
        postName: [{required: true, message: '请输入岗位名称', trigger: 'blur' }],
        deptId: [{required: true, message: '请选择所属部门', trigger: 'change'}],
        postType: [{required: true, message: '请选择类别', trigger: 'change'}]
    })

    const submitForm = async (formEl) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                ElMessage.success(JSON.stringify(postForm))
                console.log('submit!')
            } else {
                console.log('error submit!', fields)
            }
        })
    }
</script>


<style scoped>

</style>