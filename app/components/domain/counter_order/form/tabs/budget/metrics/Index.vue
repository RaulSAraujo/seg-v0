<script lang="ts" setup>
import Discount from "./Discount.vue";
import TotalValue from "./TotalValue.vue";
import TotalValueProducts from "./TotalValueProducts.vue";

defineOptions({
  name: "CounterOrderTabsBudgetFooter",
});
</script>

<template>
  <div class="d-flex">
    <TotalValueProducts />

    <v-divider vertical class="mx-2" />

    <Discount />

    <v-divider vertical class="mx-2" />

    <TotalValue />
  </div>
</template>
