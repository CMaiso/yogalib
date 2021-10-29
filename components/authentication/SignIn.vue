<template>
  <section class="flex w-full h-full justify-center items-center bg-gray-50">
    {{ getError }}
    <div v-if="validationErrors.length" class="">
      <ul style="">
        <li
          v-for="(error, index) in validationErrors"
          :key="`error-${index}`"
          v-html="error"
        />
      </ul>
    </div>
    <form
      class="text-left bg-white rounded-xl shadow-lg p-8 flex flex-col"
      @submit.prevent="validate()"
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
        v-model="$v.user.email.$model"
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
        v-model="$v.user.password.$model"
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
import {
  required,
  minLength,
  maxLength,
  email,
} from 'vuelidate/lib/validators';

export default {
  name: `SignIn`,
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      validationErrors: [],
    };
  },
  validations: {
    user: {
      email: { required, email, maxLength: maxLength(500) },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(255),
      },
    },
  },
  methods: {
    ...mapActions(['signInAction']),
    invalidField(field) {
      return field.$error;
    },
    onSubmit() {
      this.signInAction({
        email: this.user.email,
        password: this.user.password,
      });
    },
    validate() {
      this.resetError();
      // TODO: Find a better way to display errors with blur ?
      if (this.$v.user.email.$error) {
        this.validationErrors.push('<strong>E-mail</strong> is incorrect.');
      }
      if (!this.$v.user.email.required) {
        this.validationErrors.push('<strong>E-mail</strong> is required.');
      }
      if (!this.$v.user.password.required) {
        this.validationErrors.push('<strong>Password</strong> cannot be empty');
      }
      if (this.$v.user.password.$error) {
        this.validationErrors.push('<strong>Password</strong> is incorrect.');
      }
      if (this.validationErrors.length <= 0) {
        this.onSubmit();
      }
    },
    resetError() {
      this.validationErrors = [];
    },
  },
  props: {},
  computed: {
    ...mapGetters(['getUser', 'isUserAuth', 'getError']),
  },
};
</script>
