<script lang="ts" setup>
import type { RowWithRelationship } from "~/interfaces/Warranty";

defineOptions({
  name: "WarrantyTable",
});

const findManufacturerCodes = (item: RowWithRelationship) => {
  const listOfCodes = item.WarrantyRmaProducts.map((e) => e.codfabricante);

  return listOfCodes.join(",");
};
</script>

<template>
  <UiTable multi-sort>
    <template #item.action="{ item }">
      <v-btn
        icon="mdi-pencil"
        variant="plain"
        size="small"
        color="blue"
        density="compact"
        :to="{
          name: 'warranty-id',
          params: { id: item.id },
        }"
      />

      <UiDelete :id="item.id" />
    </template>

    <template #item.codfabricante="{ item }">
      <UiTooltip :text="findManufacturerCodes(item)" :vw="8" />
    </template>
  </UiTable>
</template>
