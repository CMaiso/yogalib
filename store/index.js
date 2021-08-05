//state of the application
export const state = () => ({
  authUser: null,
  error: null
})

//read the value but not mutate the state
export const getters = {
  getUser(state) {
    return state.authUser;
  },
  isUserAuth(state) {
    return !!state.authUser;
  },
  getError(state) {
    return state.error;
  }
}

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
  async signInAction({commit}, {email, password}) {
    try {
      const {user} = await this.$firebase.auth.signInWithEmailAndPassword(
        email,
        password
      )
      commit('SET_USER', {uid: user.uid, email: user.email})
    } catch (e) {
      commit('SET_ERROR', e.message)
    }
  },

  async signOutAction({commit}) {
    try {
      await this.$firebase.auth.signOut()
      commit('SET_USER', null)
    } catch (e) {
      commit('SET_ERROR', e.message)
    }
  }
}
