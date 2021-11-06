<template>
  <header>
    <nav
      class="
        fixed
        flex
        items-center
        justify-between
        flex-wrap
        bg-white
        p-6
        w-screen
      "
    >
      <div class="flex items-center flex-shrink-0 text-gray-700 mr-6">
        <span class="font-semibold text-xl tracking-tight">YogaLib v2</span>
      </div>
      <ul class="text-sm lg:flex-grow">
        <li
          class="block lg:inline-block text-teal-200 hover:text-pink-700 mr-4"
        >
          <nuxt-link exact to="/">Dashboard</nuxt-link>
        </li>
        <li
          class="block lg:inline-block text-teal-200 hover:text-pink-700 mr-4"
        >
          <nuxt-link to="/register">S'enregistrer</nuxt-link>
        </li>
      </ul>
      <ul>
        <li class="lg:inline-block mr-4" v-if="isUserAuth">
          Bienvenue {{ getUser.email }}
        </li>
        <li class="lg:inline-block">
          <button
            class="
              rounded-md
              border border-pink-700
              text-pink-600
              bg-white
              hover:bg-pink-700 hover:text-white
              py-1
              px-2
            "
            v-if="!isUserAuth"
          >
            <nuxt-link to="/account/login">Se connecter</nuxt-link>
          </button>
          <button
            class="
              rounded-md
              border border-pink-700
              text-pink-600
              bg-white
              hover:bg-pink-700 hover:text-white
              py-1
              px-2
            "
            v-if="isUserAuth"
            @click="signOut"
          >
            Déconnexion
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters(['getUser', 'isUserAuth']),
  },
  methods: {
    ...mapActions(['signOutAction', 'authAction']),
    signOut() {
      this.signOutAction();
    },
  },
  mounted() {
    this.authAction();
  },
};
</script>

<style scoped></style>
