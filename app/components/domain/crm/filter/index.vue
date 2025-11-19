<script lang="ts" setup>
defineOptions({
  name: "CrmFilter",
});

const pendency = ref(false);

const tableStore = useTableStore();
const { othersQuery } = storeToRefs(tableStore);

watch(
  () => pendency.value,
  () => {
    if (pendency.value) {
      othersQuery.value = {
        pendencies: true,
      };
    } else {
      othersQuery.value = {};
    }

    tableStore.searchData();
  }
);
</script>

<template>
  <UiFilter @clear="pendency = false">
    <template #extra-filter>
      <v-switch
        id="switchPendency"
        v-model="pendency"
        inset
        label="FILTRAR PENDENTES"
        color="primary"
        density="compact"
        :base-color="!pendency ? 'red' : ''"
        class="ml-5"
        hide-details
      />
    </template>
  </UiFilter>
</template>
