<template>
  <div>
    <label class="mb-1">{{ label }}</label>
    <input
      class="
        outline-none
        mb-4
        w-full
        rounded-md
        border border-gray-100
        bg-gray-100
        px-4
        py-2
        placeholder-gray-600
        focus:border-gray-500 focus:bg-white focus:placeholder-gray-500
      "
      :class="
        this.invalidField() ? 'border-secondary' : 'border border-gray-100'
      "
      :type="type"
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
    type: { type: String, default: 'text' },
  },
  methods: {
    invalidField(): object {
      return this.error;
    },
    onInput(event) {
      this.v.$touch();
      this.$emit(`input`, event.target.value);
    },
  },
});
</script>

<style scoped></style>
