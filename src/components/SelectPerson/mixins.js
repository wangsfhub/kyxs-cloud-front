import { getRoles, getDepartments, getEmployees } from '@/api/plugin.js'
import { ref,getCurrentInstance } from 'vue'
export default function () {
  //引用全局变量
  const context = getCurrentInstance()?.appContext.config.globalProperties;
  const func = context?.$func;
  let departments = ref({})
  let roles = ref([])
  const getRoleList =  async () => {
    let { data } = await getRoles({});
    roles.value = data;
    return roles.value;
  }
  const getDepartmentList = async (parentId = 0)=>{
    let { data } = await getDepartments({ parentId })
    departments.value = data;
    return departments.value;
  }
  const getDebounceData = (event, type = 1)=>{
    func.debounce(async function () {
      if (event.target.value) {
        let data = {
          searchName: event.target.value,
          page: 1,
          size: 30
        }
        if (type == 1) {
          departments.value.childDepartments = [];
          let res = await getEmployees(data)
          departments.value.employees = res.data
        } else {
          let res = await getRoles(data)
          roles.value = res.data
        }
      } else {
        type == 1 ? await getDepartmentList() : await getRoleList();
      }
    }.bind(this))()
  }
  return{
    getRoleList,
    getDepartmentList,
    getDebounceData,
  }
}
