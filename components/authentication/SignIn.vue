<template>
  <section class="flex w-full h-full justify-center items-center bg-gray-50">
    <div>{{ getError }}</div>
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
        :class="
          this.invalidField($v.user.email)
            ? 'border-red-500'
            : 'border border-gray-100'
        "
        @blur="validate"
        v-model="$v.user.email.$model"
      />
      <p v-if="validationErrors.email">{{ validationErrors.email }}</p>
      <label class="mb-1">Mot de passe</label>
      <input
        class="
          placeholder-gray-600
          bg-gray-100
          focus:placeholder-gray-500 focus:bg-white focus:border-gray-500
          w-full
          rounded-md
          px-4
          py-2
          outline-none
          mb-4
        "
        :class="
          this.invalidField($v.user.password)
            ? 'border-red-500'
            : 'border border-gray-100'
        "
        type="password"
        v-model="$v.user.password.$model"
        @blur="validate"
      />
      <p v-if="validationErrors.password">
        {{ validationErrors.password }}
      </p>
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
          focus:outline-none
          mt-4
        "
        type="submit"
        :class="hasErrors ? 'bg-pink-200' : 'bg-pink-600 hover:bg-pink-700'"
      >
        Se connecter
      </button>
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required, maxLength, email } from 'vuelidate/lib/validators';

export default {
  name: `SignIn`,
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      validationErrors: {},
    };
  },
  validations: {
    user: {
      email: { required, email, maxLength: maxLength(500) },
      password: {
        required,
      },
    },
  },
  methods: {
    ...mapActions(['signInAction']),
    onSubmit() {
      if (this.hasErrors) return; // doesn't work
      this.signInAction({
        email: this.user.email,
        password: this.user.password,
      });
    },
    validate() {
      this.resetError();
      if (this.$v.user.email.$error) {
        this.validationErrors.email = 'Email is invalid';
      }
      if (!this.$v.user.email.required) {
        this.validationErrors.email = 'Email is required';
      }
      if (!this.$v.user.password.required) {
        this.validationErrors.password = 'Password cannot be empty';
      }
    },
    resetError() {
      this.validationErrors = {};
    },
    invalidField(field) {
      return field.$error;
    },
  },
  props: {},
  computed: {
    ...mapGetters(['getUser', 'isUserAuth', 'getError']),
    hasErrors() {
      return this.validationErrors;
    },
  },
};
</script>
