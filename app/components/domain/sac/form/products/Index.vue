<script lang="ts" setup>
import Preview from "./Preview.vue";
import Table from "./table/Index.vue";
import Creation from "./creation/Index.vue";

defineOptions({
  name: "SacProducts",
});
</script>

<template>
  <div class="border-div-product mt-5">
    <div class="d-flex justify-space-between ma-3">
      <p class="text-h6 font-weight-medium text-primary">PRODUTOS</p>

      <div>
        <Creation />

        <Preview />
      </div>
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
