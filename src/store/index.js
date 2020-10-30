import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const SYNC_UPDATE = 'SYNC_UPDATE'
export default new Vuex.Store({
    state: {
      users: '',
    },
    actions: {
      init({commit}) {
        let users = ses()
        commit(SYNC_UPDATE, users)
      },
      // 添加
      // addGoodInCar ({commit}, data) {
      //   let users = []
      //   users.push(data)
      //   commit (SYNC_UPDATE, users)
      // },
    },
    mutations: {
      [ SYNC_UPDATE ] (state, newusers) {
        let data = ses()
        data = newusers
        sessionStorage.setItem('users', JSON.stringify(data))
        state.users = newusers
      }
    },
    getters: {
      // 计算属性
      //调用actions触发,购物车计算
    }
})
// 刷新init
function ses () {
  return JSON.parse(sessionStorage.users?sessionStorage.users:'[]')
}