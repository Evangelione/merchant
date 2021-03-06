export const WithdrawStatus = {
  0: {
    label: '审核中',
    color: '#ffb000',
  },
  1: {
    label: '已通过',
    color: '#669900',
  },
  2: {
    label: '被驳回',
    color: '#dd4a68',
  },
}

export const IncomeStatus = {
  1: {
    label: '收入',
    color: '#669900',
    str: '+',
  },
  2: {
    label: '支出',
    color: '#dd4a68',
    str: '-',
  },
}

export const StoreStatus = {
  1: {
    label: '正常',
    color: '#690',
  },
  2: {
    label: '审核',
    color: '#ffb000',
  },
  4: {
    label: '禁用',
    color: '#dd4a68',
  },
}

export const TemplateArea = {
  0: ['同城', 0],
  1: ['北京', 0],
  21: ['上海', 0],
  42: ['天津', 0],
  62: ['重庆', 0],
  104: ['安徽', 0],
  227: ['福建', 0],
  322: ['甘肃', 0],
  423: ['广东', 0],
  566: ['广西', 0],
  690: ['贵州', 0],
  788: ['海南', 0],
  814: ['河北', 0],
  998: ['河南', 0],
  1176: ['黑龙江', 0],
  1320: ['湖北', 0],
  1436: ['湖南', 0],
  1573: ['吉林', 0],
  1643: ['江苏', 0],
  1763: ['江西', 0],
  1874: ['辽宁', 0],
  1989: ['内蒙古', 0],
  2103: ['宁夏', 0],
  2130: ['青海', 0],
  2182: ['山东', 0],
  2340: ['山西', 0],
  2471: ['陕西', 0],
  2589: ['四川', 0],
  2792: ['西藏', 0],
  2873: ['新疆', 0],
  2987: ['云南', 0],
  3133: ['浙江', 0],
  3235: ['香港', 0],
  3239: ['澳门', 0],
  3242: ['台湾', 0],
}

export const DeliverType = {
  0: '系统配送',
  1: '商家配送',
  2: '用户自提',
  3: '快递配送',
}

export const CardType = {
  1: '身份证',
  2: '军人军官证',
  3: '港澳台居民通行证',
  4: '中国护照',
  5: '单位统一代码',
  6: '未登记证件',
  7: '暂住证',
  8: '武警警官证',
  9: '临时身份证',
  10: '联名户',
  11: '户口簿',
  12: '中国居民其他证',
  13: '军人士兵证',
  14: '军人文职干部证',
  15: '军人其他证件',
  16: '武警士兵证',
  17: '武警文职干部证',
  18: '武警其他证件',
  19: '外国护照',
  20: '外国公民其他证件',
  21: '重复有效证件',
  22: '解放军士兵证',
  23: '解放军文职干部证',
  24: '解放军其它个人证件',
  25: '武警士兵证',
  26: '武警文职干部证',
  27: '武警其它个人证件',
  51: '法人代码证',
  52: '组织机构代码证',
  53: '政府机构/公共机构批文',
  54: '外交部/外事办批文（使）',
  55: '外交部外事办批文（领）',
  56: '外交部外事办批文（办） ',
  60: '香港商业登记证',
  65: '事业单位登记证',
  66: '社会团体登记证',
  67: '商业登记证（离岸）',
  68: '营业执照',
  69: '对公临时证件',
  70: '其他证明文件(公司)',
  71: '公司户重复有效证件',
  80: '金融机构',
}

export const BankList = [
  '中国银行',
  '工商银行',
  '建设银行',
  '交通银行',
  '农业银行',
  '招商银行',
  '邮储银行',
  '光大银行',
  '民生银行',
  '兴业银行',
  '浦发银行',
  '平安银行',
  '其他银行',
]

export const BankIcon = [
  {
    name: '中国银行',
    url: require('@/assets/image/中国银行.png'),
  },
  {
    name: '中国工商银行',
    url: require('@/assets/image/中国工商银行.png'),
  },
  {
    name: '中国建设银行',
    url: require('@/assets/image/建设银行.png'),
  },
  {
    name: '交通银行',
    url: require('@/assets/image/交通银行.png'),
  },
  {
    name: '中国农业银行',
    url: require('@/assets/image/农业银行.png'),
  },
  {
    name: '招商银行',
    url: require('@/assets/image/招商银行.png'),
  },
  {
    name: '邮储银行',
    url: require('@/assets/image/中国邮政.png'),
  },
  {
    name: '中国光大银行',
    url: require('@/assets/image/中国光大银行.png'),
  },
  {
    name: '中国民生银行',
    url: require('@/assets/image/中国民生银行.png'),
  },
  {
    name: '兴业银行',
    url: require('@/assets/image/兴业银行.png'),
  },
  {
    name: '上海浦东发展银行',
    url: require('@/assets/image/浦发银行.png'),
  },
  {
    name: '平安银行',
    url: require('@/assets/image/平安银行.png'),
  },
  {
    name: '其他',
    url: require('@/assets/image/其他银行.png'),
  },
]
