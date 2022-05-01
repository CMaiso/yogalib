<template>
  <form
    class="text-body flex flex-col rounded-xl bg-white p-8 text-left shadow-lg"
  >
    <h2 class="mb-2 font-title text-3xl font-extrabold text-secondary">
      Informations Personnelles
    </h2>
    <FormInput
      label="Email"
      @blur="v$.email.$touch"
      v-model="v$.email.$model"
      :v="v$.email"
      type="email"
    />
    <FormInput
      label="Mot de passe"
      type="password"
      @blur="v$.password.$touch"
      :v="v$.password"
      v-model="v$.password.$model"
    />
    <FormInput
      label="Confirmation Mot de passe"
      type="password"
      @blur="v$.passwordConfirmation.$touch"
      :v="v$.passwordConfirmation"
      v-model="v$.passwordConfirmation.$model"
    />
    <FormInput
      label="Prénom"
      @blur="v$.firstName.$touch"
      :v="v$.firstName"
      v-model="v$.firstName.$model"
    />
    <FormInput
      label="Nom"
      @blur="v$.lastName.$touch"
      :v="v$.lastName"
      v-model="v$.lastName.$model"
    />
    <FormInput
      label="Téléphone"
      type="tel"
      @blur="v$.phone.$touch"
      :v="v$.phone"
      v-model="v$.phone.$model"
    />
  </form>
</template>

<script lang="ts">
import FormInput from '~/components/form/input.vue';
import {
  email,
  minLength,
  maxLength,
  required,
  sameAs,
} from '@vuelidate/validators';
import { defineComponent, reactive } from '@nuxtjs/composition-api';
import useVuelidate from '@vuelidate/core';

export default defineComponent({
  name: 'UserInformation',
  components: { FormInput },
  props: { user: Object },
  setup(props, { emit }) {
    const rules = {
      email: { required, email, maxLength: maxLength(500) },
      password: {
        minLength: minLength(6),
        required,
      },
      passwordConfirmation: {
        required,
        // sameAsPassword: sameAs(state.password),
        //TODO: create a custom validator
        // https://stackoverflow.com/questions/67938208/vuelidate-using-vue-2-6-and-composition-api
      },
      firstName: {
        required,
        maxLength: maxLength(500),
      },
      lastName: {
        required,
        maxLength: maxLength(500),
      },
      //TODO: add a special input and validation for phone number
      phone: {
        required,
      },
    };
    const v$ = useVuelidate(rules, props.user);

    return {
      v$,
    };
  },
});
</script>

<style scoped></style>
