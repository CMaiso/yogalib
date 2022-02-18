<template>
  <div>
    <div class="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        class="h-6 rounded-full bg-gray-600 dark:bg-gray-300"
        :style="{ width: `${progressBar}%` }"
      ></div>
    </div>
    <component :is="currentStep"></component>
    <button
      class="
        focus:outline-none
        mt-4
        flex
        w-full
        justify-center
        rounded-md
        border border-transparent
        py-2
        px-4
        text-sm
        font-medium
        text-white
      "
      @click="goBack"
      v-if="currentStep > 1"
    >
      Précédent
    </button>
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
      "
      v-if="currentStep > 1"
      @click="goNext"
    >
      {{ lastStep ? 'Valider' : 'Suivant' }}
    </button>
  </div>
</template>

<script lang="ts">
import UserInformation from '~/components/authentication/signUpMultiForm/UserInformation.vue';
import YogaInformation from '~/components/authentication/signUpMultiForm/YogaInformation.vue';
import SocialInformation from '~/components/authentication/signUpMultiForm/SocialInformation.vue';
import Description from '~/components/authentication/signUpMultiForm/Description.vue';

import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  name: 'FormWizard',
  components: {
    UserInformation,
    YogaInformation,
    SocialInformation,
    Description,
  },
  data() {
    return {
      currentStepNumber: 1,
      steps: [UserInformation, YogaInformation, SocialInformation, Description],
      form: {
        yogaStyle: '',
        language: '',
        experience: '',
        instagram: '',
        facebook: '',
        website: '',
      },
    };
  },
  computed: {
    progressBar() {
      return (this.currentStepNumber / this.length) * 100;
    },
    length() {
      return this.steps.length;
    },
    lastStep() {
      return this.currentStepNumber === this.length;
    },
    currentStep() {
      return this.steps[this.currentStepNumber - 1];
    },
  },
  methods: {
    hasError() {
      //TODO: How can I know if I have errors in children component ?
    },
    goBack() {
      this.currentStepNumber--;
    },
    goNext() {
      if (this.lastStep) return;
      this.currentStepNumber++;
    },
  },
});
</script>

<style scoped></style>
