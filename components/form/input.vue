<template>
  <div>
    <label class="mb-1">{{ label }}</label>
    <input
      class="
        placeholder-gray-600
        bg-gray-100
        border border-gray-100
        focus:placeholder-gray-500 focus:bg-white focus:border-gray-500
        w-full
        rounded-md
        px-4
        py-2
        outline-none
        mb-4
      "
      :class="this.invalidField() ? 'border-red-500' : 'border border-gray-100'"
      @blur="$emit('validate')"
      @input="onInput"
      :value="value"
      v
    />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'form-input',
  props: {
    label: { type: String, default: '' },
    error: { type: String, default: '' },
    value: {
      type: String,
      default: '',
    },
    v: {
      type: Object,
      required: true,
    },
  },
  methods: {
    invalidField(field = {}): object {
      return field.$error;
    },
    onInput(event) {
      this.v.$touch();
      this.$emit(`input`, event.target.value);
    },
  },
});
</script>

<style scoped></style>
