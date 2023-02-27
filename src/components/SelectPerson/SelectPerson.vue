<template>
    <el-dialog title="选择成员" :v-model="visibleDialog" width="600px" append-to-body class="promoter_person">
        <div class="person_body clear">
            <div class="person_tree l">
                <input type="text" placeholder="搜索成员" style="padding-left:30px;" v-model="searchVal" @input="getDebounceData($event)">
                <p class="ellipsis tree_nav" v-if="!searchVal">
                    <span @click="getDepartmentList(0)" class="ellipsis">全部</span>
                    <span v-for="(item,index) in departments.titleDepartments" class="ellipsis"
                          :key="index+'a'" @click="getDepartmentList(item.id)">{{item.departmentName}}</span>
                </p>
                <selectBox :list="list"/>
            </div>
            <selectResult :total="total" @del="delList" :list="resList"/>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="$emit('update:visible',false)">取 消</el-button>
          <el-button size="mini" type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
    import selectBox from './selectBox.vue';
    import selectResult from './selectResult.vue';
    import mixins from './mixins'
    export default {
        components: { selectBox, selectResult },
        mixins: [mixins],
        props: ['visible', 'data', 'isDepartment'],
        watch: {
            visible(val) {
                debugger;
                this.visibleDialog = this.visible
                if (val) {
                    this.getDepartmentList();
                    this.searchVal = "";
                    this.checkedEmployessList = this.data.filter(item => item.type === 1).map(({ name, targetId }) => ({
                        employeeName: name,
                        id: targetId
                    }));
                    this.checkedDepartmentList = this.data.filter(item => item.type === 3).map(({ name, targetId }) => ({
                        departmentName: name,
                        id: targetId
                    }));
                }
            },
            visibleDialog(val) {
                this.$emit('update:visible', val)
            }
        },
        created() {
            console.log(this.visible)
            debugger;
        },
        computed: {
            total() {
                return this.checkedDepartmentList.length + this.checkedEmployessList.length
            },
            list() {
                return [{
                    isDepartment: this.isDepartment,
                    type: 'department',
                    data: this.departments.childDepartments,
                    isActive: (item) => this.$func.toggleClass(this.checkedDepartmentList, item),
                    change: (item) => this.$func.toChecked(this.checkedDepartmentList, item),
                    next: (item) => this.getDepartmentList(item.id)
                }, {
                    type: 'employee',
                    data: this.departments.employees,
                    isActive: (item) => this.$func.toggleClass(this.checkedEmployessList, item),
                    change: (item) => this.$func.toChecked(this.checkedEmployessList, item),
                }]
            },
            resList() {
                let data = [{
                    type: 'employee',
                    data: this.checkedEmployessList,
                    cancel: (item) => this.$func.removeEle(this.checkedEmployessList, item)
                }]
                if (this.isDepartment) {
                    data.unshift({
                        type: 'department',
                        data: this.checkedDepartmentList,
                        cancel: (item) => this.$func.removeEle(this.checkedDepartmentList, item)
                    })
                }
                return data
            }
        },
        data() {
            return {
                checkedDepartmentList: [],
                checkedEmployessList: [],
            }
        },
        methods: {
            saveDialog() {
                let checkedList = [...this.checkedDepartmentList, ...this.checkedEmployessList].map(item => ({
                    type: item.employeeName ? 1 : 3,
                    targetId: item.id,
                    name: item.employeeName || item.departmentName
                }))
                this.$emit('change', checkedList)
            },
            delList() {
                this.checkedDepartmentList = [];
                this.checkedEmployessList = []
            }
        }
    }
</script>

<style scoped>
    .person_body {
        border: 1px solid #f5f5f5;
        height: 400px;
    }
    .tree_nav span {
        display: inline-block;
        padding-right: 10px;
        margin-right: 5px;
        max-width: 6em;
        color: #38adff;
        font-size: 12px;
        cursor: pointer;
        background: url(~@/assets/images/jiaojiao.png) no-repeat right center;
    }
    .tree_nav span:last-of-type {
        background: none;
    }
    .person_tree {
        padding: 10px 12px 0 8px;
        width: 280px;
        height: 100%;
        border-right: 1px solid #f5f5f5;
        float: left;
    }
    .person_tree input {
        padding-left: 22px;
        width: 210px;
        height: 30px;
        font-size: 12px;
        border-radius: 2px;
        border: 1px solid #d5dadf;
        background: url(~@/assets/images/list_search.png) no-repeat 10px center;
        background-size: 14px 14px;
        margin-bottom: 14px;
    }

    .person_tree img {
        width: 14px;
        vertical-align: middle;
        margin-right: 5px;
    }
</style>
