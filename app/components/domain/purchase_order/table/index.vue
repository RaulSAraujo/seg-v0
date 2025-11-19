<script lang="ts" setup>
import {
  SelectAll,
  TotalInvoice,
  TotalItems,
  TotalPurchaseCost,
} from "./selection_text";
import TableProduct from "../table_products/index.vue";
import UpdateSelected from "./update_selected/index.vue";
import ReplicateFiscalNote from "./replicate_fiscal_note/index.vue";

import type { Row } from "~/interfaces/PurchaseControlProduct";

defineOptions({
  name: "PurchaseOrderTable",
});

const { cpuUsage } = useCPUMonitor();

const sortProducts = (items: Row[]) => {
  return items.sort(
    (a, b) =>
      a.name.localeCompare(b.name) ||
      Number(b.partial) - Number(a.partial) ||
      Number(b.block) - Number(a.block)
  );
};
</script>

<template>
  <UiTable multi-sort :show-expand="true">
    <template #item.action="{ item }">
      <v-btn
        icon="mdi-pencil"
        variant="plain"
        size="small"
        color="primary"
        density="comfortable"
        :to="{
          name: 'purchase-order-id',
          params: {
            id: item.id,
          },
        }"
      />

      <UiDelete :id="item.id" />
    </template>

    <template #expanded-row="{ columns, item, index }">
      <tr>
        <td :colspan="columns.length" class="pa-0">
          <TableProduct
            :index="index"
            :cpu-usage="cpuUsage"
            :items="sortProducts(item.PurchaseControlProducts)"
            @add="item.PurchaseControlProducts.push($event)"
            @destroy="item.PurchaseControlProducts.splice($event, 1)"
          />
        </td>
      </tr>
    </template>

    <template #selection-text>
      <v-divider vertical class="mx-2" />
      <SelectAll />
      <v-divider vertical class="mx-2" />
      <TotalItems />
      <v-divider vertical class="mx-2" />
      <TotalInvoice />
      <v-divider vertical class="mx-2" />
      <TotalPurchaseCost />
    </template>

    <template #selection-group-button>
      <ReplicateFiscalNote />

      <UpdateSelected />
    </template>
  </UiTable>
</template>
