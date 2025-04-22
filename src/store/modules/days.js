import yclient from '@/utils/yclientConnect'

export default {
  state: {
    days: [],
    currentDay: null,
  },
  mutations: {
    daysSet(state, days) {
      state.days = days
    },
    currentDaySet(state, date) {
      state.currentDay = date
    },
  },
  actions: {
    async daysFetchList({ commit, rootGetters }) {
      commit('switchPreloader', 'stageThree')
      // цеаляем из глобального стора выбранную услугу
      const currentService = rootGetters.currentService
      const currentStaff = rootGetters.currentStaff

      const days = await yclient.getDays(currentService, currentStaff)

      commit('daysSet', days)
      commit('currentDaySet', null)
      commit('currentTimeSet', null)
      commit('switchPreloader', 'stageThree')
    },
  },
  getters: {
    days: (s) => s.days,
    currentDay: (s) => s.currentDay,
  },
}
