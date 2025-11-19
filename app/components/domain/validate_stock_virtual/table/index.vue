<script lang="ts" setup>
import BottomValidate from './template/BottomValidate.vue';

defineOptions({
  name: "ValidateStockVirtualTable",
});
</script>

<template>
  <UiTable show-select multi-sort>
    <template #item.validated="{ item }">
      <UiCheckIcon
        :id="item.id"
        :value="item.validated"
        attr="validated"
        :enable-alert="true"
      />
    </template>

    <template #item.price="{ item }">
      <UiToLocaleString :value="item.price" />
    </template>

    <template #selection-group-button>
      <BottomValidate />
    </template>
  </UiTable>
</template>
