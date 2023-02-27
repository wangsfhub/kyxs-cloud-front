export default [
    {
        url: '/api/plugin/roles',
        type: 'get',
        response() {
            return {
                code: 0,
                msg: 'success',
                data: [
                    {
                        "id":"1",
                        "name":"管理员"
                    },
                    {
                        "id":"2",
                        "name":"HR"
                    },
                    {
                        "id":"3",
                        "name":"普通雇员"
                    }
                ]
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
                data: [
                    {
                        "id":"1",
                        "name":"管理部"
                    },
                    {
                        "id":"2",
                        "name":"销售部"
                    },
                    {
                        "id":"3",
                        "name":"财务部"
                    }
                ]
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