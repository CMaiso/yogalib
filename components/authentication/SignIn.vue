<template>
  <section class="flex w-full h-full justify-center items-center bg-gray-50">
    {{ getError }}
    <form
      class="text-left bg-white rounded-xl shadow-lg p-8 flex flex-col"
      @submit.prevent="onSubmit()"
    >
      <h2 class="text-center text-3xl font-extrabold text-pink-700 mb-8">
        Se connecter
      </h2>
      <label class="mb-1">Email</label>
      <input
        class="
          placeholder-gray-600
          bg-gray-100
          border border-gray-100
          focus:placeholder-gray-500 focus:bg-white focus:border-gray-500
          w-full
          rounded-md
          px-4
          py-2
          outline-none
          mb-4
        "
        type="email"
        v-model="$v.email.$model"
        placeholder="votremail@exemple.com"
      />
      <label class="mb-1">Mot de passe</label>
      <input
        class="
          placeholder-gray-600
          bg-gray-100
          border border-gray-100
          focus:placeholder-gray-500 focus:bg-white focus:border-gray-500
          w-full
          rounded-md
          px-4
          py-2
          outline-none
          mb-4
        "
        type="password"
        v-model="$v.password.$model"
        placeholder="Votre mot de passe"
      />
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="
              h-4
              w-4
              text-indigo-600
              focus:ring-indigo-500
              border-gray-300
              rounded
            "
          />
          <label
            for="remember-me"
            class="ml-1 mr-5 block text-sm text-gray-900"
          >
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
        class="
          w-full
          flex
          justify-center
          py-2
          px-4
          border border-transparent
          text-sm
          font-medium
          rounded-md
          text-white
          bg-pink-600
          hover:bg-pink-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
          mt-4
        "
        type="submit"
        :class="{
          disabled: '',
        }"
      >
        Se connecter
      </button>
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: `SignIn`,
  data() {
    return {
      email: '',
      password: '',
    };
  },
  validations: {
    email: { required, minLength: minLength(4) },
    password: { required, minLength: minLength(4) },
  },
  methods: {
    ...mapActions(['signInAction']),
    onSubmit() {
      this.signInAction({ email: this.email, password: this.password });
    },
  },
  props: {},
  computed: {
    ...mapGetters(['getUser', 'isUserAuth', 'getError']),
  },
};
</script>
