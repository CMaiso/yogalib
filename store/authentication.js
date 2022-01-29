export const state = () => ({
  authUser: null,
  error: null,
});

export const mutations = {
  SET_USER(state, user) {
    state.authUser = user;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  UPDATE_USER(state, userInformation) {
    state.authUser = { ... state.authUser, ...userInformation };
  }
};

export const actions = {
  async signInAction({ commit, dispatch }, { email, password }) {
    try {
      const { user } = await this.$firebase.auth.signInWithEmailAndPassword(
        email,
        password,
      );
      commit('SET_USER', { uid: user.uid, email: user.email });
      dispatch('fetchUserData', { uid: user.uid });
    } catch (e) {
      if (e.code === 'auth/wrong-password') {
        commit('SET_ERROR', 'Le mot de passe ne correspond pas.');
      } else {
        commit('SET_ERROR', e.message);
      }
      //TODO: Personalize all errors
    }
  },

  async signOutAction({ commit }) {
    try {
      await this.$firebase.auth.signOut();
      commit('SET_USER', null);
    } catch (e) {
      commit('SET_ERROR', e.message);
    }
  },

  authAction({ commit }) {
    this.$firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        commit('SET_USER', { uid: user.uid, email: user.email });
      } else {
        commit('SET_USER', null);
      }
    });
  },

  async fetchUserData({ commit, state }, { uid }) {
    try {
      const collection = await this.$firebase.db.collection('users').doc(uid).get();
      const userInformation = await collection.data();
      commit('UPDATE_USER', userInformation);
    }
    catch (e) {
      commit('SET_ERROR', e.message);
    }
  }
};

export const getters = {
  getUser: (state) => {
    return state.authUser;
  },
  isUserAuth: (state) => {
    return !!state.authUser;
  },
  getError: (state) => {
    return state.error;
  },
};


