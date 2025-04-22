import yclient from '@/utils/yclientConnect'

export default {
  state: {
    times: [],
    currentTime: null,
  },
  mutations: {
    timesSet(state, times) {
      state.times = times
    },
    currentTimeSet(state, time) {
      state.currentTime = time
    },
  },
  actions: {
    async timesFetchList({ commit, rootGetters }, date) {
      commit('switchPreloader', 'stageThree')
      commit('currentDaySet', date)

      // цеаляем из глобального стора выбранные услугу и врача
      const currentService = rootGetters.currentService
      const currentStaff = rootGetters.currentStaff

      const times = await yclient.getTimes(currentService, currentStaff, date)

      commit('timesSet', times)
      commit('switchPreloader', 'stageThree')
    },

    async chooseTime({ commit }, time) {
      commit('currentTimeSet', time)
    },
  },
  getters: {
    times: (s) => s.times,

    currentTime: (s) => s.currentTime,
  },
}
