<template>
  <section class="flex items-center justify-center sm:h-screen sm:w-screen">
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
        @blur="validateEmail()"
        :error="validationErrors.email"
        v-model="user.email"
        :v="v$.user.email"
      />
      <FormInput
        label="Mot de passe"
        type="password"
        @blur="validatePassword()"
        :error="validationErrors.password"
        :v="v$.user.password"
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
import { required, maxLength, email } from '@vuelidate/validators';
import {
  defineComponent,
  ref,
  computed,
  reactive,
} from '@nuxtjs/composition-api';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import FormInput from '~/components/form/input.vue';

export default defineComponent({
  name: `SignIn`,
  components: { FormInput },

  setup() {
    const state = reactive({ user: { email: ``, password: `` } });

    const validationErrors = ref({ email: ``, password: `` });

    const rules = computed(() => ({
      email: { required, email, maxLength: maxLength(500) },
      password: { required },
    }));
    const v$ = useVuelidate(rules, state);

    const store = useStore();
    const error = computed(() => store.getters('authentication/getError'));

    const hasErrors = computed(() => {
      return v$.user.$invalid;
    });

    const onSubmit = () => {
      if (hasErrors) return;
      store.dispatch('authentication/signInAction', {
        email: state.user.email,
        password: state.user.password,
      });
    };

    const validateEmail = () => {
      v$.$touch();
      this.validationErrors = { ...validationErrors, email: '' }; //reset email errors
      if (v$.user.email.$error) {
        validationErrors.email = 'Email is invalid';
      }
      if (!v$.user.email.required) {
        validationErrors.email = 'Email is required';
      }
    };

    const validatePassword = () => {
      v$.$touch();
      this.validationErrors = { ...validationErrors, password: '' }; //reset password errors
      if (!v$.user.password.required) {
        validationErrors.password = 'Password cannot be empty';
      }
    };

    return {
      state,
      validationErrors,
      v$,
      error,
      hasErrors,
      onSubmit,
      validateEmail,
      validatePassword,
    };
  },
});
</script>
