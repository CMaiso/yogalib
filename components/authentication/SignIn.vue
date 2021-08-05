<template>
  <section class="flex w-full min-h-screen justify-center items-center bg-gray-50 max-w-full">
    <form class="text-left bg-white rounded-xl shadow-lg p-8 flex flex-col" @submit.prevent="signIn()">
      <h2 class="text-center text-3xl font-extrabold text-pink-700 mb-8">
        Se connecter
      </h2>
      <label class="mb-1">Email</label>
      <input class="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none mb-4" type="email" v-model="email"
             required/>
      <label class="mb-1">Mot de passe</label>
      <input class="ring-1 ring-gray-300 w-full rounded-md px-4 py-2 outline-none mb-4" type="password" v-model="password"
             required/>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox"
                 class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
          <label for="remember-me" class="ml-1 mr-5 block text-sm text-gray-900">
            Se souvenir de moi
          </label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-pink-700 hover:text-pink-500">
            Mot de passe oublié ?
          </a>
        </div>
      </div>
      <button
        class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
        type="submit">Se connecter
      </button>
    </form>
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: `SignIn`,
  data() {
    return {
      email: "",
      password: "",
      validationErrors: []
    }
  },
  methods: {
    ...mapActions([
      'signInAction',
    ]),
    signIn() {
      this.signInAction({email: this.email, password: this.password})
    }
  },
  props: {},
  computed: {
    ...mapGetters(['getUser', 'isUserAuth'])
  },
}
</script>
