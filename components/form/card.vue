<template>
  <form
    class="text-body flex flex-col rounded-xl bg-white p-8 text-left shadow-lg"
  >
    <slot />
  </form>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'form-card',
});
</script>

<style scoped></style>
