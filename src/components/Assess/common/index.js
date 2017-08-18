export const CONFIG_TABLE_DATA = [
  {
    "key": 1,
    "code": "A16",
    "prem_total": "",
    "name": "不计免赔率-三责-家庭自用",
    "amt": "0.00",
    "real_prem": "5.76",
    "serial_no": 1,
    "prem": "7.97"
  },
  {
    "key": 2,
    "code": "A21",
    "prem_total": "",
    "name": "不计免赔率-车损险-家庭自用",
    "amt": "0.00",
    "real_prem": "506.74",
    "serial_no": 2,
    "prem": "701.37"
  },
  {
    "key": 3,
    "code": "A26",
    "prem_total": "",
    "name": "不计免赔率-车上人员责任-驾驶-家庭自用",
    "amt": "0.00",
    "real_prem": "0.00",
    "serial_no": 3,
    "prem": "0.00"
  },
  {
    "key": 4,
    "code": "A31",
    "prem_total": "",
    "name": "不计免赔率-车上人员责任-乘客-家庭自用",
    "amt": "0.00",
    "real_prem": "0.00",
    "serial_no": 4,
    "prem": "0.00"
  },
  {
    "key": 5,
    "code": "ABA",
    "prem_total": "",
    "name": "三责险-家庭自用",
    "amt": "0.00",
    "real_prem": "38.41",
    "serial_no": 5,
    "prem": "53.16"
  },
  {
    "key": 6,
    "code": "ABF",
    "prem_total": "",
    "name": "车损险-家庭自用",
    "amt": "53920.00",
    "real_prem": "3378.27",
    "serial_no": 6,
    "prem": "4675.81"
  },
  {
    "key": 7,
    "code": "ABQ",
    "prem_total": "",
    "name": "车上人员责任险-驾驶-家庭自用",
    "amt": "0.00",
    "real_prem": "0.00",
    "serial_no": 7,
    "prem": "0.00"
  },
  {
    "key": 8,
    "code": "ABR",
    "prem_total": "",
    "name": "车上人员责任险-乘客-家庭自用",
    "amt": "0.00",
    "real_prem": "0.00",
    "serial_no": 8,
    "prem": "0.00"
  }
]

export const CONFIT_TABLE_HEAD = [{
    title: '序号',
    dataIndex: 'serial_no',
    key: 'serial_no',
}, {
    title: '险种代码',
    dataIndex: 'code',
    key: 'code',
}, {
    title: '险种名称',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '保额',
    dataIndex: 'amt',
    key: 'amt',
    total: true,
}, {
    title: '保费',
    dataIndex: 'prem',
    key: 'prem',
    total: true,
}, {
    title: '优惠后保费',
    dataIndex: 'real_prem',
    key: 'real_prem',
},
// {
//     title: '保费合计',
//     dataIndex: 'prem_total',
//     key: 'prem_total',
// }
];