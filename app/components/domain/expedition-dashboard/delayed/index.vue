<script lang="ts" setup>
import Dialog from "./Dialog.vue";

defineProps<{
  delayedOrders: number;
  delayedSaleIds: number[];
}>();
</script>

<template>
  <div class="mb-4 d-flex flex-column align-center">
    <span class="text-h4 text-error font-weight-black mb-2">EM ATRASO</span>

    <div
      class="bg-red rounded-xl py-2 text-center position-relative"
      style="width: 100%"
    >
      <Dialog :delayed-orders="delayedSaleIds" />

      <span class="text-h1">{{ delayedOrders }}</span>
    </div>
  </div>
</template>
