<script lang="ts" setup>
import Dialog from "./Dialog.vue";

defineProps<{
  priorityOrders: number;
  prioritySaleIds: number[];
}>();
</script>

<template>
  <div class="mb-4 d-flex flex-column align-center">
    <span class="text-h4 text-green font-weight-black mb-2">PRIORITÁRIO</span>

    <div
      class="bg-green rounded-xl py-2 text-center position-relative"
      style="width: 100%"
    >
      <Dialog :priority-sale-ids="prioritySaleIds" />

      <span class="text-h1">{{ priorityOrders }}</span>
    </div>
  </div>
</template>
