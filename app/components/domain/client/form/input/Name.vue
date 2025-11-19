<script lang="ts" setup>
defineOptions({
  name: "ClientInputName",
});

const { value: name, errorMessage: error } = useField<string>("name");
</script>

<template>
  <UiTextField
    v-model="name"
    label="Nome do cliente"
    hide-details="auto"
    :error-messages="error"
  />
</template>
