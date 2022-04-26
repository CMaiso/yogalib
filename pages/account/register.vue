<template>
  <div class="flex flex-1 items-center justify-center">
    <FormWizard />
  </div>
</template>

<script lang="ts">
import FormWizard from '~/components/authentication/signUpMultiForm/FormWizard.vue';

export default {
  components: {
    FormWizard,
  },
};
</script>

<style scoped></style>
