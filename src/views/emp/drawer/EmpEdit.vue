<template>
    <RightDrawer ref="drawer" title="新增" @submit="submitForm(empFormRef)" @close="restForm(empFormRef)">
        <template #default>
            <el-form
                    ref="empFormRef"
                    :model="empForm"
                    :rules="rules"
                    label-width="80px"
            >
                <el-form-item label="员工姓名" prop="empName">
                    <el-input v-model="empForm.empName" style="width:250px" placeholder="请输入员工姓名"/>
                </el-form-item>
                <el-form-item label="员工编号" prop="empNo">
                  <el-input v-model="empForm.empNo" style="width:250px" placeholder="请输入员工编号"/>
                </el-form-item>
                <el-form-item label="证件类型" prop="idType">
                  <select-code v-model="empForm.idType" set-id="101" style="width:250px" placeholder="请选择证件类型"></select-code>
                </el-form-item>
                <el-form-item label="证件号码" prop="idCard">
                  <el-input v-model="empForm.idCard" set-id="1" style="width:250px" placeholder="请输入证件号码"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="empForm.phone" style="width:250px" placeholder="请输入手机号"/>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="empForm.email" style="width:250px" placeholder="请输入邮箱"/>
                </el-form-item>
                <el-form-item label="所属部门" prop="department">
                  <select-org v-model="empForm.department" style="width:250px" placeholder="请选择所属部门"></select-org>
                </el-form-item>
                <el-form-item label="岗位">
                  <select-position v-model="empForm.position" set-id="4" style="width:250px" placeholder="请选择岗位"></select-position>
                </el-form-item>
                <el-form-item label="国籍">
                  <select-code v-model="empForm.nationality" set-id="4" style="width:250px" placeholder="请选择国籍"></select-code>
                </el-form-item>
                <el-form-item label="性别">
                  <select-code v-model="empForm.gender" set-id="3" style="width:250px" placeholder="请选择性别"></select-code>
                </el-form-item>
                <el-form-item label="出生日期">
                  <el-date-picker
                      v-model="empForm.birthday"
                      type="date"
                      placeholder="请选择出生日期"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                      style="width:250px"
                  />
                </el-form-item>
                <el-form-item label="入职时间" prop="entryTime">
                  <el-date-picker
                      v-model="empForm.entryTime"
                      type="date"
                      placeholder="请选择入职时间"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                      style="width:250px"
                  />
                </el-form-item>
                <el-form-item label="员工状态" prop="empStatus">
                  <select-code v-model="empForm.empStatus" set-id="5" style="width:250px" placeholder="请选择人员状态"></select-code>
                </el-form-item>
            </el-form>
        </template>
    </RightDrawer>
</template>

<script setup>
    import { ElMessage } from 'element-plus'
    import { getCurrentInstance, reactive, ref,nextTick } from 'vue'
    import { saveEmpInfo } from "@/api/emp/index";
    import { checkPhone,checkEmail,checkIdCard } from '@/utils/validate';
    import {checkChar} from "../../../utils/validate";
    const context = getCurrentInstance()?.appContext.config.globalProperties;
    const func = context?.$func;
    const empFormRef = ref(null)
    const drawer = ref(null)
    const init = (form)=>{
      if(form){
        //给整个对象赋值
        func.copyProperties(empForm,form)
      }
      drawer.value.isOpen()
    }
    const emit = defineEmits(['refresh'])
    defineExpose({
        init
    })
    const empForm = reactive({
        id: '',
        empName:'',
        empNo: '',
        idType: '',
        idCard:'',
        department: '',
        position: '',
        phone:'',
        email:'',
        nationality:'',
        gender:'',
        birthday:'',
        entryTime:'',
        empStatus:''
    })
    const rules = reactive({
        empName: [{required: true, message: '请输入员工姓名', trigger: 'blur' }],
        empNo: [{ validator: checkChar, trigger: 'blur' }],
        idType: [{required: true, message: '请选择证件类型', trigger: 'blur' }],
        idCard: [
            {required: true, message: '请输入证件号码', trigger: 'blur' },
            {validator: checkIdCard, trigger: 'blur'}
        ],
        phone: [
            {required: true, message: '请输入手机号', trigger: 'blur' },
            {validator: checkPhone, trigger: 'blur'}
        ],
        email: [{ validator: checkEmail, trigger: 'blur' }],
        department: [{required: true, message: '请选择所属部门', trigger: 'change'}],
        entryTime: [{required: true, message: '请选择入职时间', trigger: 'change'}],
        empStatus: [{required: true, message: '请选择员工状态', trigger: 'change'}],
    })

    const submitForm = async (formEl) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
              saveEmpInfo(empForm).then(res=>{
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
      Object.keys(empForm).forEach(function (key) {
        empForm[key] = ''
      })
    };
</script>


<style scoped>

</style>