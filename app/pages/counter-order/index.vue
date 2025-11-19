<script setup lang="ts">
useHead({
  titleTemplate: `Pedido balcão - %s`,
});

definePageMeta({
  path: "/pedido-balcao",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">PEDIDO BALCÃO</span>

    <CounterOrderFilter />

    <CounterOrderTable />
  </div>
</template>
