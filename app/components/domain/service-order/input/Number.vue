<script lang="ts" setup>
const addressStore = useServiceOrderAddressStore();
const { addressData } = storeToRefs(addressStore);

const { value: number, errorMessage: error } = useField<string | undefined>("number");

watch(
  () => addressData.value.number,
  () => {
    number.value = addressData.value.number;
  }
);
</script>

<template>
  <UiTextField
    v-model="addressData.number"
    label="Número"
    append-inner-icon="mdi-numeric"
    hide-details="auto"
    :error-messages="error"
  />
</template>
