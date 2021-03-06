import axios from 'axios'

export default {
  // 读取服务商品列表
  getServiceList: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=selProList', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建服务商品
  createService: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=editAndAddPro', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询服务商品
  readServiceDetail: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=selPro', {
      app_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 删除服务商品
  deleteService: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=delPro', {
      app_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改服务商品优惠
  updateServicePreferential: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=service_discount', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取服务商品分类列表
  getServiceCategoryList: () =>
    axios.post('/appapi.php?c=SpaceMerchant&a=selCateList', {
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建服务商品分类
  createServiceCategory: ({ cat_name, cat_fid, id }) => {
    let method = 'addEditAppCate'
    if (cat_fid !== '0') {
      method = 'addTwoCate'
      if (id) {
        method = 'editTwoCate'
        return axios.post(`/appapi.php?c=SpaceMerchant&a=${method}`, {
          cat_id: id,
          cat_name,
          ticket: localStorage.getItem('ticket'),
        })
      }
      return axios.post(`/appapi.php?c=SpaceMerchant&a=${method}`, {
        cat_fid,
        cat_name,
        ticket: localStorage.getItem('ticket'),
      })
    }
    return axios.post(`/appapi.php?c=SpaceMerchant&a=${method}`, {
      id,
      cat_fid,
      cat_name,
      ticket: localStorage.getItem('ticket'),
    })
  },
  // 删除服务商品分类
  deleteServiceCategory: ({ cat_id, type }) => {
    let method = 'delAppCate'
    if (type !== 1) {
      method = 'delTwoCate'
    }
    return axios.post(`/appapi.php?c=SpaceMerchant&a=${method}`, {
      cat_id,
      ticket: localStorage.getItem('ticket'),
    })
  },
  // 读取服务项目销售记录
  readServiceSalesRecord: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=service_order', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
