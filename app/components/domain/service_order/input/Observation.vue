<script lang="ts" setup>
const clientStore = useServiceOrderClientStore();
const { clientData } = storeToRefs(clientStore);

const { value: observation, errorMessage: error } = useField<string | undefined>(
  "observation"
);

watch(
  () => clientData.value.observation,
  () => {
    observation.value = clientData.value.observation;
  }
);
</script>

<template>
  <UiTextArea
    v-model="clientData.observation"
    label="Observações do cliente"
    :hide-details="true"
    :error-messages="error"
  />
</template>
