<template>
  <header>
    <nav
      class="
        fixed
        flex
        w-screen
        flex-wrap
        items-center
        justify-between
        bg-white
        p-6
      "
    >
      <div class="mr-6 flex flex-shrink-0 items-center text-gray-700">
        <span class="text-xl font-semibold tracking-tight">YogaLib v2</span>
      </div>
      <ul class="text-sm lg:flex-grow">
        <li
          class="text-teal-200 mr-4 block hover:text-pink-700 lg:inline-block"
        >
          <nuxt-link exact to="/">Dashboard</nuxt-link>
        </li>
        <li
          class="text-teal-200 mr-4 block hover:text-pink-700 lg:inline-block"
        >
          <nuxt-link to="/register">S'enregistrer</nuxt-link>
        </li>
      </ul>
      <ul>
        <li class="mr-4 lg:inline-block" v-if="isUserAuth">
          Bienvenue {{ user.email }}
        </li>
        <li class="lg:inline-block">
          <button
            class="
              rounded-md
              border border-pink-700
              bg-white
              py-1
              px-2
              text-pink-600
              hover:bg-pink-700 hover:text-white
            "
            v-if="!isUserAuth"
          >
            <nuxt-link to="/account/login">Se connecter</nuxt-link>
          </button>
          <button
            class="
              rounded-md
              border border-pink-700
              bg-white
              py-1
              px-2
              text-pink-600
              hover:bg-pink-700 hover:text-white
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
export default {
  name: 'NavBar',
  computed: {
    user() {
      return this.$store.getters['authentication/getUser'];
    },
    isUserAuth() {
      return this.$store.getters['authentication/isUserAuth'];
    },
  },
  methods: {
    signOut() {
      this.$store.dispatch('authentication/signOutAction');
    },
  },
  mounted() {
    this.$store.dispatch('authentication/authAction');
  },
};
</script>

<style scoped></style>
