<template>
    <RightDrawer ref="drawer" title="新增" @submit="submitForm(postFormRef)" @close="restForm(postFormRef)">
        <template #default>
            <el-form
                    ref="postFormRef"
                    :model="postForm"
                    :rules="rules"
                    label-width="80px"
            >
                <el-form-item label="岗位名称" prop="postName">
                    <el-input v-model="postForm.postName" style="width:250px" placeholder="请输入岗位名称"/>
                </el-form-item>
                <el-form-item label="所属部门" prop="department">
                    <select-org v-model="postForm.department" style="width:250px" placeholder="请选择所属部门"></select-org>
                </el-form-item>
                <el-form-item label="岗位类别" prop="postType">
                    <select-code v-model="postForm.postType" set-id="6" style="width:250px" placeholder="请选择岗位类别"></select-code>
                </el-form-item>
                <el-form-item label="岗位状态" prop="postStatus">
                  <select-code v-model="postForm.postStatus" set-id="1" style="width:250px" placeholder="请选择岗位状态"></select-code>
                </el-form-item>
                <el-form-item label="编制人数">
                    <el-input v-model="postForm.headCount" style="width:250px" placeholder="请输入编制人数"/>
                </el-form-item>
                <el-form-item label="岗位工资" prop="postSalary">
                    <el-input v-model="postForm.postSalary" style="width:250px" placeholder="请输入岗位工资"/>
                </el-form-item>
                <el-form-item label="岗位描述" prop="postDesc">
                    <el-input v-model="postForm.postDesc" type="textarea" style="width:250px" placeholder="请输入岗位描述"/>
                </el-form-item>
            </el-form>
        </template>
    </RightDrawer>
</template>

<script setup>
    import { ElMessage } from 'element-plus'
    import {getCurrentInstance, reactive, ref,nextTick} from 'vue'
    import {savePostInfo} from "@/api/org/position";
    import { checkDesc,checkDecimal } from '@/utils/validate'
    const context = getCurrentInstance()?.appContext.config.globalProperties;
    const func = context?.$func;
    const postFormRef = ref(null)
    const drawer = ref(null)
    const init = (form)=>{
      if(form){
        //给整个对象赋值
        func.copyProperties(postForm,form)
      }
      drawer.value.isOpen()
    }
    const emit = defineEmits(['refresh'])
    defineExpose({
        init
    })
    const postForm = reactive({
        id: '',
        department:'',
        postName: '',
        postType: '',
        postStatus:'',
        postSalary: '',
        headCount: '',
        postDesc:''
    })
    const rules = reactive({
        postName: [{required: true, message: '请输入岗位名称', trigger: 'blur' }],
        department: [{required: true, message: '请选择所属部门', trigger: 'change'}],
        postType: [{required: true, message: '请选择类别', trigger: 'change'}],
        postStatus: [{required: true, message: '请选择岗位状态', trigger: 'change'}],
        postSalary: [{ validator: checkDecimal, trigger: 'blur' }],
        postDesc: [{ validator: checkDesc, trigger: 'blur' }]
    })

    const submitForm = async (formEl) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
              savePostInfo(postForm).then(res=>{
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
      Object.keys(postForm).forEach(function (key) {
        postForm[key] = ''
      })
    };
</script>


<style scoped>

</style>