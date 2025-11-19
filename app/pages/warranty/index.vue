<script setup lang="ts">
useHead({
  titleTemplate: `Garantia - %s`,
});

definePageMeta({
  path: "/garantia",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">GARANTIA</span>

    <WarrantyFilter />

    <WarrantyTable />
  </div>
</template>
