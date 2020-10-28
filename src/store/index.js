import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const SYNC_UPDATE = 'SYNC_UPDATE'
export default new Vuex.Store({
    state: {
      cars: ''
    },
    actions: {
      // 初始化
      initCars ({commit}) {
        let cars = getCars();
        commit(SYNC_UPDATE, cars)
    },
    // 添加
      addGoodInCar ({commit}, goodinfo) {
        let cars = getCars()
        if (cars.length == 0) {
          cars.push(goodinfo)
        }
        sessionStorage.cars = JSON.stringify(cars)
        commit (SYNC_UPDATE, cars)
      },
      // 移除
      removeInCar ({commit}) {
        let cars = getCars()
        sessionStorage.removeItem('cars')
        cars = ''
        commit (SYNC_UPDATE, cars)
      }
    },
    mutations: {
      [ SYNC_UPDATE ] (state, newcar) {
        state.cars = newcar
      }
    },
    getters: {
      
    }
})
function getCars () {
  //如果不存在就添加一个空的cars数组
return JSON.parse(sessionStorage.cars?sessionStorage.cars:'[]')
}