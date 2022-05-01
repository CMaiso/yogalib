<template>
  <FormCard @submit.prevent="onSubmit()">
    <h2 class="mb-2 font-title text-3xl font-extrabold text-secondary">
      Welcome back !
    </h2>
    <p class="mb-6 font-semibold">Connectez-vous à votre compte</p>
    <FormInput
      label="Email"
      v-model="v$.email.$model"
      :v="v$.email"
      @blur="v$.email.$touch"
    />
    <FormInput
      label="Mot de passe"
      type="password"
      :errors="v$.password.$errors"
      v-model="v$.password.$model"
      :v="v$.password"
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
        <label for="remember-me" class="ml-1 mr-5 block text-sm text-gray-900">
          Se souvenir de moi
        </label>
      </div>

      <div class="text-sm">
        <a href="#" class="font-medium text-secondary hover:text-primary">
          Mot de passe oublié ?
        </a>
      </div>
    </div>
    <div>{{ error }}</div>
    <FormButton type="submit" :disabled="v$.$invalid">
      Se connecter
    </FormButton>
  </FormCard>
</template>

<script lang="ts">
import { required, maxLength, email } from '@vuelidate/validators';
import { useAuthenticationStore } from '~/store/authentication';
import { defineComponent, reactive } from '@nuxtjs/composition-api';
import useVuelidate from '@vuelidate/core';
import FormButton from '~/components/form/button.vue';
import FormInput from '~/components/form/input.vue';
import FormCard from '~/components/form/card.vue';

export default defineComponent({
  name: `SignIn`,
  components: { FormButton, FormInput, FormCard },
  setup() {
    const state = reactive({ email: ``, password: `` });

    const rules = {
      email: { required, email, maxLength: maxLength(500) },
      password: { required },
    };
    const v$ = useVuelidate(rules, state);

    const authenticationStore = useAuthenticationStore();
    const error = authenticationStore.getError;

    const onSubmit = () => {
      if (v$.$invalid) return;
      authenticationStore.signInAction({
        email: state.email,
        password: state.password,
      });
    };

    return {
      v$,
      error,
      onSubmit,
    };
  },
});
</script>
