import { createStore } from 'vuex'

import patient from './modules/Patient'

export default createStore({
  modules: {
    patient
  }
})
