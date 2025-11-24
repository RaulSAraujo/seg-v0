<script lang="ts" setup>
import ProcessOrders from "./menu/ProcessOrders.vue";

defineOptions({
  name: "SeparationRequestsFilter",
});
</script>

<template>
  <UiFilter>
    <template #menu>
      <ProcessOrders />
    </template>
  </UiFilter>
</template>
