import * as fb from "../plugins/firebase";

//state of the application
export const state = () => ({
  authUser: null,
  error: null
})

//read the value but not mutate the state
// export const getters = {
//   getterValue: state => {
//     return state.value
//   }
// }

//update the state, always synchronous. It's the only way to change data in the store
export const mutations = {
  SET_USER: (state, user) => {
    state.authUser = user;
  },
  SET_ERROR: (state, error) => {
    state.error = error;
  }
}

//update the state always asynchronous. Very helpful if you need to perform mutation in a particular order, or reach out to a server
export const actions = {
  async signInAction({ commit }, credentials) {
    try {
      const user = await fb.auth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
      commit('SET_USER', user)
    } catch (e) {
      commit('SET_ERROR', e.message)
    }
  },

  async signOut({ commit }) {
    try {
      await fb.auth.signOut()
      commit('SET_USER', null)
    } catch (e) {
      commit('SET_ERROR', e.message)
    }
  }
}
