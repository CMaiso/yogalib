<template>
  <div class="relative h-full w-full bg-gray-50 font-body">
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
