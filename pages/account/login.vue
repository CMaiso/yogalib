<template>
  <div class="flex h-full w-full items-center justify-center">
    <SignIn />
  </div>
</template>

<script lang="ts">
import SignIn from '~/components/authentication/SignIn.vue';

export default {
  components: {
    SignIn,
  },
};
</script>

<style scoped></style>
