<template>
  <div class="relative bg-gray-50 font-body sm:h-screen sm:w-screen">
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
