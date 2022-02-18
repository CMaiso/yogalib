<template>
  <form
    class="text-body flex flex-col rounded-xl bg-white p-8 text-left shadow-lg"
    @submit.prevent="onSubmit()"
  >
    <h2 class="mb-2 font-title text-3xl font-extrabold text-secondary">
      Informations Personnelles
    </h2>
    <FormInput
      label="Instagram"
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
    <FormInput
      label="Confirmation Mot de passe"
      password
      @validate="validatePasswordConfirmation()"
      :error="validationErrors.passwordConfirmation"
      :v="$v.user.passwordConfirmation"
      v-model="user.passwordConfirmation"
    />
    <FormInput
      label="Prénom"
      @validate="validateFirstName()"
      :error="validationErrors.firstName"
      :v="$v.user.firstName"
      v-model="user.firstName"
    />
    <FormInput
      label="Nom"
      @validate="validateFirstName()"
      :error="validationErrors.lastName"
      :v="$v.user.lastName"
      v-model="user.lastName"
    />
    <FormInput
      label="Numéro de téléphone"
      @validate="validatePhoneNumber()"
      :error="validationErrors.phoneNumber"
      :v="$v.user.phoneNumber"
      v-model="user.phoneNumber"
    />
  </form>
</template>

<script lang="ts">
import FormInput from '@/components/form/input';
import { defineComponent } from '@nuxtjs/composition-api';
import { email, maxLength, required } from 'vuelidate/lib/validators';

export default defineComponent({
  name: 'SocialInformation',
  components: { FormInput },
  data() {
    return {
      user: {
        email: '' as String,
        password: '' as String,
        passwordConfirmation: '' as String,
        firstName: '' as String,
        lastName: '' as String,
        phoneNumber: '' as String,
      },
      validationErrors: {
        email: '',
        password: '',
        passwordConfirmation: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
      } as Object,
    };
  },
  validations: {
    user: {
      email: { required, email, maxLength: maxLength(500) },
      password: {
        required,
      },
      passwordConfirmation: {
        required,
      },
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      phoneNumber: {
        required,
      },
    },
  },
  methods: {
    onSubmit() {
      if (this.hasErrors) return;
    },
    //TODO: refactor validate functions (too much functions for one thing :( )
    validateEmail() {
      this.validationErrors = { ...this.validationErrors, email: '' };
      if (this.$v.user.email.$error) {
        this.validationErrors.email = 'Email is invalid';
      }
      if (!this.$v.user.email.required) {
        this.validationErrors.email = 'Email is required';
      }
    },
    validatePassword() {
      this.validationErrors = { ...this.validationErrors, password: '' };
      if (!this.$v.user.password.required) {
        this.validationErrors.password = 'Password cannot be empty';
      }
    },
    validatePasswordConfirmation() {
      this.validationErrors = {
        ...this.validationErrors,
        passwordConfirmation: '',
      };
      if (!this.$v.user.passwordConfirmation.required) {
        this.validationErrors.password =
          'Password Confirmation cannot be empty';
      }
    },
    validateFirstName() {
      this.validationErrors = {
        ...this.validationErrors,
        firstName: '',
      };
      if (!this.$v.user.firstName.required) {
        this.validationErrors.password = 'First Name cannot be empty';
      }
    },
    validateLastName() {
      this.validationErrors = {
        ...this.validationErrors,
        lastName: '',
      };
      if (!this.$v.user.lastName.required) {
        this.validationErrors.lastName = 'Last Name cannot be empty';
      }
    },
    validatePhoneNumber() {
      //TODO: add verification for phone format
      this.validationErrors = {
        ...this.validationErrors,
        phoneNumber: '',
      };
      if (!this.$v.user.phoneNumber.required) {
        this.validationErrors.phoneNumber = 'Phone Number cannot be empty';
      }
    },
  },
  computed: {
    hasErrors() {
      return this.$v.user.$invalid;
    },
  },
});
</script>

<style scoped></style>
