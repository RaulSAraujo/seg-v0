<script setup lang="ts">
useHead({
  titleTemplate: `Pedidos mercado livre - %s`,
});

definePageMeta({
  path: "/pedidos-mercado-livre",
});

const dialog = ref<boolean>(false);
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">PEDIDOS MERCADO LIVRE</span>

    <OrderMlFilter @active="dialog = true" />

    <OrderMlTable />

    <OrderMlDialog v-model="dialog" @close="dialog = false" />
  </div>
</template>
