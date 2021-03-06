import platformAPI from '@/api/platform'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 可加入子平台列表
  async getSubPlatformList() {
    return new Promise(async (resolve, reject) => {
      const data = await platformAPI.getSubPlatformList()
      data ? resolve(data) : reject()
    })
  },
  // 加入子平台
  async joinTheSubPlatform(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await platformAPI.joinTheSubPlatform(page)
      data ? resolve() : reject()
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
