<script lang="ts" setup>
defineOptions({
  name: "CounterOrderFilter",
});
</script>

<template>
  <UiTable :others-query="{ full: true }" multi-sort>
    <template #item.action="{ item }">
      <v-btn
        icon="mdi-pencil"
        variant="plain"
        size="small"
        color="blue"
        :to="{
          name: 'counter-order-id',
          params: { id: item.id },
        }"
      />

      <UiDelete :id="item.id" />
    </template>

    <template #item.client_id="{ item }">
      <UiTooltip :text="item.Client.name" :vw="5" />
    </template>

    <template #item.user_id="{ item }">
      <UiTooltip :text="item.User.name" :vw="5" />
    </template>

    <template #item.total_value="{ item }">
      <UiToLocaleString :value="item.total_value" />
    </template>

    <template #item.total_value_products="{ item }">
      <UiToLocaleString :value="item.total_value_products" />
    </template>

    <template #item.discount="{ item }">
      <UiToLocaleString :value="item.discount" />
    </template>
  </UiTable>
</template>
