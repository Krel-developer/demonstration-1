import yclient from '@/utils/yclientConnect'

export default {
  state: {
    services: [],
    currentService: null,
  },
  mutations: {
    servicesSet(state, services) {
      state.services = services
    },
    currentServiceSet(state, service) {
      state.currentService = service
    },
  },
  actions: {
    disCurrentServiceSet({ commit }, service) {
      commit('currentServiceSet', service)
    },
    async servicesFetchList({ commit, rootGetters }) {
      commit('switchPreloader', 'stageOne')

      // если этот аргумент не null то будет запрос списка услуг для конкретного врача
      const currentStaff = rootGetters.currentStaff

      const services = await yclient.getServices(currentStaff)

      commit('servicesSet', services)

      commit('switchPreloader', 'stageOne')
    },

    async serviceSubmit({ commit, rootGetters, dispatch }, servicesId) {
      const isStaffFirst = rootGetters.isStaffFirst
      commit('currentServiceSet', servicesId)

      commit('currentDaySet', null)
      commit('currentTimeSet', null)

      commit('daysSet', [])
      commit('timesSet', [])

      if (isStaffFirst) {
        // Если первым этапом является врачи, то запрашиваем дни
        dispatch('daysFetchList')
      } else {
        // иначе запрашиваем список врачей
        commit('currentStaffSet', null)
        dispatch('staffsFetchList')
      }
    },
  },
  getters: {
    services: (s) => s.services,
    currentService: (s) => s.currentService,
  },
}
