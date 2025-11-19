<script lang="ts" setup>
defineOptions({
  name: "ClientInputComplement",
});

const { value: complement, errorMessage: error } = useField<string | undefined>(
  "ClientsAddresses.complement"
);
</script>

<template>
  <UiTextField
    v-model="complement"
    label="Complemento"
    :hide-details="true"
    :error-messages="error"
  />
</template>
