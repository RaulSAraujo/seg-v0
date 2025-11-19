<script lang="ts" setup>
const apparatusStore = useServiceOrderApparatusStore();
const { apparatusData } = storeToRefs(apparatusStore);

const { value: version, errorMessage: error } = useField<string | null | undefined>(
  "version"
);

watch(
  () => apparatusData.value.version,
  () => {
    version.value = apparatusData.value.version;
  }
);
</script>

<template>
  <UiTextField
    v-model="apparatusData.version"
    label="Versão"
    hide-details="auto"
    :error-messages="error"
  />
</template>
