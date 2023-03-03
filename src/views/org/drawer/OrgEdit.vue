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
                    <el-input v-model="orgForm.orgName" style="width:250px" placeholder="请输入部门名称"/>
                </el-form-item>
                <el-form-item label="部门编号">
                    <el-input v-model="orgForm.orgNo" style="width:250px" placeholder="请输入部门编号"/>
                </el-form-item>
                <el-form-item label="上级部门" prop="superId">
                    <select-org v-model="orgForm.superId" style="width:250px" placeholder="请选择上级部门"></select-org>
                </el-form-item>
                <el-form-item label="部门类别" prop="orgType">
                    <select-code v-model="orgForm.orgType" set-id="9001" style="width:250px" placeholder="请选择组织类别"></select-code>
                </el-form-item>
                <el-form-item label="负责人">
                    <select-button @change="getPersons"></select-button>
<!--                    <el-input v-model="orgForm.chargePerson" style="width:250px" placeholder="请选择负责人"/>-->
                </el-form-item>
                <el-form-item label="编制人数" prop="headCount">
                    <el-input v-model="orgForm.headCount" style="width:250px" placeholder="请输入编制人数"/>
                </el-form-item>
                <el-form-item label="部门描述">
                    <el-input v-model="orgForm.orgDesc" type="textarea" style="width:250px" placeholder="请输入组织描述"/>
                </el-form-item>
            </el-form>
        </template>
    </RightDrawer>
</template>

<script setup>
    import { ElMessage } from 'element-plus'
    import {getCurrentInstance, reactive, ref} from 'vue'
    import { checkInteger } from '@/utils/validate'
    import { saveOrgInfo } from "../../../api/org";
    const context = getCurrentInstance()?.appContext.config.globalProperties;
    const func = context?.$func;

    const orgFormRef = ref(null)
    const drawer = ref(null)
    const init = (form)=>{
      if(form){
        //给整个对象赋值
        func.copyProperties(orgForm,form)
      }
      drawer.value.isOpen()
    };
    const emit = defineEmits(['refresh'])
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
        orgType: [{required: true, message: '请选择类别', trigger: 'change'}],
        headCount: [{ validator: checkInteger, trigger: 'blur' }],
    })
    const getPersons = (arr) =>{
      orgForm.chargePerson = func.joinArrayProperties(arr);
    }
    const submitForm = async (formEl) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                saveOrgInfo(orgForm).then(res=>{
                  if(res.code==0){
                    ElMessage.success('保存成功')
                    drawer.value.isClose()
                    emit('refresh');//刷新父页面
                  }
                })
            }
        })
    }
</script>


<style scoped>

</style>