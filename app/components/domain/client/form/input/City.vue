<script lang="ts" setup>
defineOptions({
  name: "ClientInputCity",
});

const { value: city, errorMessage: error } = useField<string>("ClientsAddresses.city");
</script>

<template>
  <UiTextField
    v-model="city"
    label="Cidade"
    append-inner-icon="mdi-city"
    hide-details="auto"
    :error-messages="error"
  />
</template>
