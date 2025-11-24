<script lang="ts" setup>
import BottomValidate from "./template/BottomValidate.vue";

defineOptions({
  name: "PendingPriceTable",
});

const { $dayjs } = useNuxtApp();
</script>

<template>
  <UiTable show-select multi-sort>
    <template #item.cost_validation="{ item }">
      <UiCheckIcon
        :id="item.id"
        :value="item.cost_validation"
        attr="cost_validation"
        :body="{
          cost_validation_at: !item.cost_validation ? $dayjs().toDate() : null,
        }"
        @update-value="
          item.cost_validation = $event;
          item.cost_validation_at = item.cost_validation
            ? $dayjs().toDate()
            : null;
        "
      />
    </template>

    <template #item.supplier_cost="{ item }">
      <UiToLocaleString :value="item.supplier_cost" />
    </template>

    <template #item.seg_cost="{ item }">
      <UiToLocaleString :value="item.seg_cost" class="text-blue" />
    </template>

    <template #item.purchase_cost="{ item }">
      <UiToLocaleString :value="item.purchase_cost" />
    </template>

    <template #item.invoice_cost="{ item }">
      <UiToLocaleString :value="item.invoice_cost" class="text-blue" />
    </template>

    <template #item.difference_invoice_seg="{ item }">
      <UiToLocaleString
        :value="item.difference_invoice_seg"
        class="text-blue"
      />
    </template>

    <template #item.difference_invoice_purchase="{ item }">
      <UiToLocaleString :value="item.difference_invoice_purchase" />
    </template>

    <template #item.cost_difference_margin="{ item }">
      <UiToLocaleString :value="item.cost_difference_margin" />
    </template>

    <template #selection-group-button>
      <BottomValidate />
    </template>
  </UiTable>
</template>
