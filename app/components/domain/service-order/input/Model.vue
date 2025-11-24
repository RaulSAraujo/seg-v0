<script lang="ts" setup>
const apparatusStore = useServiceOrderApparatusStore();
const { apparatusData } = storeToRefs(apparatusStore);

const { value: model, errorMessage: error } = useField<string | null>("model");

watch(
  () => apparatusData.value.model,
  () => {
    model.value = apparatusData.value.model;
  }
);
</script>

<template>
  <UiFindServer
    v-model="apparatusData.model"
    label="Modelo"
    base-url="service-order/erp-models"
    param-search="model"
    item-title="DESCRMODELO"
    item-value="DESCRMODELO"
    :error-messages="error"
  />
</template>
