import axios from 'axios'

export default {
  // 团购订单列表
  getGroupBuyList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=group_order', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 读取团购订单详情
  readGroupBuyOrderDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=group_order_detail', {
      params: {
        order_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 将团购订单归属于店铺
  ascriptionGroupBuyOrder: ({ order_id, store_id }) =>
    axios.get('/appapi.php?c=Merchantapp&a=order_store_id', {
      params: {
        order_id,
        store_id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 修改团购订单快递单号信息
  changeGroupBuyOrderExpress: ({ express_type, express_id, order_id, store_id }) =>
    axios.post('/appapi.php?c=Merchantapp&a=group_express', {
      express_type,
      express_id,
      order_id,
      store_id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询团购订单核销码列表
  readGroupBuyOrderWriteOff: order_id =>
    axios.post('/appapi.php?c=Merchantapp&a=group_pass_array', {
      order_id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 团购单个核销
  verifySingleGroupBuyCode: ({ order_id, group_pass }) =>
    axios.post('/appapi.php?c=Merchantapp&a=group_verify', {
      order_id,
      group_pass,
      ticket: localStorage.getItem('ticket'),
    }),
  // 团购多个核销
  verifyArrayGroupBuyCode: ({ order_id, group_pass }) =>
    axios.post('/appapi.php?c=Merchantapp&a=group_array_verify', {
      order_id,
      group_pass,
      ticket: localStorage.getItem('ticket'),
    }),
  // 团购全部核销
  verifyAllGroupBuyCode: ({ order_id, store_id }) =>
    axios.post('/appapi.php?c=Merchantapp&a=group_verify', {
      order_id,
      store_id,
      ticket: localStorage.getItem('ticket'),
    }),
}
