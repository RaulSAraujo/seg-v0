<script lang="ts" setup>
const apparatusStore = useServiceOrderApparatusStore();
const { apparatusData } = storeToRefs(apparatusStore);

const { value: defectDescription, errorMessage: error } = useField<string | null>(
  "defect_description"
);

watch(
  () => apparatusData.value.defect_description,
  () => {
    defectDescription.value = apparatusData.value.defect_description;
  }
);
</script>

<template>
  <UiTextArea
    v-model="apparatusData.defect_description"
    label="Defeito reclamado"
    hide-details="auto"
    :error-messages="error"
  />
</template>
