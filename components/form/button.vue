<template>
  <button
    class="
      focus:outline-none
      mt-4
      flex
      w-full
      justify-center
      rounded-md
      border border-transparent
      bg-primary
      py-2
      px-4
      text-sm
      font-medium
      text-white
      hover:bg-secondary
      disabled:bg-gray-300
    "
    @click="onClick"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'form-button',
  props: {
    disabled: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const onClick = (event) => {
      emit(`click`, event);
    };

    return { onClick };
  },
});
</script>

<style scoped></style>
