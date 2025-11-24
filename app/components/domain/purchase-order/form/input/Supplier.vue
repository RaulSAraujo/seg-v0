<script lang="ts" setup>
const suppliers = [
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
</script>

<template>
  <UiCombobox
    label="Fornecedor"
    :items="suppliers ?? []"
    item-title="name"
    item-value="name"
  />
</template>
