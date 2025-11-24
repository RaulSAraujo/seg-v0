<script lang="ts" setup>
import Submit from "./Submit.vue";

const props = defineProps<{
  step: number;
  validateOne: boolean;
  validateTwo: boolean;
  validateThree: boolean;
}>();

defineEmits(["onNext", "onPrev"]);

const clientStore = useServiceOrderClientStore();
const { errorsClientData } = storeToRefs(clientStore);

const addressStore = useServiceOrderAddressStore();
const { addressData } = storeToRefs(addressStore);

const apparatusStore = useServiceOrderApparatusStore();
const { errorsApparatusData } = storeToRefs(apparatusStore);

const disabled = computed(() => {
  if (props.step == 1) {
    if (!props.validateOne) return true;

    return "prev";
  }

  if (props.step == 2) {
    if (!props.validateTwo) return "next";

    if (
      Object.keys(errorsClientData.value).length > 0 &&
      Object.keys(addressData.value).length > 0
    )
      return "next";
  }

  if (props.step == 3) {
    if (!props.validateThree) return "next";

    if (Object.keys(errorsApparatusData.value).length > 0) return "next";
  }

  return undefined;
});
</script>

<template>
  <v-stepper-actions
    v-if="step < 3"
    :disabled="disabled"
    color="primary"
    @click:next="$emit('onNext')"
    @click:prev="$emit('onPrev')"
  />

  <div v-else class="d-flex justify-space-between my-2 mx-4">
    <v-btn text="ANTERIOR" variant="flat" @click="$emit('onPrev')" />

    <Submit :step="step" :disabled="disabled" />
  </div>
</template>
