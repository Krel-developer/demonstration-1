import yclient from '@/utils/yclientConnect'

export default {
  state: {
    staffs: [],
    currentStaff: null,
  },
  mutations: {
    staffsSet(state, staffs) {
      state.staffs = staffs
    },
    currentStaffSet(state, staff) {
      state.currentStaff = staff
    },
  },
  actions: {
    disCurrentStaffSet({ commit }, staff) {
      commit('currentStaffSet', staff)
    },
    async staffsFetchList({ commit, rootGetters }) {
      commit('switchPreloader', 'stageTwo')
      // если этот аргумент не null то будет запрос списка врачей для конкретной услуги
      const currentService = rootGetters.currentService

      const staffs = await yclient.getStaffs(currentService)

      commit('staffsSet', staffs)

      commit('switchPreloader', 'stageTwo')
    },

    async staffsSubmit({ commit, rootGetters, dispatch }, staffsId) {
      const isStaffFirst = rootGetters.isStaffFirst
      commit('currentStaffSet', staffsId)

      commit('currentDaySet', null)
      commit('currentTimeSet', null)

      commit('daysSet', [])
      commit('timesSet', [])

      if (isStaffFirst) {
        // иначе запрашиваем список врачей
        commit('currentServiceSet', null)
        dispatch('servicesFetchList')
      } else {
        // Если первым этапом является услуги, то запрашиваем дни

        dispatch('daysFetchList')
      }
    },
  },
  getters: {
    staffs: (s) => s.staffs,
    currentStaff: (s) => s.currentStaff,
  },
}
