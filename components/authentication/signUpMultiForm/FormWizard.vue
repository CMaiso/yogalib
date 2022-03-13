<template>
  <div>
    <div class="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        class="h-6 rounded-full bg-gray-600 dark:bg-gray-300"
        :style="{ width: `${progressBar}%` }"
      ></div>
    </div>
    <component :is="currentStep" @update="updateData"></component>
    <div class="flex">
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
        @click="goBack"
        v-if="state.currentStepNumber > 1"
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
        @click="goNext"
      >
        {{ lastStep ? 'Valider' : 'Suivant' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import UserInformation from '~/components/authentication/signUpMultiForm/UserInformation.vue';
import YogaInformation from '~/components/authentication/signUpMultiForm/YogaInformation.vue';
import SocialInformation from '~/components/authentication/signUpMultiForm/SocialInformation.vue';
import Description from '~/components/authentication/signUpMultiForm/Description.vue';

import { defineComponent, reactive, computed } from '@nuxtjs/composition-api';
import * as stringHelpers from '~/helpers/string';

export default defineComponent({
  name: 'FormWizard',
  components: {
    UserInformation,
    YogaInformation,
    SocialInformation,
    Description,
  },
  setup() {
    const state = reactive({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      yogaStyle: '',
      language: '',
      experience: '',
      instagram: '',
      facebook: '',
      website: '',
      currentStepNumber: 1,
      steps: [UserInformation, YogaInformation, SocialInformation, Description],
      valid: false,
    });

    const progressBar = computed(() => {
      return (state.currentStepNumber / length.value) * 100;
    });
    const length = computed(() => {
      return state.steps.length;
    });
    const lastStep = computed(() => {
      return state.currentStepNumber === length.value;
    });
    const currentStep = computed(() => {
      return state.steps[state.currentStepNumber - 1];
    });

    const goBack = () => {
      state.currentStepNumber--;
    };
    const goNext = () => {
      if (lastStep.value) return;
      state.currentStepNumber++;
    };
    const updateData = (data) => {
      console.log(data);
      Object.assign(state, data);
    };
    const newUserSignUp = async () => {
      const newUserSignUp = this.$fire.functions.httpsCallable('newUserSignUp');

      await newUserSignUp({
        email: this.email.toLowerCase(),
        password: this.password,
        firstName: stringHelpers.capitalize(this.firstName),
        lastName: stringHelpers.capitalize(this.lastName),
        phone: this.phone,
      });
    };

    return {
      state,
      progressBar,
      length,
      lastStep,
      currentStep,
      goBack,
      goNext,
      updateData,
      newUserSignUp,
    };
  },
});
</script>

<style scoped></style>
