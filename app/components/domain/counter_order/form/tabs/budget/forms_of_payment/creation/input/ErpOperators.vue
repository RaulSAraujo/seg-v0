<script lang="ts" setup>
const counterOrderStore = useCounterOrderStore();
const { erpOperatorsList, loadingErpOperators } = storeToRefs(counterOrderStore);

onMounted(() => {
  counterOrderStore.fetchErpOperators();
});
</script>

<template>
  <UiCombobox
    v-if="!loadingErpOperators"
    label="Operadora"
    :items="erpOperatorsList ?? []"
    item-title="OPERADORA"
    item-value="CODIGO"
    return-object
  />
</template>
