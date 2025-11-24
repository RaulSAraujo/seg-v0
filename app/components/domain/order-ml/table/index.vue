<script lang="ts" setup>
import Status from "./template/status/index.vue";
import RefundDate from "./template/RefundDate.vue";

defineOptions({
  name: "OrderMlTable",
});
</script>

<template>
  <UiTable show-select multi-sort>
    <template #item.action="{ item }">
      <UiDelete :id="item.id" />
    </template>

    <template #item.status="{ item }">
      <Status
        :id="item.id"
        :status-current="item.status"
        @update-status="item.status = $event"
        @update-received-date="item.received_date = $event"
      />
    </template>

    <template #item.unit_cost="{ item }">
      <UiToLocaleString :value="item.unit_cost" />
    </template>

    <template #item.total_cost="{ item }">
      <UiToLocaleString :value="item.total_cost" />
    </template>

    <template #item.refund_date="{ item }">
      <RefundDate :item="item" />
    </template>

    <template #item.review_data="{ item }">
      <UiEditDialogDate
        :id="item.id"
        :date="item.review_data"
        attr="review_data"
        :clearable="true"
        @update-text="item.review_data = $event"
      />
    </template>

    <template #item.observation="{ item }">
      <UiEditDialogString
        :id="item.id"
        :text="item.observation ?? ''"
        :vw="5"
        attr="observation"
        @update-text="item.observation = $event"
      />
    </template>
  </UiTable>
</template>
