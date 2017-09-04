export const CONFIG_TABLE_HEAD = {
  accident_time: {
    order: 1,
    type: 'date',
    name: '出险时间',
    placeholder: '请选择出险时间',
    rules: { required: true },
    disabled: false,
  },
  isNeedReturnGoods: {
    order: 2,
    type: 'enum',
    name: '是否退货',
    rules: { required: true },
    combobox: false,
    option: [
        { value: '0', label: '是' },
        { value: '1', label: '否', selected: true },
    ]
  },
  multiplier: {
    order: 3,
    type: 'number',
    name: '系统倍数',
    total: true,
    placeholder: '请输入系统倍数',
    disabled: false,
    rules: { required: true },
  },
  lossAmount: {
    order: 4,
    type: 'number',
    name: '损失金额',
    total: true,
    placeholder: '请输入损失金额',
    disabled: false,
    rules: { required: true },
  },
  refundReasonText: {
    order: 5,
    type: 'text',
    name: '订单实付金额(元)',
    total: true,
    val: '$.lossAmount*$.multiplier',
    rules: { required: true },
    disabled: false,
  },
  description: {
    order: 14,
    type: 'input',
    name: '用户自述',
    placeholder: '请输入用户自述',
    rules: { required: true },
    disabled: false,
  }
}
