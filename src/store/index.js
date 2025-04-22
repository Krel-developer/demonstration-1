import yclient from '@/utils/yclientConnect'
import { createStore } from 'vuex'

import services from './modules/services'
import staffs from './modules/staffs'
import days from './modules/days'
import times from './modules/times'

export default createStore({
  state: {
    isStaffFirst: false,
    // это теперь не работает, поэтому не будут собираться данный для конечной отправки записи
    record: {
      service: null,
      staff: null,
      day: null,
      time: null,
    },
    prelaoder: {
      stageOne: false,
      stageTwo: false,
      stageThree: false,
    },
    stage: 1,
    isRecordComlete: false,
  },

  mutations: {
    switchPreloader(state, stage) {
      state.prelaoder[stage] = !state.prelaoder[stage]
    },
    setStagee(state, newStage) {
      state.stage = newStage
    },
    setRecordComplete(state) {
      state.isRecordComlete = true
    },
    setStaffFirst(state) {
      state.isStaffFirst = true
    },
  },
  actions: {
    async boockRecord({ commit }, data) {
      console.log(commit)

      const record = await yclient.boockRecord(data)
      console.log(record)
      return record
    },
    async createBookCode({ commit }, data) {
      console.log(commit)

      const code = await yclient.getBookCode(data)
      console.log(code)
    },

    switchStage({ commit }, newStage) {
      commit('setStagee', newStage)
    },
    completeRecord({ commit }) {
      commit('setRecordComplete')
    },
    activateStaffFirst({ commit }) {
      commit('setStaffFirst')
    },
  },
  getters: {
    record: (s) => s.record,
    preloader: (s) => s.prelaoder,
    stage: (s) => s.stage,
    isRecordComlete: (s) => s.isRecordComlete,
    isStaffFirst: (s) => s.isStaffFirst,
  },

  modules: {
    services,
    staffs,
    days,
    times,
  },
})
