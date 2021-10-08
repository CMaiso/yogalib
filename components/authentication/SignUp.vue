<template>
  <section class="">
    <div v-if="validationErrors.length"
         class="">
      <ul style="">
        <li
          v-for="(error, index) in validationErrors"
          :key="`error-${index}`"
          v-html="error"
        />
      </ul>
    </div>
    <form class="" @submit.prevent="validate()">
      <label>
        Email
        <input type="email" v-model="email" />
      </label>
      <label>
        Mot de passe
        <input type="password" v-model="password" />
      </label>
      <label>
        Confirmer le mot de passe
        <input type="password" v-model="confirmPassword" />
      </label>
      <label>
        Prénom
        <input type="text" v-model="firstName" />
      </label>
      <label>
        Nom
        <input type="text" v-model="lastName"/>
      </label>
      <label>
        Téléphone
        <input type="text" v-model="phone"/>
      </label>
      <button type="submit">Créer son compte</button>
    </form>
  </section>
</template>

<script>
import { startCase } from "lodash";
import { toLower } from "lodash";

export default {
  name: `SignUp`,
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: null,
      validationErrors: []
    }
  },
  methods: {
    firstLetterCapitalize(name) {
      return startCase(toLower(name));
    },
    async newUserSignUp() {
      const newUserSignUp = this.$firebase.functions.httpsCallable("newUserSignUp");

      await newUserSignUp({
        email: this.email.toLowerCase(),
        password: this.password,
        firstName: this.firstLetterCapitalize(this.firstName),
        lastName: this.firstLetterCapitalize(this.lastName),
        phone: this.phone,
      });
    },
    sendMailConfirmation() {
      this.$firebase.functions().httpsCallable("sendMailConfirmation");
    },
    resetError() {
      this.validationErrors = [];
    },
    validate() {
      this.resetError();

      if (!this.email) {
        this.validationErrors.push("<strong>E-mail</strong> cannot be empty.");
      }
      if (!this.password) {
        this.validationErrors.push("<strong>Password</strong> cannot be empty");
      }
      if (!this.firstName) {
        this.validationErrors.push("<strong>FirstName</strong> cannot be empty");
      }
      if (!this.lastName) {
        this.validationErrors.push("<strong>LastName</strong> cannot be empty");
      }
      if (!this.phone) {
        this.validationErrors.push("<strong>Phone</strong> cannot be empty");
      }
      if (this.password !== this.confirmPassword) {
        this.validationErrors.push("<strong>Password</strong> cannot be different");
      }
      if (this.validationErrors.length <= 0) {
        this.newUserSignUp();
      }
    },
  },
  props: {
  },
  computed: {
  },
}
</script>
