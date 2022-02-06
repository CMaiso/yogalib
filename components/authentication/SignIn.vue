<template>
  <section class="flex h-full w-full items-center justify-center bg-gray-50">
    <div>{{ error }}</div>
    <form
      class="
        text-body
        flex flex-col
        rounded-xl
        bg-white
        p-8
        text-left
        shadow-lg
      "
      @submit.prevent="onSubmit()"
    >
      <h2 class="mb-2 font-title text-3xl font-extrabold text-secondary">
        Welcome back !
      </h2>
      <p class="mb-6 font-semibold">Connectez-vous à votre compte</p>
      <FormInput
        label="Email"
        @validate="validateEmail()"
        :error="validationErrors.email"
        v-model="user.email"
        :v="$v.user.email"
      />
      <FormInput
        label="Mot de passe"
        password
        @validate="validatePassword()"
        :error="validationErrors.password"
        :v="$v.user.password"
        v-model="user.password"
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
              rounded
              border-gray-300
              text-indigo-600
              focus:ring-indigo-500
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
          <a href="#" class="font-medium text-secondary hover:text-primary">
            Mot de passe oublié ?
          </a>
        </div>
      </div>
      <button
        class="
          focus:outline-none
          mt-4
          flex
          w-full
          justify-center
          rounded-md
          border border-transparent
          py-2
          px-4
          text-sm
          font-medium
          text-white
        "
        type="submit"
        :class="hasErrors ? 'bg-yellow-200' : 'bg-primary hover:bg-secondary'"
      >
        Se connecter
      </button>
    </form>
  </section>
</template>

<script lang="ts">
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { defineComponent } from '@nuxtjs/composition-api';
import FormInput from '~/components/form/input';

export default defineComponent({
  name: `SignIn`,
  components: { FormInput },
  data() {
    return {
      user: {
        email: '' as String,
        password: '' as String,
      },
      validationErrors: { email: '', password: '' } as Object,
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
    onSubmit(): void {
      if (this.hasErrors) return;
      this.$store.dispatch('authentication/signInAction', {
        email: this.user.email,
        password: this.user.password,
      });
    },
    validateEmail(): void {
      this.validationErrors = { ...this.validationErrors, email: '' }; //reset email errors
      if (this.$v.user.email.$error) {
        this.validationErrors.email = 'Email is invalid';
      }
      if (!this.$v.user.email.required) {
        this.validationErrors.email = 'Email is required';
      }
    },
    validatePassword(): void {
      this.validationErrors = { ...this.validationErrors, password: '' }; //reset password errors
      if (!this.$v.user.password.required) {
        this.validationErrors.password = 'Password cannot be empty';
      }
    },
  },
  computed: {
    getUser() {
      return this.$store.getters['authentication/getUser'];
    },
    isUserAuth() {
      return this.$store.getters['authentication/isUserAuth'];
    },
    error() {
      return this.$store.getters['authentication/getError'];
    },
    hasErrors() {
      return this.$v.user.$invalid;
    },
  },
});
</script>
