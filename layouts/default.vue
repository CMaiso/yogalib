<template>
  <div class="relative flex min-h-screen flex-col bg-gray-50 font-body">
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
