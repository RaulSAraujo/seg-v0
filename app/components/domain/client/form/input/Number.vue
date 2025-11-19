<script lang="ts" setup>
defineOptions({
  name: "ClientInputNumber",
});

const { value: number, errorMessage: error } = useField<string | undefined>(
  "ClientsAddresses.number"
);
</script>

<template>
  <UiTextField
    v-model="number"
    label="Número"
    append-inner-icon="mdi-numeric"
    hide-details="auto"
    :error-messages="error"
  />
</template>
