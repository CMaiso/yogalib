<template>
  <section class="flex w-full h-full justify-center items-center bg-gray-50">
    <div>{{ getError }}</div>
    <form
      class="
        text-left
        bg-white
        rounded-xl
        shadow-lg
        p-8
        flex flex-col
        text-body
      "
      @submit.prevent="onSubmit()"
    >
      <h2 class="text-3xl font-title font-extrabold text-secondary mb-2">
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
          <a href="#" class="font-medium text-secondary hover:text-primary">
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
        :class="hasErrors ? 'bg-yellow-100' : 'bg-primary hover:bg-secondary'"
      >
        Se connecter
      </button>
    </form>
  </section>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
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
    ...mapActions(['signInAction']),
    onSubmit(): void {
      if (this.hasErrors) return;
      this.signInAction({
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
    ...mapGetters(['getUser', 'isUserAuth', 'getError']),
    hasErrors(): object | null {
      return this.validationErrors === {} && this.validationErrors;
    },
  },
});
</script>
