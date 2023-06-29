export const ORIGIN_OPTS = [
    {
        label: "张三",
        origin: "http://aaa.com:3000",
    },
    {
        label: "李四",
        origin: "http://bb.com:3000",
    },
];

export const PATH_OPTS = [
    {
        name: '首页',
        path: '/home/page',
    },
    {
        name: '菜单',
        path: '/menu',
    }
];

export const QUERY_OPTS = [
    // 首页
    [
        {
            key: 'id',
            is_required: false,
            is_disabled: false,
            demo: '',
            val: ''
        },
        {
            key: 'name',
            is_required: false,
            is_disabled: false,
            demo: '',
            val: ''
        },
    ],
    // 菜单
    [
        {
            key: 'id',
            is_required: false,
            is_disabled: false,
            demo: '',
            val: ''
        }
    ]
];
