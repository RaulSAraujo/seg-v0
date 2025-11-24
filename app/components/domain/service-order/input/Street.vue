<script lang="ts" setup>
const addressStore = useServiceOrderAddressStore();
const { addressData } = storeToRefs(addressStore);

const { value: street, errorMessage: error } = useField<string>("street");

watch(
  () => addressData.value.street,
  () => {
    street.value = addressData.value.street;
  }
);
</script>

<template>
  <UiTextField
    v-model="addressData.street"
    label="Rua"
    append-inner-icon="mdi-road"
    hide-details="auto"
    :error-messages="error"
  />
</template>
