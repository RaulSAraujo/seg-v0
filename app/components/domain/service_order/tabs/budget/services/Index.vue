<script lang="ts" setup>
const Table = defineAsyncComponent(() => import("./table/Index.vue"));
const Creation = defineAsyncComponent(() => import("./creation/Index.vue"));
</script>

<template>
  <div class="border-div-product" style="min-height: 220px">
    <div class="d-flex justify-space-between ma-3">
      <p class="text-h6 font-weight-medium text-primary">SERVIÇOS</p>

      <Creation />
    </div>

    <Table />
  </div>
</template>

<style scoped>
.border-div-product {
  border: 1px solid grey;
  border-radius: 20px;
}
</style>
