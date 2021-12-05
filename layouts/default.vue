<template>
  <div class="h-screen font-body">
    <NavBar />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import NavBar from '~/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>
