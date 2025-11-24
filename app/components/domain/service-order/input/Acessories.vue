<script lang="ts" setup>
const apparatusStore = useServiceOrderApparatusStore();
const { apparatusData } = storeToRefs(apparatusStore);

const { value: accessories, errorMessage: error } = useField<string | null | undefined>(
  "accessories"
);

watch(
  () => apparatusData.value.accessories,
  () => {
    accessories.value = apparatusData.value.accessories;
  }
);
</script>

<template>
  <UiTextArea
    v-model="apparatusData.accessories"
    label="Acessorios"
    hide-details="auto"
    :error-messages="error"
  />
</template>
