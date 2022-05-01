<template>
  <h2 class="mb-4 font-title text-3xl font-extrabold text-secondary">
    {{ title }}
  </h2>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'form-title',
  props: {
    title: { type: String, default: false },
  },
});
</script>

<style scoped></style>
