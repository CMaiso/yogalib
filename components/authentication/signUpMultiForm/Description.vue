<template>
  <FormCard
  >
    <FormTitle title='Présentation'/>
    <FormInput
      label="Description"
      type="text"
      @blur="v$.description.$touch"
      :v="v$.description"
      v-model="v$.description.$model"
    />
  </FormCard>
</template>

<script lang="ts">
import FormInput from '~/components/form/input.vue';
import FormTitle from '~/components/form/title.vue';
import FormCard from '~/components/form/card.vue';
import { defineComponent } from '@nuxtjs/composition-api';
import { maxLength } from 'vuelidate/lib/validators';
import useVuelidate from '@vuelidate/core';

export default defineComponent({
  name: 'Description',
  components: { FormInput, FormTitle, FormCard },
  props: { user: Object },
  setup(props, { emit }) {
    const rules = {
      description: { maxLength: maxLength(1000) },
    };
    const v$ = useVuelidate(rules, props.user);

    return {
      v$,
    };
  },
});
</script>

<style scoped></style>
