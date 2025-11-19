<script lang="ts" setup>
import EcomOrderLink from "./template/EcomOrderLink.vue";

defineOptions({
  name: "SaleSacTable",
});
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
          name: 'sac-id',
          params: { id: item.id },
        }"
      />
    </template>

    <template #item.discount_percentage="{ item }">
      <span>{{ item.discount_percentage }} %</span>
    </template>

    <template #item.ecom_order_link="{ item }">
      <EcomOrderLink :link="item.ecom_order_link" />
    </template>

    <template #item.total="{ item }">
      <UiToLocaleString :value="item.total" />
    </template>

    <template #item.sub_total="{ item }">
      <UiToLocaleString :value="item.sub_total" />
    </template>

    <template #item.discount_total="{ item }">
      <UiToLocaleString :value="item.discount_total" />
    </template>

    <template #item.product_total="{ item }">
      <UiToLocaleString :value="item.product_total" />
    </template>

    <template #item.negotiation_limit="{ item }">
      <UiToLocaleString :value="item.negotiation_limit" />
    </template>
  </UiTable>
</template>
