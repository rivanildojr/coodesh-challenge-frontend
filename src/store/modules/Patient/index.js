const INITIAL_STATE = {
  patients: []
}

const patient = {
  namespaced: true,
  state: () => INITIAL_STATE,
  mutations: {
    clearState (state) {
      state = INITIAL_STATE
    },
    setPatients (state, patients) {
      state.patients = [...state.patients, ...patients]
    }
  },
  actions: {
    addPatients ({ commit }, patients) {
      commit('setPatients', patients)
    }
  }
}

export default patient
