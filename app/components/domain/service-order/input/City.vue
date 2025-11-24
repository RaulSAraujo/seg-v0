<script lang="ts" setup>
const addressStore = useServiceOrderAddressStore();
const { addressData } = storeToRefs(addressStore);

const { value: city, errorMessage: error } = useField<string>("several-tables/city");

watch(
  () => addressData.value.city,
  () => {
    city.value = addressData.value.city;
  }
);
</script>

<template>
  <UiTextField
    v-model="addressData.city"
    label="Cidade"
    append-inner-icon="mdi-city"
    hide-details="auto"
    :error-messages="error"
  />
</template>
