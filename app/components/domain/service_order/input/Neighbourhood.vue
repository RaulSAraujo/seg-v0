<script lang="ts" setup>
const addressStore = useServiceOrderAddressStore();
const { addressData } = storeToRefs(addressStore);

const { value: neighbourhood, errorMessage: error } = useField<string>("neighbourhood");

watch(
  () => addressData.value.neighbourhood,
  () => {
    neighbourhood.value = addressData.value.neighbourhood;
  }
);
</script>

<template>
  <UiTextField
    v-model="addressData.neighbourhood"
    label="Bairro"
    hide-details="auto"
    :error-messages="error"
  />
</template>
