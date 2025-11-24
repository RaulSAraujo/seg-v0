<script lang="ts" setup>
const apparatusStore = useServiceOrderApparatusStore();
const { apparatusData } = storeToRefs(apparatusStore);

const { value: apparatusCondition, errorMessage: error } = useField<string | null>(
  "apparatus_condition"
);

watch(
  () => apparatusData.value.apparatus_condition,
  () => {
    apparatusCondition.value = apparatusData.value.apparatus_condition;
  }
);
</script>

<template>
  <UiTextArea
    v-model="apparatusData.apparatus_condition"
    label="Condição aparelho"
    hide-details="auto"
    :error-messages="error"
  />
</template>
