<template>
  <header>
    <nav>
      <ul>
        <li><nuxt-link exact to="/">Dashboard</nuxt-link></li>
        <li><nuxt-link to="/login">Se connecter</nuxt-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>

</style>
