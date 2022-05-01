<template>
  <div>
    <div class="mb-5 h-6 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        class="h-6 rounded-full bg-secondary dark:bg-gray-300"
        :style="{ width: `${progressBar}%` }"
      ></div>
    </div>
    <KeepAlive>
      <component
        :is="currentStep"
        :user="state"
        @update="updateData"
      ></component>
    </KeepAlive>
    <div class="flex">
      <FormButton v-if="state.currentStepNumber > 1" @click="goBack">
        Précédent
      </FormButton>
      <FormButton @click="goNext" :disabled="!state.valid">
        {{ lastStep ? 'Valider' : 'Suivant' }}
      </FormButton>
    </div>
  </div>
</template>

<script lang="ts">
import FormButton from '~/components/form/button.vue';
import UserInformation from '~/components/authentication/signUpMultiForm/UserInformation.vue';
import YogaInformation from '~/components/authentication/signUpMultiForm/YogaInformation.vue';
import SocialInformation from '~/components/authentication/signUpMultiForm/SocialInformation.vue';
import Description from '~/components/authentication/signUpMultiForm/Description.vue';

import {
  defineComponent,
  reactive,
  computed,
  ref,
} from '@nuxtjs/composition-api';
import * as stringHelpers from '~/helpers/string';

const formatPercent = new Intl.NumberFormat(`en-US`, {
  style: `percent`,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format;

export default defineComponent({
  name: 'FormWizard',
  components: {
    FormButton,
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
    });

    const currentStepNumber = ref(1);
    const steps = ref([
      UserInformation,
      YogaInformation,
      SocialInformation,
      Description,
    ]);
    const valid = ref(false);
    const length = computed(() => {
      return steps.value.length;
    });
    const progressBar = computed(() => {
      return (currentStepNumber.value / length.value) * 100;
    });
    const formattedProgress = computed(() => {
      return formatPercent(currentStepNumber.value / length.value);
    });
    const lastStep = computed(() => {
      return currentStepNumber.value === length.value;
    });
    const currentStep = computed(() => {
      return steps.value[currentStepNumber.value - 1];
    });

    const goBack = () => {
      state.currentStepNumber--;
      state.valid = true;
    };
    const goNext = () => {
      if (lastStep.value) return;
      state.currentStepNumber++;
      state.valid = false;
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
      valid,
      steps,
      currentStepNumber,
      formattedProgress,
      progressBar,
      length,
      lastStep,
      currentStep,
      goBack,
      goNext,
      newUserSignUp,
    };
  },
});
</script>

<style scoped></style>
