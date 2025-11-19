<script lang="ts" setup>
import DiscountProducts from "./DiscountProducts.vue";
import DiscountPaymentMethod from "./DiscountPaymentMethod.vue";
import DiscountFreight from "./DiscountFreight.vue";
import DiscountFull from "./DiscountFull.vue";

const sacMetricsStore = useSacMetricsStore();
const { negotiationLimit } = storeToRefs(sacMetricsStore);
</script>

<template>
  <v-tooltip location="right" content-class="bg-primary rounded-lg">
    <template #activator="{ props }">
      <div v-bind="props" class="d-flex text-red mb-5">
        <span class="text-body-1 font-weight-medium mr-2">
          LIMITE DE NEGOCIAÇÃO:
        </span>

        <UiToLocaleString :value="negotiationLimit" />
      </div>
    </template>

    <template #default>
      <div class="d-flex flex-column">
        <DiscountProducts />
        <DiscountPaymentMethod />
        <DiscountFreight />
        <DiscountFull />
      </div>
    </template>
  </v-tooltip>
</template>
