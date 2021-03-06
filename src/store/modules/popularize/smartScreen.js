import smartScreenAPI from '@/api/popularize/smartScreen'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 获取机器人设备列表
  getSmartScreenList(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getSmartScreenList(id)
      data ? resolve(data) : reject()
    })
  },
  // 获取机器人布局
  getSmartScreenLayout(context, imax) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getSmartScreenLayout(imax)
      data ? resolve(data) : reject()
    })
  },
  // 创建机器人布局轮播图
  createCarousel(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.createCarousel(payload)
      data ? resolve() : reject()
    })
  },
  // 修改机器人布局轮播图
  updateCarousel(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.updateCarousel(payload)
      data ? resolve() : reject()
    })
  },
  // 删除机器人布局轮播图
  deleteCarousel(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.deleteCarousel(payload)
      data ? resolve() : reject()
    })
  },
  // 机器人布局菜单选择
  selectSmartScreenMenu(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.selectSmartScreenMenu(payload)
      data ? resolve() : reject()
    })
  },
  // 获取抽奖活动列表
  getLotteryList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getLotteryList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 机器人抽奖活动选择
  updateMenuLotteryUrl(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.updateMenuLotteryUrl(payload)
      data ? resolve() : reject()
    })
  },
  // 获取机器人机器人管理
  getSmartScreenDialogueRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getSmartScreenDialogueRecord(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取见面语列表
  getMeetGreetingList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getMeetGreetingList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 创建顾客见面语
  createMeetGreeting(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.createMeetGreeting(payload)
      data ? resolve() : reject()
    })
  },
  // 读取顾客见面语详情
  getMeetGreetingDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getMeetGreetingDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改顾客见面语
  updateMeetGreeting(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.updateMeetGreeting(payload)
      data ? resolve() : reject()
    })
  },
  // 删除见面语
  deleteMeetGreeting(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.deleteMeetGreeting(id)
      data ? resolve() : reject()
    })
  },
  // 读取屏幕下店员列表
  getStaffList(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getStaffList(id)
      data ? resolve(data) : reject()
    })
  },
  // 推广海报列表
  getSmartScreenPosterList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getSmartScreenPosterList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 切换海报发布状态
  changePosterRelease(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.changePosterRelease(payload)
      data ? resolve() : reject()
    })
  },
  // 同城发布
  aroundPush(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.aroundPush(payload)
      data ? resolve() : reject()
    })
  },
  // 取消同城发布
  cancelAroundPush(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.cancelAroundPush(payload)
      data ? resolve() : reject()
    })
  },
  // 切换海报启用禁用状态
  deletePoster(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.deletePoster(id)
      data ? resolve() : reject()
    })
  },
  // 创建海报
  createPoster(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.createPoster(payload)
      data ? resolve() : reject()
    })
  },
  // 修改海报
  updatePoster(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.updatePoster(payload)
      data ? resolve() : reject()
    })
  },
  // 获取海报详情
  getPosterDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getPosterDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 获取海报可推广角色
  getSmartScreenRoleList() {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getSmartScreenRoleList()
      data ? resolve(data) : reject()
    })
  },
  // 获取海报可推广会员
  getSmartScreenMemberList() {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getSmartScreenMemberList()
      data ? resolve(data) : reject()
    })
  },
  // 获取海报可推广店员
  getSmartScreenStaffList() {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getSmartScreenStaffList()
      data ? resolve(data) : reject()
    })
  },
  // 获取海报可绑定需求列表
  getSmartScreenDemandList(context, ids) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getSmartScreenDemandList(ids)
      data ? resolve(data) : reject()
    })
  },
  // 绑定海报到屏幕
  localPush(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.localPush(payload)
      data ? resolve() : reject()
    })
  },
  // 取消本店发布
  cancelLocalPush(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.cancelLocalPush(id)
      data ? resolve() : reject()
    })
  },
  // 获取海报下绑定的屏幕
  getSmartScreenInPoster(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getSmartScreenInPoster(id)
      data ? resolve(data) : reject()
    })
  },
  // 获取机器人销售列表
  getSmartScreenSalesRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getSmartScreenSalesRecord(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取商家店铺下上架且未推广的零售商品
  getNotPopularizedECommerceList() {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getNotPopularizedECommerceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取商家店铺下上架且未推广的团购商品
  getNotPopularizedGroupList() {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getNotPopularizedGroupList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取商家店铺下上架且未推广的服务商品
  getNotPopularizedServiceList() {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getNotPopularizedServiceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取商家店铺下上架且未推广的套餐商品
  getNotPopularizedPackageList() {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getNotPopularizedPackageList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取推广海报的分类和标签
  getSmartScreenPosterTagAndCateList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getSmartScreenPosterTagAndCateList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取同城商家列表
  getSameCityMerchant(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getSameCityMerchant(payload)
      data ? resolve(data) : reject()
    })
  },
  // 保存同城商家咨询
  saveSameCityAdvisory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.saveSameCityAdvisory(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取绑定了屏幕的店铺列表(可传推广商品id)
  getStoreAndScreen(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getStoreAndScreen(payload)
      data ? resolve(data) : reject()
    })
  },
  // 筛选屏幕统计数据
  getPromotionStatistics(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getPromotionStatistics(payload)
      data ? resolve(data) : reject()
    })
  },
}

// mutations
const mutations = {
  save(state, data) {
    const keys = Object.keys(data)
    keys.forEach(item => {
      state[item] = data[item]
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
