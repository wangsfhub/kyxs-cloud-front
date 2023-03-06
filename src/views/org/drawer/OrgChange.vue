<template>
    <RightDrawer ref="drawer" title="新增" @submit="submitForm(orgFormRef)" @close="restForm(orgFormRef)">
        <template #default>
            <el-form
                    ref="orgFormRef"
                    :model="orgForm"
                    :rules="rules"
                    label-width="100px"
                    :scroll-to-error="true"
            >
                <el-form-item label="变更部门" prop="deptId">
                   <select-org v-model="orgForm.deptId" style="width:250px" placeholder="请选择变更部门" @change="change"/>
                </el-form-item>
                <el-form-item label="原上级部门" prop="superId">
                    <select-org v-model="orgForm.superId" disabled="true" style="width:250px" placeholder="请选择原上级部门"></select-org>
                </el-form-item>
                <el-form-item label="新上级部门" prop="newSuperId">
                  <select-org v-model="orgForm.newSuperId" style="width:250px" placeholder="请选择新上级部门"></select-org>
                </el-form-item>
                <el-form-item label="变更日期" prop="changeDate">
                  <el-date-picker
                      v-model="orgForm.changeDate"
                      type="date"
                      placeholder="请选择变更日期"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                      style="width:250px"
                  />
                </el-form-item>
                <el-form-item label="变更原因" prop="changeDesc">
                  <el-input v-model="orgForm.changeDesc" type="textarea" style="width:250px" placeholder="请输入变更原因"/>
                </el-form-item>
            </el-form>
        </template>
    </RightDrawer>
</template>

<script setup>
    import { ElMessage } from 'element-plus'
    import {getCurrentInstance, reactive, ref} from 'vue'
    import { checkDesc } from '@/utils/validate'
    import { saveChangeInfo,getOrgDetail } from "@/api/org/dept";
    const context = getCurrentInstance()?.appContext.config.globalProperties;
    const func = context?.$func;

    const orgFormRef = ref(null)
    const drawer = ref(null)
    const init = ()=>{
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
        deptId:'',
        superId:'',
        newSuperId: '',
        changeDate: '',
        changeDesc: ''
    })
    const rules = reactive({
        deptId: [{required: true, message: '请选择变更部门', trigger: 'blur' }],
        superId: [{required: true, message: '请选择原上级部门', trigger: 'change'}],
        newSuperId: [{required: true, message: '请选择原上级部门', trigger: 'change'}],
        changeDate: [{required: true, message: '请选择变更日期', trigger: 'change'}],
        changeDesc: [
          {required: true, message: '请选择变更日期', trigger: 'change'},
          { validator: checkDesc, trigger: 'blur' }
        ],
    })
    const change = (orgId) => {
      getOrgDetail(orgId).then(res=>{
        if(res.code==0){
          orgForm.superId = res.data.superId
        }
      })
    }
    const submitForm = async (formEl) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
              saveChangeInfo(orgForm).then(res=>{
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