<script lang="ts" setup>
import TotalItems from "./TotalItems.vue";
import TotalPurchaseCost from "./TotalPurchaseCost.vue";

import type { Row } from "~/interfaces/PurchaseControlProduct";

defineProps<{
  products: Row[];
}>();
</script>

<template>
  <div class="d-flex justify-end text-overline">
    <span>QUANTIDADE DE ITEMS: {{ products.length }}</span>

    <v-divider vertical class="mx-2" />

    <TotalItems :products="products" />

    <v-divider vertical class="mx-2" />

    <TotalPurchaseCost :products="products" />
  </div>
</template>
