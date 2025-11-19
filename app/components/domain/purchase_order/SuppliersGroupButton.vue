<script lang="ts" setup>
const tableStore = useTableStore();
const { othersQuery } = storeToRefs(tableStore);

const tab = ref("PEDIDO DE COMPRA");

const listSupplier = [
  "PEDIDO DE COMPRA",
  "ALADO",
  "KLIMASA",
  "ENVISION",
  "TCL",
  "TCL G",
  "CP",
  "PHILCO-BRITANIA",
  "SAMSUNG",
  "ELECTROLUX",
  "WHIRLPOOL",
  "LG",
  "ELGIN",
];

const searchSupplier = (supplier: string) => {
  if (supplier == "PEDIDO DE COMPRA") {
    othersQuery.value = undefined;
  } else {
    othersQuery.value = {
      supplier: supplier,
    };
  }

  tableStore.searchData();
};
</script>

<template>
  <v-btn-toggle
    v-model="tab"
    variant="plain"
    mandatory
    color="primary"
    selected-class="text-h6"
    @update:model-value="searchSupplier(tab)"
  >
    <v-btn
      v-for="supplier in listSupplier"
      :key="supplier"
      :text="supplier"
      :value="supplier"
    />
  </v-btn-toggle>
</template>
