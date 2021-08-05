<template>
  <header>
    <nav>
      <ul class="flex justify-center items-center">
        <li class="ml-2">
          <nuxt-link exact to="/">Dashboard</nuxt-link>
        </li>
        <li class="ml-2">
          <nuxt-link to="/register">S'enregistrer</nuxt-link>
        </li>
      </ul>
      <ul>
        <li v-if="isUserAuth">Coucou {{ getUser.email }}</li>
        <li>
          <button
            class=""
            v-if="!isUserAuth">
            <nuxt-link to="/login">Se connecter</nuxt-link>
          </button>
          <button
            class=""
            v-if="isUserAuth" @click="signOut">
            Déconnexion
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(['getUser', 'isUserAuth'])
  },
  methods: {
    ...mapActions([
      'signOutAction',
    ]),
    signOut() {
      this.signOutAction();
    }
  }
}

</script>

<style scoped>

</style>
