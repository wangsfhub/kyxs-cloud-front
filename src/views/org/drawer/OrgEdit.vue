<template>
    <RightDrawer ref="drawer" title="新增" @submit="submitForm(orgFormRef)" @close="restForm(orgFormRef)">
        <template #default>
            <el-form
                    ref="orgFormRef"
                    :model="orgForm"
                    :rules="rules"
                    label-width="80px"
            >
                <el-form-item label="部门名称" prop="deptName">
                    <el-input v-model="orgForm.deptName" style="width:250px" placeholder="请输入部门名称"/>
                </el-form-item>
                <el-form-item label="部门编号">
                    <el-input v-model="orgForm.deptNo" style="width:250px" placeholder="请输入部门编号"/>
                </el-form-item>
                <el-form-item v-if="orgForm.superId!=-1" label="上级部门" prop="superId">
                    <select-org v-model="orgForm.superId" style="width:250px" placeholder="请选择上级部门"></select-org>
                </el-form-item>
                <el-form-item label="部门类别" prop="deptType">
                    <select-code v-model="orgForm.deptType" set-id="11" :disabled="orgForm.superId==-1?true:false" style="width:250px" placeholder="请选择组织类别"></select-code>
                </el-form-item>
                <el-form-item label="负责人">
                    <select-button @change="getPersons"></select-button>
                </el-form-item>
                <el-form-item label="编制人数" prop="headCount">
                    <el-input v-model="orgForm.headCount" style="width:250px" placeholder="请输入编制人数"/>
                </el-form-item>
                <el-form-item label="部门描述" prop="deptDesc">
                    <el-input v-model="orgForm.deptDesc" type="textarea" style="width:250px" placeholder="请输入部门描述"/>
                </el-form-item>
            </el-form>
        </template>
    </RightDrawer>
</template>

<script setup>
    import { ElMessage } from 'element-plus'
    import {getCurrentInstance, reactive, ref} from 'vue'
    import { checkInteger,checkDesc } from '@/utils/validate'
    import { saveOrgInfo } from "@/api/org/dept";
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
    const addNext = (superId)=>{
      orgForm.superId = superId
      drawer.value.isOpen()
    }
    const emit = defineEmits(['refresh'])
    defineExpose({
        init,
        addNext
    })
    const orgForm = reactive({
        id: '',
        superId:'',
        deptName: '',
        deptNo: '',
        deptType: '',
        leaver: '',
        headCount: '',
        deptDesc:''
    })
    const rules = reactive({
        deptName: [{required: true, message: '请输入部门名称', trigger: 'blur' }],
        superId: [{required: true, message: '请选择上级部门', trigger: 'change'}],
        deptType: [{required: true, message: '请选择类别', trigger: 'change'}],
        headCount: [{ validator: checkInteger, trigger: 'blur' }],
        deptDesc: [{ validator: checkDesc, trigger: 'blur' }],
    })
    const getPersons = (arr) =>{
      orgForm.leaver = func.joinArrayProperties(arr);
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
    // 重置表单方法
    const restForm = (formEl) => {
      formEl.resetFields();
      Object.keys(orgForm).forEach(function (key) {
        orgForm[key] = ''
      })
    };
</script>


<style scoped>

</style>