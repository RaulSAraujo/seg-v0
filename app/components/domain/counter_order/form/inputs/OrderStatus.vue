<script lang="ts" setup>
const counterOrderStore = useCounterOrderStore();
const { orderStatusesList, loadingOrderStatuses } = storeToRefs(counterOrderStore);

onMounted(() => {
  counterOrderStore.fetchOrderStatuses();
});
</script>

<template>
  <UiCombobox
    v-if="!loadingOrderStatuses"
    label="Status"
    :items="orderStatusesList ?? []"
    item-title="name"
    item-value="name"
    :multiple="false"
    :clearable="true"
  />

  <v-skeleton-loader v-else type="text" />
</template>
