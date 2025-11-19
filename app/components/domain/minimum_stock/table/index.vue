<script lang="ts" setup>
import Status from "./template/Status.vue";
import type { Row } from "~/interfaces/MinimimStock";

defineOptions({
  name: "MinimumStockTable",
});

const tableStore = useTableStore();
const { items } = storeToRefs(tableStore);

const updateFromResponse = (event: { result: Row[] }) => {
  const itemsFormat = items.value as Row[];

  const row = event.result[0];

  if (!row) return;

  const find = useArrayFind(itemsFormat, (e) => e.id == row.id);

  if (find.value) {
    Object.entries(row).forEach(([key, value]) => {
      if (key in find.value!) {
        (find.value as unknown as Record<string, unknown>)[key] = value;
      }
    });
  }
};
</script>

<template>
  <UiTable multi-sort>
    <template #item.status="{ item }">
      <Status :status="item.status" />
    </template>

    <template #item.sales_average="{ item }">
      <UiEditDialogNumber
        :id="item.id"
        :value="item.sales_average ?? 0"
        attr="sales_average"
        :vw="10"
        @update-text="item.sales_average = $event"
        @response="updateFromResponse"
      />
    </template>

    <template #item.months="{ item }">
      <UiEditDialogNumber
        :id="item.id"
        :value="item.months ?? 0"
        attr="months"
        :vw="10"
        @update-text="item.months = $event"
        @response="updateFromResponse"
      />
    </template>

    <template #item.cost_pref="{ item }">
      <UiToLocaleString :value="item.cost_pref" />
    </template>
  </UiTable>
</template>
