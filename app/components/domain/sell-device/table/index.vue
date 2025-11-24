<script lang="ts" setup>
import Images from './template/Images.vue';

defineOptions({
  name: "SellDeviceTable",
});
</script>

<template>
  <UiTable multi-sort>
    <template #item.action="{ item }">
      <Images :service-order="item.os" />
    </template>

    <template #item.price="{ item }">
      <UiToLocaleString :value="item.price" />
    </template>
  </UiTable>
</template>
