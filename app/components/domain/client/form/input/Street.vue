<script lang="ts" setup>
defineOptions({
  name: "ClientInputStreet",
});

const { value: street, errorMessage: error } = useField<string>(
  "ClientsAddresses.street"
);
</script>

<template>
  <UiTextField
    v-model="street"
    label="Rua"
    append-inner-icon="mdi-road"
    hide-details="auto"
    :error-messages="error"
  />
</template>
