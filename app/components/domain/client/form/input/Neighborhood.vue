<script lang="ts" setup>
defineOptions({
  name: "ClientInputNeighborhood",
});

const { value: neighbourhood, errorMessage: error } = useField<string>(
  "ClientsAddresses.neighbourhood"
);
</script>

<template>
  <UiTextField
    v-model="neighbourhood"
    label="Bairro"
    hide-details="auto"
    :error-messages="error"
  />
</template>
