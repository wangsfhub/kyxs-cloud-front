export default [
    {
        url: '/api/plugin/roles',
        type: 'get',
        response() {
            return {
                code: 0,
                msg: 'success',
                data:[{
                        "code": "SHGLY",
                        "id": "1",
                        "scope": "1",
                        "roleName": "审核管理员",
                        "description": "初始化内置审批角色",
                        "status": "1"
                    }, {
                        "code": "",
                        "id": "2",
                        "scope": "1",
                        "roleName": "招商事业部",
                        "description": "",
                        "status": "1"
                    }, {
                        "code": "",
                        "id": "3",
                        "scope": "1",
                        "roleName": "互联网部门",
                        "description": "",
                        "status": "1"
                    }, {
                        "code": "",
                        "id": "4",
                        "scope": "1",
                        "roleName": "销售部",
                        "description": "",
                        "status": "1"
                    }, {
                        "code": "",
                        "id": "5",
                        "scope": "1",
                        "roleName": "战区一",
                        "description": "",
                        "status": "1"
                    }, {
                        "code": "",
                        "id": "6",
                        "scope": "1",
                        "roleName": "战区二",
                        "description": "",
                        "status": "1"
                    }, {
                        "code": "",
                        "id": "7",
                        "scope": "1",
                        "roleName": "JAVA开发",
                        "description": "",
                        "status": "1"
                    }, {
                        "code": "",
                        "id": "8",
                        "scope": "1",
                        "roleName": "测试审批角色",
                        "description": "",
                        "status": "1"
                    }]
            }
        }
    },
    {
        url: '/api/plugin/departments',
        type: 'get',
        response() {
            return {
                code: 0,
                msg: 'success',
                data: {
                    "childDepartments": [{
                        "departmentKey": "RLXZB_V2",
                        "departmentName": "人力行政部",
                        "id": "150",
                        "parentId": "0",
                        "departmentNames": "人力行政部"
                    }, {
                        "departmentKey": "ZNBN",
                        "departmentName": "法务部",
                        "id": "324",
                        "parentId": "0",
                        "departmentNames": "法务部",
                    }],
                    "employees": [{
                        "id": "53128111",
                        "employeeName": "亚nan",
                        "isLeave": "0",
                        "open": "false"
                    }],
                    "titleDepartments": []
                }
            }
        }
    },
    {
        url: '/api/plugin/employees',
        type: 'get',
        response() {
            return {
                code: 0,
                msg: 'success',
                data: [
                    {
                        "id":"1",
                        "name":"张三"
                    },
                    {
                        "id":"2",
                        "name":"李四"
                    },
                    {
                        "id":"3",
                        "name":"王五"
                    }
                ]
            }
        }
    }
]