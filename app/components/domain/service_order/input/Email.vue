<script lang="ts" setup>
const clientStore = useServiceOrderClientStore();
const { clientData } = storeToRefs(clientStore);

const { value: email, errorMessage: error } = useField<string | undefined>("email");

watch(
  () => clientData.value.email,
  () => {
    email.value = clientData.value.email;
  }
);
</script>

<template>
  <UiTextField
    v-model="clientData.email"
    label="E-mail"
    hide-details="auto"
    append-inner-icon="mdi-email"
    :error-messages="error"
  />
</template>
