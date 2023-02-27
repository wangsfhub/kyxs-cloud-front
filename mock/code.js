export default [
    {
        url: '/api/code/all',
        type: 'get',
        response() {
            return {
                code: 0,
                msg: 'success',
                data: {
                    "1001":[
                        {
                            codeId: '1001001',
                            setId: '1001',
                            codeName: '男'
                        },
                        {
                            codeId: '1001002',
                            setId: '1001',
                            codeName: '女'
                        },
                    ],
                    "9001":[
                        {
                            codeId: '9001001',
                            setId: '1001',
                            codeName: '启用'
                        },
                        {
                            codeId: '9001002',
                            setId: '9001',
                            codeName: '禁用'
                        },
                    ]
                }
            };
        },
    },
]