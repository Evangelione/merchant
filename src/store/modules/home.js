import homeAPI from '@/api/home'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  async getHomeInfo() {
    return new Promise(async (resolve, reject) => {
      const data = await homeAPI.getHomeInfo()
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
