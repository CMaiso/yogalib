<template>
  <header
    class="
      absolute
      w-full
      bg-white
      sm:flex sm:items-center sm:justify-between sm:px-4 sm:py-3
    "
  >
    <div class="flex items-center justify-between px-4 py-3 sm:p-0">
      <div>
        <span class="text-xl font-semibold tracking-tight">YogaLib v2</span>
      </div>
      <div class="sm:hidden">
        <button
          @click="isOpen = !isOpen"
          type="button"
          class="
            focus:outline-none
            hover:text-grey
            focus:text-grey
            block
            text-gray-500
          "
        >
          <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path
              v-if="isOpen"
              fill-rule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
            />
            <path
              v-if="!isOpen"
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            />
          </svg>
        </button>
      </div>
    </div>
    <nav
      :class="isOpen ? 'block' : 'hidden'"
      class="px-2 pt-2 pb-4 sm:flex sm:p-0"
    >
      <ul class="sm:flex sm:items-center">
        <li class="text-teal-200 mr-4 block hover:text-pink-700">
          <nuxt-link exact to="/">Dashboard</nuxt-link>
        </li>
        <li class="text-teal-200 mr-4 block hover:text-pink-700">
          <nuxt-link to="/account/register">S'enregistrer</nuxt-link>
        </li>
      </ul>
      <button
        class="
          block
          rounded-md
          border border-pink-700
          bg-white
          px-2
          py-1
          font-semibold
          text-pink-600
          hover:bg-pink-700 hover:text-white
        "
        v-if="!isUserAuth"
      >
        <nuxt-link to="/account/login">Se connecter</nuxt-link>
      </button>
      <button
        class="
          mt-1
          block
          rounded-md
          px-2
          py-1
          font-semibold
          text-pink-600
          hover:bg-pink-700 hover:text-white
          sm:mt-0 sm:ml-2
        "
        v-if="isUserAuth"
        @click="signOut"
      >
        Déconnexion
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isOpen: false,
    };
  },
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
