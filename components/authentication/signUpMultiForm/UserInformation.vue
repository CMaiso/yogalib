<template>
  <form
    class="text-body flex flex-col rounded-xl bg-white p-8 text-left shadow-lg"
    @submit.prevent="onSubmit()"
  >
    <h2 class="mb-2 font-title text-3xl font-extrabold text-secondary">
      Informations Personnelles
    </h2>
    <FormInput
      label="Email"
      @validate="validateEmail()"
      :error="validationErrors.email"
      v-model="user.email"
      :v="$v.user.email"
    />
    <FormInput
      label="Mot de passe"
      type="password"
      @validate="validatePassword()"
      :error="validationErrors.password"
      :v="$v.user.password"
      v-model="user.password"
    />
    <FormInput
      label="Confirmation Mot de passe"
      type="password"
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
      @validate="validateLastName()"
      :error="validationErrors.lastName"
      :v="$v.user.lastName"
      v-model="user.lastName"
    />
    <FormInput
      label="Numéro de téléphone"
      type="tel"
      @validate="validatePhoneNumber()"
      :error="validationErrors.phoneNumber"
      :v="$v.user.phoneNumber"
      v-model="user.phoneNumber"
    />

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
      Suivant
    </button>
  </form>
</template>

<script lang="ts">
import FormInput from '@/components/form/input';
import { defineComponent } from '@nuxtjs/composition-api';
import {
  email,
  minLength,
  maxLength,
  required,
  sameAs,
} from 'vuelidate/lib/validators';
import { startCase, toLower } from 'lodash';

export default defineComponent({
  name: 'UserInformation',
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
        minLength: minLength(6),
        required,
      },
      passwordConfirmation: {
        sameAsPassword: sameAs('password'),
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
      phoneNumber: {
        required,
      },
    },
  },
  methods: {
    onSubmit() {
      if (this.hasErrors) return;
      this.newUserSignUp();
      //TODO: add emit event currentStep
    },
    async newUserSignUp() {
      //TODO: Need to know how can I use firebase cloud functions in Nuxt :( Missing something
      const newUserSignUp = firebase.functions().httpsCallable('newUserSignUp');

      await newUserSignUp({
        email: this.email.toLowerCase(),
        password: this.password,
        firstName: this.firstLetterCapitalize(this.firstName),
        lastName: this.firstLetterCapitalize(this.lastName),
        phone: this.phoneNumber,
      });
    },
    firstLetterCapitalize(name) {
      return startCase(toLower(name));
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
      if (!this.$v.user.passwordConfirmation.sameAsPassword) {
        this.validationErrors.passwordConfirmation =
          'Passwords must be identical';
      }
    },
    validateFirstName() {
      this.validationErrors = {
        ...this.validationErrors,
        firstName: '',
      };
      if (!this.$v.user.firstName.required) {
        this.validationErrors.firstName = 'First Name cannot be empty';
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
