<script setup lang="ts">
import { createDefaultShipment } from "~/factories/current/shipmentFactory";

import type { Row } from "~/interfaces/ShipmentOrders";

useHead({
  titleTemplate: `Transportadoras - %s`,
});

definePageMeta({
  path: "/transportadoras",
});

const item = ref<Row>({} as Row);
const dialog = ref<boolean>(false);
const method = ref<"POST" | "PUT">("POST");

function setCreateItem() {
  method.value = "POST";
  dialog.value = true;
  item.value = createDefaultShipment();
}

function setUpdateItem(row: Row) {
  method.value = "PUT";
  dialog.value = true;
  item.value = row;
}
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">TRANSPORTADORAS</span>

    <ShipmentFilter @active="setCreateItem" />

    <ShipmentTable @update-item="setUpdateItem" />

    <ShipmentDialog
      v-model="dialog"
      :method="method"
      :item="item"
      @close="dialog = false"
    />
  </div>
</template>
