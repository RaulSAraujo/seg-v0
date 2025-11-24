<script lang="ts" setup>
const tableStore = useTableStore();
const { othersQuery } = storeToRefs(tableStore);

const filterStore = useFilterStore();
const { availableFilter } = storeToRefs(filterStore);

const activeInvoice = computed(
  () => availableFilter.value.findIndex((e) => e.attribute == "invoice") > -1
);

const purchaseOrderStore = usePurchaseOrderStore();
const { invoiceEmpty } = storeToRefs(purchaseOrderStore);

const updateActiveStatusLimit = () => {
  othersQuery.value = {
    ...othersQuery.value,
    invoice: invoiceEmpty.value == false ? undefined : "empty",
  };
};
</script>

<template>
  <v-col v-if="activeInvoice" :cols="12" :md="6" :lg="2">
    <v-switch
      v-model="invoiceEmpty"
      inset
      label="Nota fiscal vazia"
      color="primary"
      density="compact"
      :hide-details="true"
      @vue:updated="updateActiveStatusLimit"
    />
  </v-col>
</template>
