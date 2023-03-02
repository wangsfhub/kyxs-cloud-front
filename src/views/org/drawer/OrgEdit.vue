<template>
    <RightDrawer ref="drawer" title="新增" @submit="submitForm(orgFormRef)">
        <template #default>
            <el-form
                    ref="orgFormRef"
                    :model="orgForm"
                    :rules="rules"
                    label-width="80px"
            >
                <el-form-item label="部门名称" prop="orgName">
                    <el-input v-model="orgForm.orgName" style="width:220px"/>
                </el-form-item>
                <el-form-item label="部门编号">
                    <el-input v-model="orgForm.orgNo" style="width:220px"/>
                </el-form-item>
                <el-form-item label="上级部门" prop="superId">
                    <select-org v-model="orgForm.superId"></select-org>
                </el-form-item>
                <el-form-item label="组织类别" prop="orgType">
                    <select-code v-model="orgForm.orgType" set-id="9001"></select-code>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model="orgForm.chargePerson" style="width:220px"/>
                </el-form-item>
                <el-form-item label="编制人数">
                    <el-input v-model="orgForm.headCount" style="width:220px"/>
                </el-form-item>
                <el-form-item label="组织描述">
                    <el-input v-model="orgForm.orgDesc" type="textarea" style="width:220px"/>
                </el-form-item>
            </el-form>
        </template>
    </RightDrawer>
</template>

<script setup>
    import { ElMessage } from 'element-plus'
    import { reactive, ref } from 'vue'
    const orgFormRef = ref(null)
    const drawer = ref(null)
    const init = ()=>{
        drawer.value.isOpen()
    };
    defineExpose({
        init
    })
    const orgForm = reactive({
        id: '',
        superId:'',
        orgName: '',
        orgNo: '',
        orgType: '',
        chargePerson: '',
        headCount: '',
        orgDesc:''
    })
    const rules = reactive({
        orgName: [{required: true, message: '请输入部门名称', trigger: 'blur' }],
        superId: [{required: true, message: '请选择上级部门', trigger: 'change'}],
        orgType: [{required: true, message: '请选择类别', trigger: 'change'}]
    })

    const submitForm = async (formEl) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                ElMessage.success(JSON.stringify(orgForm))
                console.log('submit!')
            } else {
                console.log('error submit!', fields)
            }
        })
    }
</script>


<style scoped>

</style>