<script lang="ts" setup>
defineOptions({
  name: "ClientInputObservation",
});

const { value: observation, errorMessage: error } = useField<string | undefined>(
  "observation"
);
</script>

<template>
  <UiTextArea
    v-model="observation"
    label="Observações do cliente"
    :hide-details="true"
    :error-messages="error"
  />
</template>
