// 用户调查字段配置
export const CONFIG_USER_SURVERY = {
    b: {
        order: 2,
        type: 'cascader',
        label: '受伤部位',
        area: 'quanguo',
    },
    c: {
        order: 3,
        type: 'checkbox',
        label: '赔付金额',
        option: [
            { label: '无损', value: '01' },
            { label: '正前方', value: '02' },
            { label: '前方左侧', value: '03' },
            { label: '前方右侧', value: '04' },
            { label: '车身左侧', value: '05' },
            { label: '车身右侧', value: '06' },
        ],
        colSpan: 2,
    },
    d: {
        order: 4,
        type: 'date',
        label: '报案日期',
    },
    e: {
        order: 5,
        type: 'date-range',
        label: '运输起止日期',
        placeholder: '运输日期',
        // colSpan: 2,
    },
    a: {
        order: 1,
        type: 'input',
        label: '用户姓名',
        extra: '最多输入500个字',
        rules: { required: true },
    },
    aa: {
        order: 7,
        type: 'input-button',
        label: '地址',
        option: [
            { label: '同标的', value: '01' },
            { label: '同三者', value: '02' },
        ]
    },
    ab: {
        order: 7,
        type: 'input-radio',
        label: '联系人电话',
        option: [
            { label: '同标的', value: '01' },
            { label: '同三者', value: '02' },
        ]
    },
    f: {
        order: 6,
        type: 'number',
        label: '保单金额',
    },
    g: {
        order: 7,
        type: 'radio',
        label: '被保人性别',
        option: [
            { label: '男', value: '01' },
            { label: '女', value: '02' },
        ]
    },
    gg: {
        order: 7,
        type: 'radio-button',
        label: '类别',
        option: [
            { label: '车险', value: '01' },
            { label: '非车险', value: '02' },
        ]
    },
    h: {
        order: 8,
        type: 'enum',
        label: '号牌种类',
        option: [
            { value: '01', label: '大型汽车号牌' },
            { value: '02', label: '小型汽车号牌' },
            { value: '03', label: '使馆汽车号牌' },
            { value: '04', label: '领馆汽车号牌' },
            { value: '05', label: '境外汽车号牌' },
            { value: '06', label: '外籍汽车号牌' },
            { value: '07', label: '两、三轮摩托车号牌' },
            { value: '08', label: '轻便摩托车号牌' },
            { value: '09', label: '使馆摩托车号牌' },
        ]
    },
    hh: {
        order: 8,
        type: 'enum-input',
        label: '号牌种类',
        option: [
            { value: '01', label: '+86' },
            { value: '02', label: '+87', selected: true },
            { value: '03', label: '+88' },
        ],
        selectWidth: 60,
    },
    i: {
        order: 9,
        type: 'textarea',
        label: '出险描述',
        colSpan: 2,
        rules: { required: true }
    },
    ii: {
        order: 9,
        type: 'textarea-button',
        label: '出险描述',
        colSpan: 3,
        option: [
            { value: '01', label: '生成描述', type: 'primary' },
        ],
        childSpan: 18,
    }
};
