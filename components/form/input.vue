<template>
  <div class="mt-4">
    <label class="font-semibold">{{ label }}</label>
    <input
      class="
        outline-none
        mt-2
        w-full
        rounded-md
        border border-gray-100
        bg-gray-100
        px-4
        py-2
        placeholder-gray-600
        focus:border-gray-500 focus:bg-white focus:placeholder-gray-500
      "
      :class="this.invalidField ? 'border-secondary' : 'border border-gray-100'"
      :type="type"
      @blur="v.$touch"
      @input="onInput"
      v
    />
    <div v-for="error of v.$errors" :key="error.$uid">
      <div class="mt-1 text-xs text-sm font-semibold text-secondary">
        {{ error.$message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'form-input',
  props: {
    label: { type: String, default: '' },
    v: {
      type: Object,
      required: true,
    },
    type: { type: String, default: 'text' },
  },
  setup(props, { emit }) {
    const invalidField = computed(() => {
      return props.v.$error;
    });

    const onInput = (event) => {
      emit(`input`, event.target.value);
    };

    return { invalidField, onInput };
  },
});
</script>

<style scoped></style>
