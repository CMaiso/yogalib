<template>
  <div class="flex w-full items-center justify-center">
    <FormWizard />
  </div>
</template>

<script lang="ts">
import FormWizard from '~/components/authentication/signUpMultiForm/FormWizard';

export default {
  components: {
    FormWizard,
  },
};
</script>

<style scoped></style>
