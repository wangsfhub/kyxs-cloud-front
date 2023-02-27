export default [
    {
        url: '/api/org/tree',
        type: 'get',
        response() {
            return {
                code: 0,
                msg: 'success',
                data: [
                    {
                        value: '1',
                        label: '阿里巴巴',
                        children: [
                            {
                                value: '1-1',
                                label: '信息采集部',
                                children: [
                                    {
                                        value: '1-1-1',
                                        label: '销售部',
                                    },
                                ],
                            },
                        ],
                    }
                ],
            };
        },
    },
    {
        url: '/api/org/list',
        type: 'get',
        response() {
            return {
                code: 0,
                msg: 'success',
                data: [{
                    id: '1',
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    switchs: true,
                    img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
                    objmsg: {
                        msg: '啊啊啊啊啊啊啊啊'
                    }
                }, {
                    id: '2',
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    switchs: true,
                    img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
                    objmsg: {
                        msg: '啊啊啊啊啊啊啊啊'
                    }
                }, {
                    id: '3',
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    switchs: true,
                    img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
                    objmsg: {
                        msg: '啊啊啊啊啊啊啊啊'
                    }
                }, {
                    id: '4',
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    switchs: true,
                    img: 'file/964355654_58490652-91c5-412e-a74b-0c3d86ff1525.png',
                    objmsg: {
                        msg: '啊啊啊啊啊啊啊啊'
                    }
                }]
            };
        },
    },
]