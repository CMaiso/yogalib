<template>
  <FormCard
  >
    <FormTitle title='Réseaux Sociaux'/>
    <FormInput
      label="Instagram"
      @blur="v$.instagram.$touch"
      v-model="v$.instagram.$model"
      :v="v$.instagram"
      type="text"
    />
    <FormInput
      label="Facebook"
      type="text"
      @blur="v$.facebook.$touch"
      :v="v$.facebook"
      v-model="v$.facebook.$model"
    />
    <FormInput
      label="Website"
      type="text"
      @blur="v$.website.$touch"
      :v="v$.website"
      v-model="v$.website.$model"
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
  name: 'SocialInformation',
  components: { FormInput, FormTitle, FormCard },
  props: { user: Object },
  setup(props, { emit }) {
    const rules = {
      instagram: { maxLength: maxLength(500) },
      facebook: {
        maxLength: maxLength(500),
      },
      website: {
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
