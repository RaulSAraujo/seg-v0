<script lang="ts" setup>
defineOptions({
  name: "ClientInputEmail",
});

const { value: email, errorMessage: error } = useField<string | undefined>("email");
</script>

<template>
  <UiTextField
    v-model="email"
    label="E-mail"
    hide-details="auto"
    append-inner-icon="mdi-email"
    :error-messages="error"
  />
</template>
