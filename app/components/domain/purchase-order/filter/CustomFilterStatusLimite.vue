<script lang="ts" setup>
const filterStore = useFilterStore();
const { availableFilter } = storeToRefs(filterStore);

const tableStore = useTableStore();
const { othersQuery } = storeToRefs(tableStore);

const activeStatusLimit = computed(
  () => availableFilter.value.findIndex((e) => e.attribute == "status_limit") > -1
);

const purchaseOrderStore = usePurchaseOrderStore();
const { statusLimit } = storeToRefs(purchaseOrderStore);

const updateActiveStatusLimit = () => {
  othersQuery.value = {
    ...othersQuery.value,
    activate_status_limit: statusLimit.value == false ? undefined : true,
  };
};
</script>

<template>
  <v-col v-if="activeStatusLimit" :cols="12" :md="6" :lg="2">
    <v-switch
      v-model="statusLimit"
      inset
      label="Ativar status limite"
      color="primary"
      density="compact"
      :hide-details="true"
      @vue:updated="updateActiveStatusLimit"
    />
  </v-col>
</template>
