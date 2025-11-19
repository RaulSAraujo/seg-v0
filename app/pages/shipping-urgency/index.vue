<script setup lang="ts">
import type { Row } from "~/interfaces/ShippingUrgency";

useHead({
  titleTemplate: `Urgência de envio - %s`,
});

definePageMeta({
  path: "/urgencia-envio",
});

const itemRowBackground = (row: { item: Row }) => {
  if (row.item.collection_delayed) {
    return { class: "highlight-row-collection-delayed" };
  }

  if (row.item.priority_shipping) {
    return { class: "highlight-row-priority" };
  }

  if (row.item.delayed) {
    return { class: "highlight-row-overdue" };
  }
};
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">URGÊNCIA DE ENVIO</span>

    <UiFilter>
      <template #menu>
        <ShippingUrgencyMenuUpdateOrders />
      </template>
    </UiFilter>

    <UiTable multi-sort :row-props="itemRowBackground">
      <template #item.delayed="{ item }">
        <ShippingUrgencyTemplateDelayed :delayed="item.delayed" />
      </template>

      <template #item.tags="{ item }">
        <TemplatesTags :tags="item.tags" />
      </template>

      <template #item.priority_shipping="{ item }">
        <UiCheckIcon
          :id="item.id"
          :value="item.priority_shipping"
          attr="priority_shipping"
          @update-value="item.priority_shipping = $event"
        />
      </template>
    </UiTable>
  </div>
</template>

<style>
.highlight-row-overdue {
  color: red;
}

.highlight-row-priority {
  color: green;
}

.highlight-row-collection-delayed {
  color: rgb(34, 123, 212);
}
</style>
