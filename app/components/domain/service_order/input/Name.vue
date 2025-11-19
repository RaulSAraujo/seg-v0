<script lang="ts" setup>
const clientStore = useServiceOrderClientStore();
const { clientData } = storeToRefs(clientStore);

const { value: name, errorMessage: error } = useField<string>("name");

watch(
  () => clientData.value.name,
  () => {
    name.value = clientData.value.name;
  }
);
</script>

<template>
  <UiTextField
    v-model="clientData.name"
    label="Nome do cliente"
    hide-details="auto"
    :error-messages="error"
  />
</template>
