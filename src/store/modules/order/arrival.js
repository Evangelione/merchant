import orderAPI from '@/api/order/index'

export default {
  // 获取到店消费订单列表
  async getArrivalList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getArrivalList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取到店消费订单详情
  async getArrivalOrderDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getArrivalOrderDetail(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取到店消费店铺列表
  async getArrivalOrderStoreList(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getArrivalOrderStoreList(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
}
