<template>
  <section class="">
    <form class="" @submit.prevent="signIn()">
      <label>
        Email
        <input type="email" v-model="email" required/>
      </label>
      <label>
        Mot de passe
        <input type="password" v-model="password" required/>
      </label>
      <button type="submit">Se connecter</button>
      <a href="/">Mot de passe oublié ?</a>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: `SignIn`,
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    ...mapActions([
      'signInAction',
    ]),
    signIn() {
      this.signInAction({email: this.email, password: this.password})
    }
  },
  props: {
  },
  computed: {
  },
}
</script>
