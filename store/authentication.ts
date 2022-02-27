import { defineStore } from 'pinia';

export const useAuthenticationStore = defineStore('authenticationStore', {
  state: () => {
    return {
      authUser: null,
      error: null,
    };
  },

  actions: {
    async signInAction({ email, password }) {
      try {
        const { user } = await this.$fire.auth.signInWithEmailAndPassword(
          email,
          password,
        );
        this.authUser = { uid: user.uid, email: user.email };
        this.fetchUserData({ uid: user.uid });
      } catch (e) {
        if (e.code === 'auth/wrong-password') {
          this.error = 'Le mot de passe ne correspond pas.';
        } else {
          this.error = e.message;
        }
      }
    },

    async signOutAction() {
      try {
        await this.$fire.auth.signOut();
        this.authUser = null;
      } catch (e) {
        this.error = e.message;
      }
    },

    authAction() {
      this.$fire.auth.onAuthStateChanged((user) => {
        if (user) {
          this.authUser = { uid: user.uid, email: user.email };
        } else {
          this.authUser = null;
        }
      });
    },

    async fetchUserData({ uid }) {
      try {
        const collection = await this.$fire.firestore
          .collection('users')
          .doc(uid)
          .get();
        const userInformation = await collection.data();
        this.authUser = { ...this.authUser, ...userInformation };
      } catch (e) {
        this.error = e.message;
      }
    },
  },

  getters: {
    getUser: (state) => {
      return state.authUser;
    },
    isUserAuth: (state) => {
      return !!state.authUser;
    },
    getError: (state) => {
      return state.error;
    },
  },
});
