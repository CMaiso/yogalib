<template>
  <div class="flex flex-1 items-center justify-center">
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
