<template>
  <section class="">
    <form class="" @submit.prevent="newUserSignUp()">
      <label>
        Email
        <input type="email" v-model="email" required/>
      </label>
      <label>
        Mot de passe
        <input type="password" v-model="password" required/>
      </label>
      <label>
        Prénom
        <input type="text" v-model="firstName" required/>
      </label>
      <label>
        Nom
        <input type="text" v-model="lastName" required/>
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
      phone: ""
    }
  },
  methods: {
    firstLetterCapitalize(name) {
      return startCase(toLower(name));
    },
    newUserSignUp() {
      const newUserSignUp = this.$firebase.functions().httpsCallable("newUserSignUp");

      newUserSignUp({
        email: this.email.toLowerCase(),
        password: this.password,
        firstName: this.firstLetterCapitalize(this.firstName),
        lastName: this.firstLetterCapitalize(this.lastName),
        phone: this.phone,
      });
    },
    sendMailConfirmation() {
      this.$firebase.functions().httpsCallable("sendMailConfirmation");
    }
  },
  props: {
  },
  computed: {
  },
}
</script>
