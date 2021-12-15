<template>
  <section class="flex w-full h-full justify-center items-center bg-gray-50">
    <div>{{ getError }}</div>
    <form
      class="text-left bg-white rounded-xl shadow-lg p-8 flex flex-col"
      @submit.prevent="onSubmit()"
    >
      <h2
        class="text-center text-3xl font-title font-semibold text-pink-700 mb-8"
      >
        Se connecter
      </h2>
      <FormInput
        label="Email"
        @validate="validate()"
        :error="validationErrors.email"
        v-model="user.email"
        :v="$v.user.email"
      />
      <FormInput
        label="Mot de passe"
        @validate="validate()"
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
      validationErrors: {} as Object,
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
    validate(): void {
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
    resetError(): void {
      this.validationErrors = {};
    },
  },
  computed: {
    ...mapGetters(['getUser', 'isUserAuth', 'getError']),
    hasErrors(): object | null {
      return this.validationErrors === {} ? this.validationErrors : null;
    },
  },
});
</script>
