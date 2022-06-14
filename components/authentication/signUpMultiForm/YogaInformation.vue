<template>
  <FormCard
  >
    <FormTitle title='Yoga Information'/>
    <FormInput
      label="Style(s) de Yoga"
      @blur="v$.yogaStyle.$touch"
      v-model="v$.yogaStyle.$model"
      :v="v$.yogaStyle"
      type="text"
    />
    <FormInput
      label="Langue(s)"
      type="text"
      @blur="v$.language.$touch"
      :v="v$.language"
      v-model="v$.language.$model"
    />
    <FormInput
      label="Experience"
      type="text"
      @blur="v$.experience.$touch"
      :v="v$.experience"
      v-model="v$.experience.$model"
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
  name: 'YogaInformation',
  components: { FormInput, FormTitle, FormCard },
  props: { user: Object },
  setup(props, { emit }) {
    const rules = {
      yogaStyle: { maxLength: maxLength(500) },
      language: {
        maxLength: maxLength(500),
      },
      experience: {
        maxLength: maxLength(500),
      },
    };
    const v$ = useVuelidate(rules, props.user);

    return {
      v$,
    };
  },
});
</script>

<style scoped></style>
